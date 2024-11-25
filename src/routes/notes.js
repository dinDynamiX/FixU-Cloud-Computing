const express = require('express');

const router = express.Router();

const notesControllers = require('../controllers/noteControllers');

router.get('/', notesControllers.getAllNotes);

router.post('/', notesControllers.createNewNotes);

module.exports = router;
