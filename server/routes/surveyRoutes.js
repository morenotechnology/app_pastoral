const express = require('express');
const router = express.Router();
const SurveyQuestion = require('../models/SurveyQuestion');
const SurveyModel = require('../models/SurveyModel');

// Ruta para obtener todas las preguntas de una encuesta específica
router.get('/:surveyId/questions', async (req, res) => {
    try {
        const questions = await SurveyQuestion.findAll({
            attributes: ['id', 'question', 'area_id'],
            order: [['id', 'ASC']]
        });

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error al obtener preguntas' });
    }
});


module.exports = router;
