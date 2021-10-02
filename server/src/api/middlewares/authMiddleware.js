const jwt = require('jsonwebtoken')

const config = require('@config/keys')
const { findUserById } = require('@services/authService')
const { NotFound } = require('@utils/errors')

const { extractToken } = require('@helpers/token')

module.exports = async (req, res, next) => {
    try {
        const token = extractToken(req)

        const data = jwt.verify(token, config.jwtSecret)

        const user = await findUserById(data.id)

        if (!user) {
            throw new NotFound('Unauthenticated')
        }

        req.user = user

        return next()
    } catch (error) {
        return res.status(400).json({
            message: 'Unauthenticated',
        })
    }
}
