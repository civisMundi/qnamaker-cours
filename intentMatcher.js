const builder = require('botbuilder');

module.exports.createIntent = (intents, stringIntent) => {
  intents.matches(stringIntent, [
    (session, args) => {
      const { entities } = args;
      if (entities.find(e => e.entity)) {
        session.send(entities.find(e => e.entity).entity);
      } else {
        const matchedRes = builder.EntityRecognizer.findEntity(entities);
        // const matchedRes = builder.EntityRecognizer.findBestMatch(entities);
        session.send(`args: ${JSON.stringify(args)} \n\n matchedRes: ${matchedRes}`);
      }
    },
  ]);
};
