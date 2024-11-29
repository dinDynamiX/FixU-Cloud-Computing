const jwt = require('jsonwebtoken');

// Secret key untuk JWT (harus sama dengan yang digunakan saat generate token)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const token = authHeader.split(' ')[1]; // Ambil token setelah 'Bearer '

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET_KEY); // Verifikasi token dengan JWT_SECRET_KEY
    req.user = decodedToken; // Simpan data pengguna di request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized.', error: error.message });
  }
};

module.exports = authentication;
