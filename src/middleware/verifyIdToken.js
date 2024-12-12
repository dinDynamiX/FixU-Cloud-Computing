const admin = require('../config/firebase');

// memverifikasi token 
const verifyIdToken = async (token, res) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    console.log(uid);

    return uid;
  } catch (error) {
    console.error('Error verifying token:', error.message);

    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        message: 'Token has expired. Please login again.',
      });
    }

    return res.status(401).json({
      message: 'Invalid token.',
      serverMessage: error.message,
    });
  }
};

module.exports = { verifyIdToken };
