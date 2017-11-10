const builder = require('botbuilder')
const restify = require('restify')
const apiairecognizer = require('api-ai-recognizer')
const { AI_TOKEN } = require('./environment')


const server = restify.createServer()
server.listen(process.env.port || 3978, () => {
    console.log(`server name: ${server.name} | server url: ${server.url}`);
    console.log(`APP_ID: ${process.env.APP_ID} | APP_PASSWORD: ${process.env.APP_PASSWORD}`);
})
const connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
})
server.post('/api/messages', connector.listen())
const bot = new builder.UniversalBot(connector);

const recognizer = new apiairecognizer(AI_TOKEN);
const intents = new builder.IntentDialog({
    recognizers: [recognizer]
});

// bot.dialog('/', qnaMakerDialog);
bot.dialog('/', intents);
