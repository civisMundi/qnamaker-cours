const builder = require('botbuilder')
const restify = require('restify')
const cognitiveServices = require('botbuilder-cognitiveservices')

const server = restify.createServer()
server.listen(process.env.port || 3978, () => {
    console.log(`server name: ${server.name} | server url: ${server.url}`)
    console.log(`MICROSOFT_APP_ID: ${process.env.MICROSOFT_APP_ID} | MICROSOFT_APP_PASSWORD: ${process.env.MICROSOFT_APP_PASSWORD}`)
})

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
})

server.post('/api/messages', connector.listen())

const bot = new builder.UniversalBot(connector)

/**
 * 
 * POST /knowledgebases/d823f615-9507-4ae7-89e0-d87c765435eb/generateAnswer
 * Host: https://westus.api.cognitive.microsoft.com/qnamaker/v2.0
 * Ocp-Apim-Subscription-Key:e5a9cb10b8474448b9d539b11639573d
 * Content-Type: application/json 
 * {"question":"hi"}
 * 
 */
const qnaMakerRecognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: 'd823f615-9507-4ae7-89e0-d87c765435eb',
    subscriptionKey: 'e5a9cb10b8474448b9d539b11639573d'
})

const qnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: [qnaMakerRecognizer],
    qnaThreshold: 0.4,
    defaultNoMatchMessage: 'En humain sinon ?'
})

bot.dialog('/', qnaMakerDialog);
