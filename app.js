require('dotenv').config();

const express = require('express');
const middlewareLogRequest = require('./src/middleware/logs');
const app = express();
const PORT = process.env.PORT || 4000;

const authRoutes = require('./src/routes/authRoute');
const authenticate = require('./src/middleware/authentication');

const notesRoutes = require('./src/routes/notesRoute');
const diagnoseRoutes = require('./src/routes/diagnoseRoute');

app.use(middlewareLogRequest);
app.use(express.json());

// Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Fixu API');
});

app.use('/notes', authenticate, notesRoutes);
app.use('/features', diagnoseRoutes);
app.use('/predict', diagnoseRoutes);
app.use('/history', authenticate, diagnoseRoutes);

app.use('/auth', authRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
