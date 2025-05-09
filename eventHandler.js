const { executeCommand } = require('./commandHandler');

function handleEvent(api, event) {
  const { threadID, messageID, senderID, body } = event;
  const args = body.slice(1).trim().split(/ +/); // Split the command and arguments
  const commandName = args.shift().toLowerCase(); // Extract command

  // If the message starts with your command prefix, process it
  if (body.startsWith('!')) {
    executeCommand(api, event, args, commandName);
  }
}

module.exports = { handleEvent };
