# Auth - Authentication with mailing

![auth](https://user-images.githubusercontent.com/90503305/135711662-72111357-17d7-4e67-a4a5-a2e77f712499.png)

## Technology

Auth is a simple web application that was build from scratch using node, express, mongodb and react.

## Configuration

You should set up OAuth 2.0 for Gmail SMTP to enable mailing through private Gmail account in `.env` file at `server` folder

```sh
URL = http://localhost:3000 
PORT = 5000 
NODE_ENV = development 
DATABASE_URI = mongodb://localhost:27017/auth 
JWT_SECRET = 65JymYzDDqqLW8Eg 
SMTP_GMAIL_USERNAME = 
OAUTH_CLIENT_ID = 
OAUTH_CLIENT_SECRET = 
OAUTH_REFRESH_TOKEN = 
OAUTH_ACCESS_TOKEN =
```

## Installation

Start the application in 'development' enviroment by running the command:

`npm run dev`
