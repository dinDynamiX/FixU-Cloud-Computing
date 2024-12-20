const express = require('express');
const { getCurrentImage } = require('../controllers/quotesController');

const router = express.Router();

router.get('/quotes', getCurrentImage);

module.exports = router;
