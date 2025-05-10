const sqlite3 = require('sqlite3').verbose();
const config = require('../config.json');
const path = require('path');

let db;

function connectDatabase() {
  const storagePath = path.resolve(__dirname, '..', config.DATABASE.sqlite.storage);
  db = new sqlite3.Database(storagePath, (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
    } else {
      console.log('Connected to SQLite database.');
    }
  });

  if (config.autoCreateDB) {
    require('./models/users').createTable(db);
    require('./models/settings').createTable(db);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connectDatabase,
  getDB
};
