const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const notesRoutes = require('./src/routes/notes');
const middlewareLogRequest = require('./src/middleware/logs');

app.use(express.json());

app.use(middlewareLogRequest);

app.use('/notes', notesRoutes);
app.use('/notes/add', notesRoutes);

// Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Fixu API');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
