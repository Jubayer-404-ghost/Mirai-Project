const loginBot = require('./login');
const { connectDatabase } = require('./database/database');
const handleCommand = require('./commandHandler');
const handleEvent = require('./eventHandler');
const config = require('./config.json');
const loadCommands = require('./scripts/loader/loadCommands');
const loadEvents = require('./scripts/loader/loadEvents');

connectDatabase();

loginBot((api) => {
  global.api = api;
  global.config = config;
  global.commands = new Map();
  global.events = new Map();

  api.setOptions(config.FCAOption || {});

  console.log(`${config.BOTNAME || 'MiraiBot'} is now active.`);

  loadCommands(global.commands);
  loadEvents(global.events);

  initializeCache();

  api.listenMqtt((err, event) => {
    if (err) {
      console.error('Event listener error:', err);
      return;
    }

    if (event.type === 'message' || event.type === 'message_reply') {
      handleCommand({ api, event });
    } else {
      handleEvent({ api, event });
    }
  });
});

function initializeCache() {
  console.log('Cache initialization complete.');
}
