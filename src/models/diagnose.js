const axios = require('axios');
const db = require('../config/db');

// Get Data Note
const getAllFormStudent = () => {
  const SQLQuery = 'SELECT * FROM question_students';

  return db.execute(SQLQuery);
};
``;
//API Model Predict Student
const predictModelStudent = async (payload) => {
  try {
    const response = await axios.post(
      'endpoint_ml',
      payload
    );
    return response.data; // Kembalikan data dari API eksternal
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch prediction'
    );
  }
};

// const storePredictionFeedbackStudent = async (
//   feedback,
//   probability,
//   result
// ) => {
//   const SQLQuery = `
//       INSERT INTO feedback (user_uid, role, feedback, probability, result)
//       VALUES (?, ?, ?, ?)
//     `; // tambahin uuid sama role

//   try {
//     const [result] = await db.execute(SQLQuery, [
//       feedback,
//       probability,
//       result,
//     ]);
//     return result; // Return result untuk konfirmasi bahwa data telah disimpan
//   } catch (error) {
//     throw new Error('Failed to store prediction feedback');
//   }
// };

//API Model Predict Professional
const predictModelProfessional = async (payload) => {
  try {
    const response = await axios.post(
      'endpoint_ml',
      payload
    );
    return response.data; // Kembalikan data dari API eksternal
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch prediction'
    );
  }
};

const savePredictionProfessionalToHistory = (feedback, probability, result) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO history (feedback, probability, result, created_at)
      VALUES (?, ?, ?, NOW())
    `;
    db.query(query, [feedback, probability, result], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

//Send Feedback
// const sendFeedback = (body) => {
//   const SQLQuery = `INSERT INTO feedback (uuid, role, feedback, probability, result)
//                     VALUES (?, ?, ?, ?, ?)`; //aku tambahin user_uid

//   return db.execute(SQLQuery, [
//     body.uuid,
//     body.role,
//     body.feedback,
//     body.probability,
//     body.result,
//   ]);
// };

const getAllHistoryDiagnose = () => {
  const SQLQuery = `SELECT * FROM history`;
  return db.execute(SQLQuery);
};

module.exports = {
  getAllFormStudent,
  getAllHistoryDiagnose,
  // sendFeedback,
  predictModelStudent,
  // storePredictionFeedbackStudent,

  predictModelProfessional,
  savePredictionProfessionalToHistory,
};
