const express = require('express');
const admin = require('../config/firebase');
const jwt = require('jsonwebtoken'); // import jsonwebtoken
const router = express.Router();

// Secret key untuk JWT (disarankan untuk menyimpannya di .env)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Signup Endpoint
router.post('/signup', async (req, res) => {
  const { fullname, email, whatsapp, password, confirm_password } = req.body;

  if (!fullname || !email || !whatsapp || !password || !confirm_password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullname,
    });

    await admin.auth().setCustomUserClaims(userRecord.uid, {
      whatsapp,
    });

    res.status(201).json({
      message: 'User created successfully.',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        fullname: userRecord.displayName,
        whatsapp,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user.', error: error.message });
  }
});

// Login Endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  try {
    const user = await admin.auth().getUserByEmail(email);

    // Generate JWT token after successful login
    const token = jwt.sign(
      {
        uid: user.uid,
        email: user.email,
        fullname: user.displayName,
        whatsapp: user.customClaims?.whatsapp || null,
      },
      JWT_SECRET_KEY, // Secret key to sign JWT
      { expiresIn: '5h' }
    );

    res.status(200).json({
      message: 'Login successful.',
      token, // send the generated JWT token
      user: {
        uid: user.uid,
        email: user.email,
        fullname: user.displayName,
        whatsapp: user.customClaims?.whatsapp || null,
      },
    });
  } catch (error) {
    res
      .status(401)
      .json({ message: 'Invalid email or password.', error: error.message });
  }
});

module.exports = router;
