require('dotenv').config();

const express = require('express');

const middlewareLogRequest = require('./src/middleware/logs');
const app = express();
const PORT = process.env.PORT || 4000;

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

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
