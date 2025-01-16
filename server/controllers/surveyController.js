const { SurveyModel, SurveyQuestion, SurveyOption, SurveyAnswer } = require('../config/associations'); // Importar modelos correctos

// Obtener preguntas de la encuesta desde la base de datos
const getSurveyQuestions = async (req, res) => {
    try {
        const questions = await SurveyQuestion.findAll({
            attributes: ['id', 'question', 'area_id'],
            include: [
                {
                    model: SurveyOption,
                    as: 'SurveyOptions', // Alias debe coincidir con el de la asociación
                    attributes: ['id', 'option_text']
                }
            ],
            order: [['id', 'ASC']]
        });

        console.log('Preguntas y opciones recibidas:', JSON.stringify(questions, null, 2));
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error al obtener preguntas' });
    }
};

// Guardar respuestas de la encuesta
const submitSurveyResponse = async (req, res) => {
    const { surveyId } = req.params;
    const { responses } = req.body;

    console.log('Datos recibidos:', responses); // Agregar log para depuración

    try {
        const survey = await SurveyModel.findByPk(surveyId);
        if (!survey) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        const answerPromises = responses.map(({ questionId, optionId }) => {
            return SurveyAnswer.create({
                survey_id: surveyId,
                question_id: questionId,
                option_id: optionId
            });
        });

        await Promise.all(answerPromises);
        res.status(201).json({ message: 'Respuestas guardadas correctamente' });
    } catch (error) {
        console.error('Error al guardar respuestas:', error); // Log del error
        res.status(500).json({ message: 'Error al guardar respuestas' });
    }
};

module.exports = { getSurveyQuestions, submitSurveyResponse };
