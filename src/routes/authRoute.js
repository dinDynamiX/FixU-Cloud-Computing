const express = require('express');

const router = express.Router();

const authControllers = require('../controllers/authControllers');

// Signup Endpoint
router.post('/signup', authControllers.signup);

// Login Endpoint
router.post('/login', authControllers.login);

router.get('/user', authControllers.getAllUsers);

module.exports = router;
