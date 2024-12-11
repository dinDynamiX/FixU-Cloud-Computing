const { verifyIdToken } = require('../middleware/verifyIdToken.js');
const notesModel = require('../models/notesModel.js');

const getAllNotes = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  console.log(token);

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    });
  }

  const uid = await verifyIdToken(token);
  console.log(uid);

  const [note] = await notesModel.getAllNotes(uid);

  res.status(200).send({
    data: note,
  });
};

const addNewNote = (req, res) => {
  res.status(200).json({
    message: 'Get Halaman Add notes',
  });
};

const createNewNotes = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    });
  }

  const uid = await verifyIdToken(token);

  const { title, content } = req.body;

  // Validasi untuk memastikan title dan content tidak undefined atau kosong
  if (!title || !content) {
    return res.status(400).json({
      message: 'Mohon lengkapi data input',
    });
  }

  console.log('uid:', uid);
  console.log('title:', title);
  console.log('content:', content);

  try {
    // Memastikan uid, title, dan content didefinisikan dengan benar
    const newNoteId = await notesModel.createNewNotes(uid, title, content);

    // Ambil data note yang baru disimpan berdasarkan ID
    const [newNoteResult] = await notesModel.findNoteById(newNoteId);

    res.status(201).json({
      message: 'Post notes success',
      result: newNoteResult,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal simpan note',
      serverMessage: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    });
  }

  const uid = await verifyIdToken(token);

  const { title, content } = req.body;
  const { idNote } = req.params;

  // Validasi untuk memastikan title dan content tidak undefined atau kosong
  if (!title || !content) {
    return res.status(400).json({
      message: 'Mohon lengkapi data input',
    });
  }

  console.log('uid:', uid);
  console.log('title:', title);
  console.log('content:', content);
  console.log('idNote:', idNote);

  try {
    // Update data note
    const result = await notesModel.updateNote({ title, content }, idNote);

    // Periksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Note not found or no changes made',
      });
    }

    // Mengambil data note yang sudah diperbarui
    const [updatedNote] = await notesModel.findNoteById(idNote);

    res.status(200).json({
      message: 'Note updated successfully',
      result: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal update note',
      serverMessage: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    });
  }

  const { idNote } = req.params;

  try {
    // Ambil data note sebelum dihapus
    const [noteToDelete] = await notesModel.findNoteById(idNote);

    // Jika note tidak ditemukan, kembalikan respon 404
    if (!noteToDelete) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    // Menghapus note berdasarkan id
    const result = await notesModel.deleteNote(idNote);

    // Memeriksa apakah ada baris yang terpengaruh
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    res.status(200).json({
      message: 'Note deleted successfully',
      deletedData: noteToDelete, // Menampilkan data yang baru saja dihapus
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal menghapus note',
      serverMessage: error.message,
    });
  }
};

module.exports = {
  getAllNotes,
  createNewNotes,
  addNewNote,
  updateNote,
  deleteNote,
};
