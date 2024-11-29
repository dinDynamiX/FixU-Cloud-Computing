const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

// Inisialisasi Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
