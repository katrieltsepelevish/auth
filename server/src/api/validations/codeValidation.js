const Yup = require('yup')

const codeSchema = Yup.object().shape({
    code: Yup.string().required(),
})

module.exports = async (req, res, next) => {
    console.log(req.body)

    try {
        await codeSchema.validate(req.body, { abortEarly: false })

        return next()
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.inner,
        })
    }
}
