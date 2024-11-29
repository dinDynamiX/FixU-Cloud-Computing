const express = require('express');

const router = express.Router();

const diagnoseControllers = require('../controllers/diagnoseControllers');

// router.get('/', diagnoseControllers.getAllNotes);

//Student
// router.get('/student', diagnoseControllers.getAllFormStudent);
router.post('/result/student', diagnoseControllers.predictModelStudent);

router.post(
  '/result/professional',
  diagnoseControllers.predictModelProfessional
);

router.get('/', diagnoseControllers.getAllHistory);
//Professional
// router.get('/features/professional', diagnoseControllers.getAllFormStudent);
// router.post('/predict/professional', diagnoseControllers.createNewNotes);

module.exports = router;
