# Requirements

Node.js 16.9.0 or newer is required.
[how to install Nodejs](https://www.pluralsight.com/guides/getting-started-with-nodejs)

# Installation

to install all dependencies just run the following command

> npm install

# Setup configuration

1. rename example.env to .env
2. fill in the needed information such as your bot's token, and bot's id.
3. add API keys from [The Cat Api](https://thecatapi.com/) & [The Dog API](https://thedogapi.com/) to `config.json`

# Guide on making a discord bot account

relevant info available from "How to Create a Discord Bot Account"
[click here](https://www.freecodecamp.org/news/create-a-discord-bot-with-python/)

Adding the bot to your server starts from "How to Invite Your Bot to Join a Server", and ends at "To add the bot, your account needs "Manage Server" permissions."

- make sure you grant the bot the scope "applications.commands" as it required for "/" commands

# Start the bot:

Running bot in terminal (to test configuration)

> npm start

P.S. This will run the bot in the terminal window, if it closes so does the bot, also it will not autorestart, see below for a recommended process manager.

# Start the bot with a process manager (PM2)

## Install PM2

To install pm2 globally via npm

## Quick install

run:

### First time use only:

> `npm install pm2@latest -g`

> npm run pm2

This starts the bot, and will remain running even after you close the window (as long as the server/pc itself is running)

### Afterwards you can use below commands to control the bot.

> pm2 start gormel

> pm2 stop gormel

> pm2 restart gormel

> pm2 logs gormel

[More details about pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)

# Special Thanks

I have to give thanks to the developers of the APIs below, without their help, this bot would not exist.

[That API Company](https://thatapicompany.com/)

[Advice slip](https://adviceslip.com/)

[Dictum](https://api.fisenko.net/swagger-ui/#/)

[Public APIs - a detailed list of publicly available APIs](https://github.com/public-apis/public-apis)
