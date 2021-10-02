const UserModel = require('@models/UserModel')
const bcrypt = require('bcryptjs')

const findUserById = (id) => {
    return UserModel.findById(id)
}

const findUserByEmail = (email) => {
    return UserModel.findOne({ email })
}

const findUserInfoByEmail = (email) => {
    return UserModel.findOne({ email }).select('-password -_id -__v')
}

const generateToken = (user) => {
    return user.generateToken()
}

const sendUserForgotPassword = (user) => {
    const { email } = user

    return user.sendForgotPassword(email)
}

const confirmByConfirmationCode = (code) => {
    return UserModel.findOneAndUpdate(
        {
            emailConfirmCode: code,
        },
        {
            emailConfirmCode: null,
            emailConfirmedAt: new Date(),
        },
        { new: true }
    )
}

const updateUserPasswordByEmail = (email, password) => {
    return UserModel.findOneAndUpdate(
        {
            email: email,
        },
        {
            password: bcrypt.hashSync(password),
        }
    )
}

const findUserByConfirmationCode = (code) => {
    return UserModel.findOne({ emailConfirmCode: code })
}

const createUser = (params) => {
    return UserModel.create(params)
}

const deleteAllUsers = () => {
    return UserModel.deleteMany()
}

module.exports = {
    findUserById,
    findUserByEmail,
    createUser,
    deleteAllUsers,
    findUserByConfirmationCode,
    confirmByConfirmationCode,
    updateUserPasswordByEmail,
    generateToken,
    findUserInfoByEmail,
    sendUserForgotPassword,
}
