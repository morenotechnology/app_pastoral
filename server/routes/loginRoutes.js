const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const authenticateUser = require('../middleware/authenticateUser');

const Leader = require('../models/leader');
const { v4: uuidv4 } = require('uuid');

// Ruta para manejar el inicio de sesión
router.post('/login', loginController.login);

// Ruta para obtener los datos del líder actual
router.get('/leaders/me', authenticateUser, async (req, res) => {
    try {
        const leader = await Leader.findOne({ where: { id: req.user.id } });
        if (!leader) {
            return res.status(404).json({ message: 'Líder no encontrado' });
        }

        res.status(200).json({
            id: leader.id,
            name: leader.name,
            committee: leader.committee
        });
    } catch (error) {
        console.error('Error al obtener datos del líder:', error);
        res.status(500).json({ message: 'Error al obtener datos del líder' });
    }
});

// Ruta para generar un enlace único para el líder
router.get('/leaders/me', authenticateUser, async (req, res) => {
    try {
        const leader = await Leader.findOne({ where: { id: req.user.id } });
        if (!leader) {
            return res.status(404).json({ message: 'Líder no encontrado' });
        }

        res.status(200).json({
            id: leader.id,
            name: leader.name,
            committee: leader.committee
        });
    } catch (error) {
        console.error('Error al obtener datos del líder:', error);
        res.status(500).json({ message: 'Error al obtener datos del líder' });
    }
});


module.exports = router;
