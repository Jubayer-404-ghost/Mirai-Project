function createTable(db) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      data TEXT
    )
  `);
}

function getUserById(db, id, callback) {
  db.get('SELECT * FROM users WHERE id = ?', [id], callback);
}

function saveUser(db, id, name, data) {
  db.run(
    'REPLACE INTO users (id, name, data) VALUES (?, ?, ?)',
    [id, name, JSON.stringify(data)]
  );
}

module.exports = {
  createTable,
  getUserById,
  saveUser
};
