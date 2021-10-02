const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    url: process.env.URL || 'http://localhost:3000',
    databaseUri: process.env.DATABASE_URL || 'mongodb://localhost:27017/auth',
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET || '65JymYzDDqqLW8Eg',
    smtpGmailUsername: process.env.SMTP_GMAIL_USERNAME,
    OAuthClientId: process.env.OAUTH_CLIENT_ID,
    OAuthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    OAuthRefreshToken: process.env.OAUTH_REFRESH_TOKEN,
    OAuthAccessToken: process.env.OAUTH_ACCESS_TOKEN,
}
