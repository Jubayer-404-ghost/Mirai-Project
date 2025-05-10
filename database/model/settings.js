function createTable(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);
}

function getSetting(db, key, callback) {
  db.get('SELECT value FROM settings WHERE key = ?', [key], callback);
}

function saveSetting(db, key, value) {
  db.run(
    'REPLACE INTO settings (key, value) VALUES (?, ?)',
    [key, value]
  );
}

module.exports = {
  createTable,
  getSetting,
  saveSetting
};
