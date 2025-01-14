const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Ruta para manejar el inicio de sesión
router.post('/login', loginController.login);

module.exports = router;
