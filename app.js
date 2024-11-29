require('dotenv').config();

const express = require('express');
const middlewareLogRequest = require('./src/middleware/logs');
const app = express();
const PORT = process.env.PORT || 4000;

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authRoutes = require('./src/routes/authRoute');
const authenticate = require('./src/middleware/authentication');

const notesRoutes = require('./src/routes/notes');
const diagnoseRoutes = require('./src/routes/diagnose');

app.use(middlewareLogRequest);
app.use(express.json());

// Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Fixu API');
});

app.use('/notes', notesRoutes);
app.use('/features', diagnoseRoutes);
app.use('/predict', diagnoseRoutes);
app.use('/history', authenticate, diagnoseRoutes);

app.use('/auth', authRoutes);

// Protected route example
app.get('/protected', authenticate, (req, res) => {
  res.status(200).json({
    message: 'Authorized access.',
    user: {
      uid: req.user.uid,
      email: req.user.email,
      fullname: req.user.fullname,
      whatsapp: req.user.whatsapp,
    },
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
