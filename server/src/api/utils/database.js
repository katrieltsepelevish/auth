const mongoose = require('mongoose')

const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(
            `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
        )
    } catch (error) {
        console.log(`Error: ${error.message}`.red)
        process.exit(1)
    }
}

module.exports = connectDB
