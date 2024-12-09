const express = require('express');
const { getCurrentImage } = require('../controllers/quotesController');

const router = express.Router();

// Rute untuk mendapatkan gambar saat ini
router.get('/quotes', getCurrentImage);

module.exports = router;
