const Yup = require('yup')

const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string().min(6).required(),
    confirmPassword: Yup.string().test(
        'password',
        'Passwords must match',
        function (value) {
            return this.parent.password === value
        }
    ),
})

module.exports = async (req, res, next) => {
    try {
        await ResetPasswordSchema.validate(req.body, { abortEarly: false })

        return next()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.inner,
        })
    }
}
