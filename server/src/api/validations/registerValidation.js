const Yup = require('yup')

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
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
        await RegisterSchema.validate(req.body, { abortEarly: false })

        return next()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.inner,
        })
    }
}
