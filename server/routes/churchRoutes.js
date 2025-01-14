const express = require('express');
const router = express.Router();
const churchController = require('../controllers/churchController');

// Ruta para crear una iglesia
router.post('/', churchController.createChurch);

// Ruta para obtener todas las iglesias
router.get('/', churchController.getAllChurches);

module.exports = router;
