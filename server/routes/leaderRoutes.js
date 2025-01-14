// routes/leaderRoutes.js
const express = require('express');
const router = express.Router();
const leaderController = require('../controllers/leaderController');

// Ruta para registrar un líder
router.post('/register', leaderController.registerLeader);

module.exports = router;
