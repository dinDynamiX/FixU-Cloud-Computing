const admin = require('../config/firebase');
const { verifyIdToken } = require('../middleware/verifyIdToken');

const signup = async (req, res) => {
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
};

const login = async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  console.log(token);

  if (!token) {
    return res.status(400).json({
      message: 'Token is missing',
    });
  }

  try {
    // Verifikasi token
    const uid = await verifyIdToken(token);
    console.log(uid);

    const userRecord = await admin.auth().getUser(uid);

    const userData = {
      uid: userRecord.uid,
      name: userRecord.displayName,
      email: userRecord.email,
    };

    res.status(200).send({
      message: 'Token valid',
      user: userData,
    });
  } catch (error) {
    // Token tidak valid atau terjadi kesalahan
    res.status(401).json({ message: 'Token is invalid or expired', error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const listUsers = [];
    const result = await admin.auth().listUsers();
    result.users.forEach((userRecord) => {
      listUsers.push(userRecord.toJSON());
    });

    res.status(200).json(listUsers);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { signup, login, getAllUsers };
