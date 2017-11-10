module.exports.createIntent = (intents, stringIntent) => {
  intents.matches(stringIntent, [
    (session, args) => {
      session.send(`args: ${JSON.stringify(args)}`);
    },
  ]);
};
