const db = require('../config/db');

const getAllNotes = () => {
  const SQLQuery = 'SELECT * FROM notes';

  return db.execute(SQLQuery);
};

module.exports = {
  getAllNotes,
};
