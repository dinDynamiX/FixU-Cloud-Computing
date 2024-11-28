const diagnoseModel = require('../models/diagnose');

const getAllFormStudent = async (req, res) => {
  try {
    const [data] = await diagnoseModel.getAllFormStudent();
    res.status(200).json({
      message: 'get Form success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

// const storeAnswerStudentForm = (req, res) => {};

//Predict Model Student
const predictModelStudent = async (req, res) => {
  try {
    // Ambil data dari request body
    const payload = req.body;

    // Validasi apakah body kosong
    if (!payload || Object.keys(payload).length === 0) {
      return res
        .status(400)
        .json({ message: 'Data is required for prediction.' });
    }

    // Kirim data ke model untuk melakukan prediksi
    const result = await diagnoseModel.predictModelStudent(payload);

    // Ambil feedback, probability, dan result dari response
    const { feedback, probability, result: predictionResult } = result;

    // Simpan feedback ke dalam tabel feedback
    await diagnoseModel.storePredictionFeedbackStudent(
      feedback,
      probability,
      predictionResult
    );

    // Kembalikan hasil prediksi
    res.status(200).json({
      message: 'Prediction successful.',
      result,
    });
  } catch (error) {
    // Tangani error
    console.error(error);
    res.status(500).json({
      message: 'Error during prediction.',
      error: error.message,
    });
  }
};

//Predict Model Professional
const predictModelProfessional = async (req, res) => {
  try {
    // Ambil data dari request body
    const payload = req.body;

    // Validasi apakah body kosong
    if (!payload || Object.keys(payload).length === 0) {
      return res
        .status(400)
        .json({ message: 'Data is required for prediction.' });
    }

    // Kirim data ke model untuk melakukan prediksi
    const resultPrediction = await diagnoseModel.predictModelProfessional(
      payload
    );

    // Simpan hasil prediksi ke dalam tabel history
    const {
      feedback,
      probability,
      result: predictionResult,
    } = resultPrediction; // Sesuaikan dengan hasil dari API prediksi
    await diagnoseModel.savePredictionProfessionalToHistory(
      feedback,
      probability,
      predictionResult
    );

    // Kembalikan hasil prediksi
    res.status(200).json({
      message: 'Prediction successful and saved to history.',
      result: predictionResult,
    });
  } catch (error) {
    // Tangani error
    console.error(error);
    res.status(500).json({
      message: 'Error during prediction.',
      error: error.message,
    });
  }
};

// Kirim Hasil Feedback
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

const getAllHistory = async (req, res) => {
  try {
    const uuid = req.uuid;
    const [data] = await diagnoseModel.getAllHistoryDiagnose(uuid);
    res.status(200).json({
      message: 'get History success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllFormStudent,
  sendFeedback,
  getAllHistory,
  predictModelStudent,
  predictModelProfessional,
};
