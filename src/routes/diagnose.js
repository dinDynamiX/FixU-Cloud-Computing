const express = require('express');

const router = express.Router();

const diagnoseControllers = require('../controllers/diagnoseControllers');

// router.get('/', diagnoseControllers.getAllNotes);

//Student
// router.get('/student', diagnoseControllers.getAllFormStudent);
router.post('/result/student', diagnoseControllers.sendFeedback);

//Professional
// router.get('/features/professional', diagnoseControllers.getAllFormStudent);
// router.post('/predict/professional', diagnoseControllers.createNewNotes);

module.exports = router;
