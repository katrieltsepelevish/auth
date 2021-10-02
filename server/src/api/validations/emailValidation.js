const Yup = require('yup')

const emailConfirmSchema = Yup.object().shape({
    email: Yup.string().email().required(),
})

module.exports = async (req, res, next) => {
    try {
        await emailConfirmSchema.validate(req.body, { abortEarly: false })

        return next()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.inner,
        })
    }
}
