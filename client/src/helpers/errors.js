export const parseErrors = (errorMessage) => {
    const errors = {}

    if (Array.isArray(errorMessage)) {
        errorMessage.map((error) => {
            return (errors[error.path] = error.message)
        })

        return errors
    }

    return { [errorMessage.path]: errorMessage.message }
}
