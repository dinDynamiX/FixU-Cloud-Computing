const getAllNotes = (req, res) => {
  res.json({
    message: 'get notes success',
  });
};

const createNewNotes = (res, req) => {
  req.json({
    message: 'Post notes success',
  });
};

module.exports = {
  getAllNotes,
  createNewNotes,
};
