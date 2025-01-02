const express = require("express");
const { loginUser } = require("../controllers/loginController"); // Importa el controlador del login

const router = express.Router();

// Ruta para iniciar sesión
router.post("/login", loginUser);

module.exports = router;
