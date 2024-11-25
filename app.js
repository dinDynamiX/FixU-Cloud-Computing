require('dotenv').config();

const express = require('express');

const middlewareLogRequest = require('./src/middleware/logs');
const app = express();
const PORT = process.env.PORT || 4000;

const notesRoutes = require('./src/routes/notes');

// const db = require('./src/config/db');

app.use(middlewareLogRequest);
app.use(express.json());

app.use('/notes', notesRoutes);

// Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Fixu API');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
