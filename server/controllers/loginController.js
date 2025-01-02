const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;

        if (!correo || !contraseña) {
            return res.status(400).json({ message: "El correo y la contraseña son obligatorios" });
        }

        const user = await User.findOne({ where: { correo } });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);

        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: { id: user.id, nombre_completo: user.nombre_completo },
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error al iniciar sesión", error });
    }
};
