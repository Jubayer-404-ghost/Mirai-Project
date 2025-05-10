const login = require('fca-unofficial');
const fs = require('fs');
const config = require('./config.json');

function loginBot(callback) {
  const appStatePath = config.APPSTATEPATH;

  if (fs.existsSync(appStatePath)) {
    const appState = JSON.parse(fs.readFileSync(appStatePath, 'utf8'));

    login({ appState }, config.FCAOption, (err, api) => {
      if (err) {
        console.error('Login failed with appState:', err);
        return;
      }

      console.log('Logged in using appState.');
      callback(api);
    });

  } else if (config.EMAIL && config.PASSWORD) {
    const loginData = {
      email: config.EMAIL,
      password: config.PASSWORD
    };

    login(loginData, config.FCAOption, (err, api) => {
      if (err) {
        console.error('Login failed with email and password:', err);
        return;
      }

      fs.writeFileSync(appStatePath, JSON.stringify(api.getAppState(), null, 2));
      console.log('Logged in and saved appState.');
      callback(api);
    });

  } else {
    console.error('No appState or email/password found. Please check your config.json.');
  }
}

module.exports = loginBot;
