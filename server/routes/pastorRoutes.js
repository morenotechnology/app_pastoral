const express = require('express');
const router = express.Router();
const pastorController = require('../controllers/pastorController');

router.post('/register', pastorController.registerPastorAndChurch);

module.exports = router;
