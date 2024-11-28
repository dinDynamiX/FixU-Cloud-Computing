const admin = require('firebase-admin');

const firebaseVerifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken); //firebase.auth.verifyIdToken
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Token or Expired',
      error: error.message,
    });
  }
};

module.exports = firebaseVerifyToken;
