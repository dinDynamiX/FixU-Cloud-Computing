// Contoh endpoint untuk mengambil data riwayat diagnosis berdasarkan UID Firebase:

const express = require('express');
const app = express();

app.use(express.json());

// Endpoint untuk mendapatkan data riwayat

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Koneksi ke MySQL:

// Gunakan library seperti mysql atau mysql2 untuk menghubungkan backend dengan MySQL.

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'your-google-cloud-sql-host',
  user: 'your-username',
  password: 'your-password',
  database: 'your-database',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});
