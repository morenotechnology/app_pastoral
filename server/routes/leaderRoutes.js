const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // Importar correctamente uuidv4
const { registerLeader } = require('../controllers/leaderController');
const auth = require('../middleware/authenticateUser.js'); // Importar el middleware
const Leader = require('../models/leader');

const SurveyModel = require('../models/SurveyModel'); // Importar el modelo SurveyModel

// Ruta para registrar un líder
router.post('/register', registerLeader);

// Ruta para obtener los datos del líder actual
router.get('/me', auth, async (req, res) => {
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

// Ruta para generar el enlace de encuesta
router.get('/generate-link', auth, async (req, res) => {
    try {
        const leaderId = req.user.id;

        // Verificar si ya existe una encuesta para este líder
        let survey = await SurveyModel.findOne({ where: { leader_id: leaderId } });

        if (!survey) {
            // Si no existe, crear una nueva encuesta
            survey = await SurveyModel.create({
                id: uuidv4(),
                leader_id: leaderId,
                created_at: new Date()
            });
        }

        // Generar el enlace con el survey_id de la encuesta
        const uniqueLink = `http://145.223.92.106:3001/survey/${survey.id}`;

        res.status(200).json({
            message: 'Enlace generado exitosamente',
            link: uniqueLink
        });
    } catch (error) {
        console.error('Error al generar el enlace:', error);
        res.status(500).json({ message: 'Error al generar el enlace' });
    }
});

module.exports = router;
