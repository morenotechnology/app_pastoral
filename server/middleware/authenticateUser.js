const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No autorizado: Falta el token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Usa la variable de entorno
        req.user = decoded; // Guarda el ID y rol del usuario en req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

module.exports = authenticateUser;
