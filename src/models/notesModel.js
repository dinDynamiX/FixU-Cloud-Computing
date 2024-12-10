const db = require('../config/db');

// Get Data Note
const getAllNotes = (uid) => {
  const SQLQuery = `SELECT * FROM notes WHERE uid = ?`;
  return db.execute(SQLQuery, [uid]);
};

// Membuat Data Note
const createNewNotes = async (uid, title, content) => {
  const SQLQuery = `INSERT INTO notes (uid, title, content) VALUES (?, ?, ?)`;
  const [result] = await db.execute(SQLQuery, [uid, title, content]);

  // Mengembalikan ID dari note yang baru dibuat
  return result.insertId;
};

// Mencari Data Note berdasarkan ID
const findNoteById = (idNote) => {
  const SQLQuery = `SELECT * FROM notes WHERE id = ?`;
  return db.execute(SQLQuery, [idNote]);
};

// Update Data Note
const updateNote = (body, idNote) => {
  const SQLQuery = `
      UPDATE notes
      SET title = ?, content = ?
      WHERE id = ?
    `;

  return db.execute(SQLQuery, [body.title, body.content, idNote]);
};

// Hapus Data Note
const deleteNote = async (idNote) => {
  const SQLQuery = 'DELETE FROM notes WHERE id = ?';
  try {
    const [result] = await db.execute(SQLQuery, [idNote]);
    return result;
  } catch (error) {
    console.error('Error deleting note:', error.message);
    throw error;
  }
};

module.exports = {
  getAllNotes,
  createNewNotes,
  updateNote,
  deleteNote,
  findNoteById,
};
