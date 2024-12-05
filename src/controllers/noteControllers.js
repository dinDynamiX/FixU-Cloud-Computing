const notesModel = require('../models/notesModel.js');

const getAllNotes = async (req, res) => {
  try {
    const uid = req.user?.uid; // uid diambil dari middleware
    console.log('User UID:', uid); // Debug UID
    if (!uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [data] = await notesModel.getAllNotes(uid);

    res.status(200).json({
      message: 'Get History Success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
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
    // Simpan data dan dapatkan ID catatan baru
    const newNoteId = await notesModel.createNewNotes(body);

    // Ambil catatan yang baru saja disimpan
    const [newNote] = await notesModel.findNoteById(newNoteId);

    res.status(201).json({
      message: 'Post notes success',
      data: newNote, // Kirim data catatan ke respon
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
    // Cek apakah data dengan ID tersebut ada
    const [rows] = await notesModel.findNoteById(idNote);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Note dengan ID tersebut tidak ditemukan',
      });
    }

    // Validasi: Tidak boleh ada nilai null
    const isNullValue = Object.values(body).some(
      (value) => value === null || value === ''
    );

    if (isNullValue) {
      return res.status(400).json({
        message: 'Mohon kolomnya dilengkapi',
      });
    }

    // Lakukan update jika lolos validasi
    await notesModel.updateNote(body, idNote);

    // Ambil data terbaru dari database setelah di-update
    const [updatedRows] = await notesModel.findNoteById(idNote);

    res.json({
      message: 'Update Note berhasil',
      data: updatedRows[0], // Menampilkan seluruh data yang baru saja di-update
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

    // Simpan data yang akan dihapus
    const deletedData = rows[0];

    // Lanjutkan dengan menghapus catatan
    await notesModel.deleteNote(idNote);

    // Kirim respon dengan data yang telah dihapus
    res.json({
      message: 'Delete Note berhasil',
      deletedData, // Mengirimkan data yang baru saja dihapus
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
