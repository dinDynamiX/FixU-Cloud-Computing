const getAllNotes = (req, res) => {
  const data = {
    id: '1',
    title: 'Aku terbully',
    content: 'awkoakwokaowkaokwoak terbully',
  };
  res.json({
    message: 'get notes success',
    data,
  });
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
