const diagnoseModel = require('../models/diagnose');

const getAllFormStudent = async (req, res) => {
  try {
    const [data] = await diagnoseModel.getAllFormStudent();
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

// Kirim Hasil Feedback
// controllers/diagnoseControllers.js
const sendFeedback = async (req, res) => {
  const { body } = req;
  try {
    await diagnoseModel.sendFeedback(body);

    // Pastikan respons dikirim setelah berhasil
    res.status(201).json({
      message: 'Feedback saved successfully.',
      data: body, // Pastikan ini berisi data yang relevan
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving feedback.', error });
  }
};

module.exports = {
  getAllFormStudent,
  sendFeedback,
};
