const builder = require('botbuilder');
const restify = require('restify');
const ApiAIRecognizer = require('api-ai-recognizer');
const { AI_TOKEN } = require('./environment');
const { createIntent } = require('./intentMatcher');

const server = restify.createServer();
server.listen(process.env.port || 3978, () => {
  console.log(`server name: ${server.name} | server url: ${server.url}, APP_ID: ${process.env.APP_ID} | APP_PASSWORD: ${process.env.APP_PASSWORD}`);
});
const connector = new builder.ChatConnector({
  appId: process.env.APP_ID,
  appPassword: process.env.APP_PASSWORD,
});
server.post('/api/messages', connector.listen());
const bot = new builder.UniversalBot(connector);

const recognizer = new ApiAIRecognizer(AI_TOKEN);
const intents = new builder.IntentDialog({
  recognizers: [recognizer],
});

bot.dialog('/', intents);
createIntent(intents, 'device.battery.check');
createIntent(intents, 'device.memory.check');
createIntent(intents, 'device.operational_system.check');
createIntent(intents, 'device.screen.lock');
createIntent(intents, 'device.screen.unlock');
createIntent(intents, 'device.settings.check');
createIntent(intents, 'device.settings.off');
createIntent(intents, 'device.settings.on');
createIntent(intents, 'device.settings.off - context:settings-on-off');
createIntent(intents, 'device.settings.on - context:settings-on-off');
createIntent(intents, 'device.settings.onoff - context:settings-on-off');
