const builder = require('botbuilder')
const restify = require('restify')
const cognitiveServices = require('botbuilder-cognitiveservices')

const server = restify.createServer()
server.listen(process.env.port || 3978, () => {
    console.log(`server name: ${server.name} | server url: ${server.url}`)
    console.log(`APP_ID: ${process.env.APP_ID} | APP_PASSWORD: ${process.env.APP_PASSWORD}`)
})

const connector = new builder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD
})

server.post('api/messages', connector.listen())

const bot = new builder.UniversalBot(connector)

const recognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: 'd823f615-9507-4ae7-89e0-d87c765435eb',
    subscriptionKey: 'e5a9cb10b8474448b9d539b11639573d'
})

const qnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: [recognizer],
    qnaThreshold: 0.4,
    defaultMessage: `En humain sinon ?`
})

bot.dialog('/', qnaMakerDialog);
