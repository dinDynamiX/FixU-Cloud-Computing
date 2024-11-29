const notesModel = require('../models/notesModel.js');

const getAllNotes = async (req, res) => {
  try {
    const [data] = await notesModel.getAllNotes();
    res.status(200).json({
      message: 'get notes success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const addNewNote = (req, res) => {
  res.status(200).json({
    message: 'Get Halaman Add notes',
  });
};

const createNewNotes = async (req, res) => {
  const { body } = req;

  if (!body.uid || !body.title || !body.content) {
    return res.status(400).json({
      message: 'Mohon lengkapi data input',
    });
  }

  try {
    await notesModel.createNewNotes(body);
    res.status(201).json({
      message: 'Post notes success',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal simpan note',
      serverMessage: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  const { idNote } = req.params;
  const { body } = req;

  try {
    const [rows] = await notesModel.findNoteById(idNote);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Note dengan ID tersebut tidak ditemukan',
      });
    }

    // Validasi: Tidak boleh ada nilai null
    const isNullValue = Object.values(body).some(
      (value) => value === null || value === 0 || value === ''
    );

    if (isNullValue) {
      return res.status(400).json({
        message: 'Mohon kolom nya dilengkapi',
      });
    }

    // Lakukan update jika lolos validasi
    await notesModel.updateNote(body, idNote);

    res.json({
      message: 'Update Note berhasil',
      data: body,
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      message: 'Gagal update note',
      serverMessage: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  const { idNote } = req.params;

  try {
    // Periksa apakah catatan dengan idNote ada di database
    const [rows] = await notesModel.findNoteById(idNote);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Note dengan ID tersebut tidak ditemukan',
      });
    }

    // Jika ada, lanjutkan dengan menghapus
    await notesModel.deleteNote(idNote);
    res.json({
      message: 'Delete Note success',
    });
  } catch (error) {
    console.error('Error deleting note:', error);
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
