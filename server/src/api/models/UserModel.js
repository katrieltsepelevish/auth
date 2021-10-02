const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const randomstring = require('randomstring')

const PasswordResetModel = require('@models/PasswordResetModel')

const config = require('@config/keys')
const { sendMail } = require('@utils/mailer')

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        password: String,
        emailConfirmedAt: Date,
        emailConfirmCode: String,
    },
    { timestamps: true }
)

UserSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password)
    this.emailConfirmCode = randomstring.generate(72)
})

UserSchema.post('save', function () {
    this.sendEmailConfirmation()
})

UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, config.jwtSecret)
}

UserSchema.methods.sendEmailConfirmation = async function () {
    try {
        const confirmUrl = `${config.url}/confirm-email/${this.emailConfirmCode}`

        await sendMail({
            to: this.email,
            from: `Authentication Mailer <${config.smtpGmailUsername}>`,
            subject: 'Please confirm your account',
            template: 'confirm-email',
            templateVars: {
                name: this.name,
                confirmLink: confirmUrl,
                emailAddress: this.email,
            },
        })
    } catch (error) {
        throw new Error(error)
    }
}

UserSchema.methods.comparePasswords = function (comparedPassword) {
    return bcrypt.compareSync(comparedPassword, this.password)
}

UserSchema.methods.sendForgotPassword = async function (email) {
    try {
        const token = randomstring.generate(72)

        const reset = await PasswordResetModel.findOneAndUpdate(
            { email },
            { token },
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            }
        )

        const passwordUrl = `${config.url}/reset-password/${reset.token}`

        await sendMail({
            to: this.email,
            from: `Authentication Mailer <${config.smtpGmailUsername}>`,
            subject: 'Password reset',
            template: 'password-reset',
            templateVars: {
                name: this.name,
                passwordLink: passwordUrl,
                emailAddress: this.email,
            },
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = mongoose.model('User', UserSchema)
