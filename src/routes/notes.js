const express = require('express');

const router = express.Router();

const notesControllers = require('../controllers/noteControllers');

router.get('/', notesControllers.getAllNotes);

router.get('/add', notesControllers.addNewNote);
router.post('/add', notesControllers.createNewNotes);

router.patch('/update/:idNote', notesControllers.updateNote);
router.delete('/:idNote', notesControllers.deleteNote);

module.exports = router;
