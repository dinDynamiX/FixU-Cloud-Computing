const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Endpoint
app.get('/', (req, res) => {
  res.send('Welcome to my RESTful API!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
