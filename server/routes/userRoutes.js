const express = require("express");
const { registerUser } = require("../controllers/userController"); // Importa los controladores necesarios

const router = express.Router();

// Ruta para registrar usuarios
router.post("/register", registerUser);

module.exports = router;
