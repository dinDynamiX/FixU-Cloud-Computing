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
      process.env.STUDENT_PREDICT_URL,
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
      process.env.PROFESSIONAL_PREDICT_URL,
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
const sendFeedback = async (body) => {
  const SQLQuery = `INSERT INTO feedback (uid, feedback, probability, result)
                    VALUES (?, ?, ?, ?)`;

  const [result] = await db.execute(SQLQuery, [
    body.uid,
    body.feedback,
    body.probability,
    body.result,
  ]);

  return result.insertId;
};

const findNoteById = (idPredict) => {
  const SQLQuery = `SELECT * FROM feedback WHERE id = ?`;
  return db.execute(SQLQuery, [idPredict]);
};

const getAllHistoryDiagnose = (uid) => {
  const SQLQuery = `SELECT * FROM feedback WHERE uid = ?`;
  return db.execute(SQLQuery, [uid]);
};

module.exports = {
  findNoteById,
  getAllFormStudent,
  getAllHistoryDiagnose,
  sendFeedback,
  predictModelStudent,
  // storePredictionFeedbackStudent,

  predictModelProfessional,
};
