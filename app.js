require('dotenv').config();

const express = require('express');

const middlewareLogRequest = require('./src/middleware/logs');
const firebaseAdmin = require('firebase-admin');

const app = express();
const PORT = process.env.PORT || 4000;

// const verifyToken = require('./src/middleware/firebaseVerify');
const notesRoutes = require('./src/routes/notes');
const diagnoseRoutes = require('./src/routes/diagnose');

const serviceAccount = require('./serviceAccountKey.json.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

app.use(middlewareLogRequest);
app.use(express.json());

// Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Fixu API');
});

app.use('/notes', notesRoutes);
app.use('/features', diagnoseRoutes);
app.use('/predict', diagnoseRoutes);
app.use('/history', diagnoseRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
