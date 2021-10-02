require('module-alias/register')

const colors = require('colors')
const config = require('@config/keys')

const { createUser, deleteAllUsers } = require('@services/authService')

// Connect to database
const connectDB = require('@utils/database')
connectDB(config.databaseUri)

const importData = async () => {
    try {
        await createUser({
            name: 'admin',
            email: 'admin@gmail.com',
            password: '123123',
        })

        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await deleteAllUsers()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d')
    // -d   <-- In terminal
    destroyData()
else importData()
