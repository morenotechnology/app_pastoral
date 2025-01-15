const SurveyModel = require('../models/SurveyModel');
const SurveyQuestion = require('../models/SurveyQuestion');
const SurveyAnswer = require('../models/SurveyAnswer');

// Obtener preguntas de la encuesta desde la base de datos
const getSurveyQuestions = async (req, res) => {
    try {
        // Consultar todas las preguntas y sus opciones
        const questions = await SurveyQuestion.findAll({
            attributes: ['id', 'question', 'area_id'],
            include: [
                {
                    model: SurveyOption,
                    attributes: ['id', 'option_text']
                }
            ],
            order: [['id', 'ASC']]
        });

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error al obtener preguntas' });
    }
};

// Guardar respuestas de la encuesta
const submitSurveyResponse = async (req, res) => {
    const { surveyId } = req.params; // ID de la encuesta
    const { responses } = req.body; // Array de respuestas [{ questionId, answer }, ...]

    try {
        // Verificar si la encuesta existe
        const survey = await SurveyModel.findByPk(surveyId);
        if (!survey) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        // Guardar cada respuesta en la base de datos
        const answerPromises = responses.map(({ questionId, answer }) => {
            return SurveyAnswer.create({
                survey_id: surveyId,
                question_id: questionId,
                answer
            });
        });

        await Promise.all(answerPromises); // Ejecutar todas las promesas de inserción

        res.status(201).json({ message: 'Respuestas guardadas correctamente' });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ message: 'Error al guardar respuestas' });
    }
};

module.exports = { getSurveyQuestions, submitSurveyResponse };
