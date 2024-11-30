const axios = require('axios');
const db = require('../config/db');

// Get Data Note
const getAllFormStudent = () => {
  const SQLQuery = 'SELECT * FROM question_students';

  return db.execute(SQLQuery);
};
//API Model Predict Student
const predictModelStudent = async (payload) => {
  try {
    const response = await axios.post(
      'https://fixu-api-1045437150026.asia-southeast2.run.app/predict/student',
      payload
    );
    return response.data; // Kembalikan data dari API eksternal
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch prediction'
    );
  }
};

//API Model Predict Professional
const predictModelProfessional = async (payload) => {
  try {
    const response = await axios.post(
      'https://fixu-api-1045437150026.asia-southeast2.run.app/predict/professional',
      payload
    );
    return response.data; // Kembalikan data dari API eksternal
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch prediction'
    );
  }
};

// Send Feedback
const sendFeedback = (body) => {
  const SQLQuery = `INSERT INTO feedback (uid, feedback, probability, result)
                    VALUES (?, ?, ?, ?)`;

  return db.execute(SQLQuery, [
    body.uid,
    body.feedback,
    body.probability,
    body.result,
  ]);
};

const getAllHistoryDiagnose = (uid) => {
  const SQLQuery = `SELECT * FROM feedback WHERE uid = ?`;
  return db.execute(SQLQuery, [uid]);
};

module.exports = {
  getAllFormStudent,
  getAllHistoryDiagnose,
  sendFeedback,
  predictModelStudent,
  // storePredictionFeedbackStudent,

  predictModelProfessional,
};
