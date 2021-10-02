const Yup = require('yup')

const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
})

module.exports = async (req, res, next) => {
    try {
        await LoginSchema.validate(req.body, { abortEarly: false })

        return next()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.inner,
        })
    }
}
