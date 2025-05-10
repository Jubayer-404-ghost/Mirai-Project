const fs = require('fs');
const path = require('path');

module.exports = function loadEvents(eventsMap) {
  const eventsPath = path.join(__dirname, '..', 'events');
  const files = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of files) {
    const event = require(path.join(eventsPath, file));
    if (event.config && event.config.name) {
      eventsMap.set(event.config.name, event);
    }
  }

  console.log(`Loaded ${eventsMap.size} events.`);
};
