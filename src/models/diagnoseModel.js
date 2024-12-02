const axios = require('axios');
const db = require('../config/db');

// Get Data Note
const getAllFormStudent = () => {
  const SQLQuery = 'SELECT * FROM question_students';

  return db.execute(SQLQuery);
};
//API Model Predict Student
const predictModelStudent = async (payload, token) => {
  try {
    console.log(token);
    const response = await axios.post(
      'https://fixu-ml-service-1045437150026.asia-southeast2.run.app/predict/student',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Kembalikan data dari API eksternal
  } catch (error) {
    // Log error respons dari API eksternal
    console.error(
      'Error fetching prediction:',
      error.response ? error.response.data : error.message
    );
    throw new Error(
      error.response?.data?.message || 'Failed to fetch prediction'
    );
  }
};

//API Model Predict Professional
const predictModelProfessional = async (payload, token) => {
  try {
    console.log(token);
    const response = await axios.post(
      'https://fixu-ml-service-1045437150026.asia-southeast2.run.app/predict/professional',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Kembalikan data dari API eksternal
  } catch (error) {
    // Log error respons dari API eksternal
    console.error(
      'Error fetching prediction:',
      error.response ? error.response.data : error.message
    );
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
