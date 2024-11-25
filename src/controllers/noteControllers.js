const notesModel = require('../models/notes');

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

const createNewNotes = (req, res) => {
  console.log(req.body),
    res.json({
      message: 'Post notes success',
      data: req.body,
    });
};

const updateNote = (req, res) => {
  console.log(req.params);
  res.json({
    message: 'Update Note',
    data: req.body,
  });
};

const deleteNote = (req, res) => {
  const { idNote } = req.params;
  res.json({
    message: 'Delete Note success',
    data: {
      id: idNote,
      title: 'bullying',
      content: 'akwoakowkaowkaok',
    },
  });
};

module.exports = {
  getAllNotes,
  createNewNotes,
  addNewNote,
  updateNote,
  deleteNote,
};
