const db = require('../config/db');

// Get Data Note
const getAllFormStudent = () => {
  const SQLQuery = 'SELECT * FROM question_students';

  return db.execute(SQLQuery);
};

//Send Feedback
const sendFeedback = (body) => {
  const SQLQuery = `INSERT INTO feedback (user_id, role, feedback, probability, result)
                    VALUES (?, ?, ?, ?, ?)`;

  return db.execute(SQLQuery, [
    body.user_id,
    body.role,
    body.feedback,
    body.probability,
    body.result,
  ]);
};

module.exports = {
  getAllFormStudent,
  sendFeedback,
};
