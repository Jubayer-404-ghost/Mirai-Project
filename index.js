const { initializeBot } = require('./includes/api');
const { handleEvent } = require('./includes/eventHandler');
const { loadCommands } = require('./commandHandler');
const config = require('./config.json');
const { MESSAGES } = require('./includes/constants');
const logMessage = require('./utils/logger');

const commands = loadCommands();

initializeBot((err, api) => {
  if (err) {
    logMessage(`[ERROR] Failed to initialize bot: ${err}`);
    return console.error("Failed to initialize bot:", err);
  }

  logMessage("[INFO] Bot initialized successfully.");

  api.listenMqtt((err, event) => {
    if (err) {
      logMessage(`[ERROR] Error listening to events: ${err}`);
      return console.error("Error listening to events:", err);
    }

    logMessage(`[INFO] Incoming event: ${JSON.stringify(event)}`);

    handleEvent(api, event, commands);
  });
});
