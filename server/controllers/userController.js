const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Función para registrar usuarios
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Función para registrar usuarios
exports.registerUser = async (req, res) => {
    try {
        console.log("Datos recibidos en el backend:", req.body);

        const { name, email, password, role, church_id } = req.body;

        // Validaciones básicas
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Todos los campos obligatorios deben completarse." });
        }

        // Validar formato del correo
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "El formato del correo no es válido." });
        }

        // Validar rol (debe ser 'pastor' o 'líder')
        const validRoles = ["pastor", "lider"];
        if (!validRoles.includes(role.toLowerCase())) {
            return res.status(400).json({ message: "El rol debe ser 'pastor' o 'líder'." });
        }

        // Validar que si es líder, se pase `church_id`
        if (role.toLowerCase() === "lider" && !church_id) {
            return res.status(400).json({ message: "Los líderes deben seleccionar una iglesia." });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el usuario en la base de datos
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            church_id: role.toLowerCase() === "pastor" ? null : church_id, // Los pastores no necesitan church_id
        });

        res.status(201).json({ message: "Usuario registrado con éxito.", newUser });
    } catch (error) {
        console.error("Error al registrar usuario:", error);

        // Manejar error de restricción única (por ejemplo, email duplicado)
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                message: "El correo ya está registrado.",
            });
        }

        res.status(500).json({ message: "Error al registrar usuario.", error });
    }
};
