const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const { htmlToText } = require('html-to-text')
const { google } = require('googleapis')

const config = require('@config/keys')

const redirectUrl = 'https://developers.google.com/oauthplayground'

const sendMail = async ({
    template: templateName,
    templateVars,
    ...restOfOptions
}) => {
    try {
        // Requires 'template' as part of mail arguments
        if (!templateName)
            throw new Error('Please provide the "template" requested')

        // Creating OAuth connection for gmail
        const oAuth2Client = new google.auth.OAuth2(
            config.OAuthClientId,
            config.OAuthClientSecret,
            redirectUrl
        )

        oAuth2Client.setCredentials({
            refresh_token: config.OAuthRefreshToken,
        })

        await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                type: 'OAuth2',
                user: config.smtpGmailUsername,
                clientId: config.OAuthClientId,
                clientSecret: config.OAuthClientSecret,
                refreshToken: config.OAuthRefreshToken,
                accessToken: config.OAuthAccessToken,
            },
        })

        const options = {
            ...restOfOptions,
        }

        // Generating Template path in folder
        const templatePath = path.join(
            __dirname,
            '\\..\\',
            'mails',
            templateName + '.html'
        )

        // Looks for template file and renders it to HTML format
        if (templateName && fs.existsSync(templatePath)) {
            const template = fs.readFileSync(templatePath, 'utf-8')
            const html = ejs.render(template, templateVars)
            const text = htmlToText(html)

            options.html = html
            options.text = text
        }

        // Sends mail
        return await transport.sendMail(options)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { sendMail }
