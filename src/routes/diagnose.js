const express = require('express');

const router = express.Router();

const diagnoseControllers = require('../controllers/diagnoseControllersControllers');

router.get('/', diagnoseControllers.getAllNotes);

//Student
router.get('/features/student', diagnoseControllers.addNewNote);
router.post('/predict/student', diagnoseControllers.createNewNotes);

//Professional
router.get('/features/professional', diagnoseControllers.addNewNote);
router.post('/predict/professional', diagnoseControllers.createNewNotes);

module.exports = router;
