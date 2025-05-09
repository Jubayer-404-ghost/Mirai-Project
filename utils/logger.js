const fs = require('fs');

function logMessage(message) {
  fs.appendFileSync('bot.log', `[${new Date().toISOString()}] ${message}\n`);
}

module.exports = logMessage;
