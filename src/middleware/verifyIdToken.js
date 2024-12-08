const admin = require('../config/firebase');

// Fungsi untuk memverifikasi token Firebase
const verifyIdToken = async (token) => {
  // Verifikasi ID token dengan Firebase Admin SDK
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid; // Mengembalikan UID dari token yang terverifikasi
};

module.exports = { verifyIdToken };
