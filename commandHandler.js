const fs = require('fs');
const path = require('path');
const { MESSAGES } = require('../includes/constants'); // Assuming MESSAGES is from constants.js
const logMessage = require('../utils/logger'); // Assuming logger.js is used for logging

function loadCommands() {
  const commands = {};
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
  
  commandFiles.forEach(file => {
    const command = require(path.join(__dirname, 'commands', file));
    commands[command.config.name] = command;
  });
  
  return commands;
}

function executeCommand(api, event, args, commandName) {
  const commands = loadCommands();

  if (commands[commandName]) {
    const command = commands[commandName];

    if (command.config.hasPermssion === 0 || (command.config.hasPermssion === 1 && isAdmin(event.senderID)) || (command.config.hasPermssion === 2 && isBotOwner(event.senderID))) {
      command.run({ api, event, args });
    } else {
      api.sendMessage(MESSAGES.noPermission, event.threadID);
    }
  } else {
    api.sendMessage(MESSAGES.unknownCommand, event.threadID);
  }
}

function isAdmin(userID) {
  const adminList = require('../config.json').ADMINBOT;
  return adminList.includes(userID);
}

function isBotOwner(userID) {
  const botOwner = require('../config.json').BOTOWNER;
  return botOwner === userID;
}

module.exports = {
  loadCommands,
  executeCommand
};
