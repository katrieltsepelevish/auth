const Yup = require('yup')

// Load services
const {
    findUserByEmail,
    createUser,
    findUserByConfirmationCode,
    confirmByConfirmationCode,
    updateUserPasswordByEmail,
    generateToken,
    findUserInfoByEmail,
    sendUserForgotPassword,
} = require('@services/authService')
const {
    getPasswordResetByToken,
    deletePasswordResetByToken,
    deletePasswordResetByEmail,
} = require('@services/passwordResetService')

// @route   POST /api/auth/login
// @desc    Authorize user
// @access  Public
const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await findUserByEmail(email)

        if (!user || !user.comparePasswords(password))
            throw new Yup.ValidationError(
                'These credentials does not match the records',
                email,
                'email'
            )

        const token = generateToken(user)

        const { name } = user

        return res.status(200).json({ name, email, token })
    } catch (error) {
        next(error)
    }
}

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
const register = async (req, res, next) => {
    const { name, email, password } = req.body

    try {
        const existingUser = await findUserByEmail(email)

        if (existingUser)
            throw new Yup.ValidationError(
                'User already exists in records',
                req.body,
                'email'
            )

        const user = await createUser({ name, email, password })
        const token = generateToken(user)

        return res.status(200).json({ name, email, token })
    } catch (error) {
        next(error)
    }
}

// @route   POST /api/auth/confirm
// @desc    Confirm email
// @access  Private
const confirmEmail = async (req, res, next) => {
    const { code } = req.body

    console.log(req.body)

    try {
        const existingUser = await findUserByConfirmationCode(code)

        if (!existingUser)
            throw new Yup.ValidationError(
                'Invalid confirmation code',
                req.body,
                'token'
            )

        await confirmByConfirmationCode(code)

        return res.status(200).json({
            message: 'Email confirmed.',
        })
    } catch (error) {
        next(error)
    }
}

// @route   POST /api/auth/resend
// @desc    Resend email confirmation
// @access  Private
const resendConfirmEmail = async (req, res, next) => {
    try {
        if (!req.user.emailConfirmedAt) {
            await req.user.sendEmailConfirmation()
        }

        return res.status(200).json({
            message: 'Email confirmation sent',
        })
    } catch (error) {
        next(error)
    }
}

// @route   POST /api/auth/password-forgot
// @desc    Send password reset
// @access  Public
const forgotPassword = async (req, res, next) => {
    const { email } = req.body

    try {
        const existingUser = await findUserByEmail(email)

        if (!existingUser)
            throw new Yup.ValidationError(
                'User does not exist in records',
                req.body,
                'email'
            )

        await sendUserForgotPassword(existingUser)

        return res.status(200).json({
            message: 'Password reset sent',
        })
    } catch (error) {
        next(error)
    }
}

// @route   POST /api/auth/password-reset
// @desc    Reset password
// @access  Public
const resetPassword = async (req, res, next) => {
    const { password, token } = req.body

    try {
        const existingReset = await getPasswordResetByToken(token)

        if (!existingReset)
            throw new Yup.ValidationError(
                'Invalid reset token',
                req.body,
                'password'
            )

        const timeInMinutes = Math.ceil(
            (new Date().getTime() -
                new Date(existingReset.createdAt).getTime()) /
                60000
        )

        if (timeInMinutes > 5) {
            await deletePasswordResetByToken(token)

            throw new Yup.ValidationError(
                'Reset token expired.',
                req.body,
                'password'
            )
        }

        await updateUserPasswordByEmail(existingReset.email, password)

        await deletePasswordResetByEmail(existingReset.email)

        return res.json({
            message: 'Password reset successfully.',
        })
    } catch (error) {
        next(error)
    }
}

// @route   GET /api/auth/
// @desc    Get User Information
// @access  Public
const getUserInfo = async (req, res, next) => {
    const { email } = req.user

    try {
        const user = await findUserInfoByEmail(email)

        return res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    register,
    confirmEmail,
    resendConfirmEmail,
    forgotPassword,
    resetPassword,
    getUserInfo,
}
