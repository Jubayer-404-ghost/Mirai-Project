const fs = require('fs');
const path = require('path');

module.exports = function loadCommands(commandsMap) {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of files) {
    const command = require(path.join(commandsPath, file));
    if (command.config && command.config.name) {
      commandsMap.set(command.config.name, command);
    }
  }

  console.log(`Loaded ${commandsMap.size} commands.`);
};
