const diagnoseModel = require('../models/diagnoseModel');

//Predict Model Student
const predictModelStudent = async (req, res) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '

    // Pisahkan `uid` dari `req.body`
    const { uid, ...payload } = req.body;

    // Validasi apakah `uid` dan `payload` ada
    if (!uid) {
      return res.status(400).json({ message: 'UID is required.' });
    }

    if (!payload || Object.keys(payload).length === 0) {
      return res
        .status(400)
        .json({ message: 'Data is required for prediction.' });
    }

    // Kirim data ke model untuk melakukan prediksi
    const predictionResult = await diagnoseModel.predictModelStudent(
      payload,
      token
    );

    const { feedback, probability, result } = predictionResult;

    // Kirim `uid` dan hasil prediksi ke `sendFeedback`
    await diagnoseModel.sendFeedback({
      uid,
      feedback,
      probability,
      result,
    });

    // Kembalikan hasil prediksi
    res.status(200).json({
      message: 'Prediction successful.',
      result: predictionResult,
    });
  } catch (error) {
    // Tangani error
    console.error('Error during prediction:', error);
    res.status(500).json({
      message: 'Error during prediction.',
      serverError: error.message,
    });
  }
};

const predictModelProfessional = async (req, res) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token is missing or invalid.' });
    }

    const token = authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '

    // Pisahkan `uid` dari `req.body`
    const { uid, ...payload } = req.body;

    // Validasi apakah `uid` dan `payload` ada
    if (!uid) {
      return res.status(400).json({ message: 'UID is required.' });
    }

    if (!payload || Object.keys(payload).length === 0) {
      return res
        .status(400)
        .json({ message: 'Data is required for prediction.' });
    }

    // Kirim data ke model untuk melakukan prediksi
    const predictionResult = await diagnoseModel.predictModelProfessional(
      payload,
      token
    );

    const { feedback, probability, result } = predictionResult;

    // Kirim `uid` dan hasil prediksi ke `sendFeedback`
    await diagnoseModel.sendFeedback({
      uid,
      feedback,
      probability,
      result,
    });

    // Kembalikan hasil prediksi
    res.status(200).json({
      message: 'Prediction successful.',
      result: predictionResult,
    });
  } catch (error) {
    // Tangani error
    console.error('Error during prediction:', error);
    res.status(500).json({
      message: 'Error during prediction.',
      serverError: error.message,
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
    const uid = req.user?.uid;
    if (!uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const [data] = await diagnoseModel.getAllHistoryDiagnose(uid);
    console.log(uid);

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

module.exports = {
  sendFeedback,
  getAllHistory,
  predictModelStudent,
  predictModelProfessional,
};
