const express = require('express')
const router = express.Router()

// Middlewares
const authMiddleware = require('@middlewares/authMiddleware')

// Validations
const codeValidation = require('@validations/codeValidation')
const emailValidation = require('@validations/emailValidation')
const resetPasswordValidation = require('@validations/resetPasswordValidation')
const loginValidation = require('@validations/loginValidation')
const registerValidation = require('@validations/registerValidation')

// Controllers
const authController = require('@controllers/authController')

// Authenticated user Routes
router.get('/', authMiddleware, authController.getUserInfo)
router.post(
    '/confirm',
    [authMiddleware, codeValidation],
    authController.confirmEmail
)
router.post('/resend', authMiddleware, authController.resendConfirmEmail)

// Routes
router.post('/login', loginValidation, authController.login)
router.post('/register', registerValidation, authController.register)
router.post('/password-forgot', emailValidation, authController.forgotPassword)
router.post(
    '/password-reset',
    resetPasswordValidation,
    authController.resetPassword
)

module.exports = router
