const admin = require('../config/firebase');

// Fungsi untuk memverifikasi token Firebase
const verifyIdToken = async (token, res) => {
  try {
    // Verifikasi token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    console.log(uid);

    return uid;
  } catch (error) {
    console.error('Error verifying token:', error.message);

    // Menangani jika token expired
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        message: 'Token has expired. Please login again.',
      });
    }

    // Menangani error lainnya, seperti token invalid
    return res.status(401).json({
      message: 'Invalid token.',
      serverMessage: error.message, // Menyertakan pesan error lebih rinci jika diperlukan
    });
  }
};

module.exports = { verifyIdToken };
