const mongoose = require('mongoose')

const PasswordResetSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true },
        token: String,
        createdAt: Date,
    },
    { timestamps: true }
)

module.exports = mongoose.model('PasswordReset', PasswordResetSchema)
