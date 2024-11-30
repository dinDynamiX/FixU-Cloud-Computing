const express = require('express');
const router = express.Router();

const diagnoseControllers = require('../controllers/diagnoseControllers');

/// Mengambil seluruh data
router.get('/', diagnoseControllers.getAllHistory);

///Student

router.post('/student/result', diagnoseControllers.predictModelStudent);

//Professional
router.post(
  '/professional/result',
  diagnoseControllers.predictModelProfessional
);

module.exports = router;
