// Load alianses
require('module-alias/register')

const express = require('express')
const path = require('path')
const morgan = require('morgan')
const colors = require('colors')

const config = require('@config/keys')

// Connect to database
const connectDB = require('@utils/database')
connectDB(config.databaseUri)

// Initialize application
const app = express()

app.use(express.json())

if (config.environment === 'development') app.use(morgan('dev'))

// Authentication routes
const authRoutes = require('@routes/authRoutes')
app.use('/api/auth', authRoutes)

// Handle errors middleware
const handleErrorsMiddleware = require('@middlewares/handleErrorsMiddleware')
app.use(handleErrorsMiddleware)

// Serve static assets if in productions
if (config.environment === 'production') {
    // Set static folder
    app.use(express.static('client/build'))
    // Load static file
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '..', 'client', 'build', 'index.html')
        )
    })
}

// Start server
app.listen(
    config.port,
    console.log(
        `Server running in ${config.environment} mode on PORT ${config.port}`
            .yellow.bold
    )
)
