const notesModel = require('../models/notes.js');

const getAllNotes = async (req, res) => {
  try {
    const [data] = await notesModel.getAllNotes();
    res.json({
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
  res.json({
    message: 'Get Halaman Add notes',
  });
};

const createNewNotes = async (req, res) => {
  const { body } = req;

  try {
    await notesModel.createNewNotes(body);
    res.json({
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

    await notesModel.updateNote(body, idNote);

    res.json({
      message: 'Update Note',
      data: req.body,
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
