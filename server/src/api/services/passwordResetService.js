const PasswordResetModel = require('@models/PasswordResetModel')

const getPasswordResetByToken = (token) => {
    return PasswordResetModel.findOne({ token })
}

const deletePasswordResetByToken = (token) => {
    return PasswordResetModel.findOneAndDelete({ token })
}

const deletePasswordResetByEmail = (email) => {
    return PasswordResetModel.findOneAndDelete({
        email: email,
    })
}

module.exports = {
    getPasswordResetByToken,
    deletePasswordResetByToken,
    deletePasswordResetByEmail,
}
