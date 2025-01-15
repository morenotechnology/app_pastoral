const jwt = require('jsonwebtoken');
const Pastor = require('../models/pastor');
const Leader = require('../models/leader');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Datos recibidos:', email, password);

    try {
        // Buscar al usuario primero en la tabla de pastores
        let user = await Pastor.findOne({ where: { email } });
        let role = 'pastor';

        // Si no es pastor, buscar en la tabla de líderes
        if (!user) {
            user = await Leader.findOne({ where: { email } });
            role = 'leader';
        }

        // Si el usuario no se encuentra en ninguna tabla
        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Verificar la contraseña sin encriptar
        if (password !== user.password) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Generar un token JWT con el ID y el rol del usuario
        const token = jwt.sign({ id: user.id, role }, 'tu_clave_secreta', { expiresIn: '1h' });

        console.log('Inicio de sesión exitoso:', role);
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            role,
            token
        });
    } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
