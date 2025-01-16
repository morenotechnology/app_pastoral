const express = require('express');
const router = express.Router();
const { SurveyQuestion, SurveyOption, SurveyAnswer, SurveyModel, Leader, SurveyArea } = require('../config/associations');
const ExcelJS = require('exceljs');
// Ruta para obtener todas las preguntas de una encuesta específica
router.get('/:surveyId/questions', async (req, res) => {
    try {
        const questions = await SurveyQuestion.findAll({
            attributes: ['id', 'question', 'area_id'],
            include: [
                {
                    model: SurveyOption,
                    as: 'SurveyOptions',
                    attributes: ['id', 'option_text']
                },
                {
                    model: SurveyArea,
                    as: 'SurveyArea', // Alias definido en las asociaciones
                    attributes: ['id', 'area_name'] // Cambia 'name' por 'area_name'
                }
            ],
            order: [['id', 'ASC']]
        });
        

        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).json({ message: 'Error al obtener preguntas' });
    }
});

// Ruta para obtener la información del líder y el comité
router.get('/:surveyId/leader', async (req, res) => {
    const { surveyId } = req.params;
    try {
        const survey = await SurveyModel.findByPk(surveyId, {
            include: {
                model: Leader,
                as: 'Leader', // Alias definido en las asociaciones
                attributes: ['name', 'committee']
            }
        });

        if (!survey) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        res.status(200).json({ leader: survey.Leader });
    } catch (error) {
        console.error('Error al obtener datos del líder:', error);
        res.status(500).json({ message: 'Error al obtener datos del líder' });
    }
});

// Ruta para guardar las respuestas de la encuesta
router.post('/:surveyId/submit', async (req, res) => {
    const { surveyId } = req.params;
    const { responses } = req.body; // Array de respuestas [{ questionId, optionId }, ...]

    try {
        if (!responses || responses.length === 0) {
            return res.status(400).json({ message: 'No se enviaron respuestas' });
        }

        // Guardar cada respuesta en la base de datos
        const answerPromises = responses.map(({ questionId, optionId }) => {
            return SurveyAnswer.create({
                survey_id: surveyId,
                question_id: questionId,
                option_id: optionId
            });
        });

        await Promise.all(answerPromises); // Ejecutar todas las inserciones en paralelo

        res.status(201).json({ message: 'Respuestas guardadas correctamente' });
    } catch (error) {
        console.error('Error al guardar respuestas:', error);
        res.status(500).json({ message: 'Error al guardar respuestas' });
    }
});

// Ruta para exportar los resultados de una encuesta
router.get('/export/:leaderId', async (req, res) => {
    const { leaderId } = req.params;

    try {
        // Obtener las respuestas relacionadas con el líder
        const results = await SurveyAnswer.findAll({
            include: [
                {
                    model: SurveyModel,
                    as: 'Survey',
                    where: { leader_id: leaderId },
                },
                {
                    model: SurveyQuestion,
                },
                {
                    model: SurveyOption,
                },
            ],
        });

        if (!results.length) {
            return res.status(404).json({ message: 'No se encontraron respuestas para este líder.' });
        }

        // Extraer todas las preguntas únicas
        const questions = Array.from(
            new Set(results.map((result) => result.SurveyQuestion.question))
        );

        // Crear un mapa para almacenar las respuestas por pregunta
        const responseMap = {};
        questions.forEach((question) => {
            responseMap[question] = []; // Inicializar array vacío para cada pregunta
        });

        // Llenar el mapa con las respuestas
        results.forEach((result) => {
            const question = result.SurveyQuestion.question;
            const answer = result.SurveyOption ? result.SurveyOption.option_text : 'Respuesta directa';
            responseMap[question].push(answer);
        });

        // Crear el archivo Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Resultados');

        // Añadir encabezados (las preguntas como columnas)
        worksheet.addRow(questions);

        // Determinar el número máximo de respuestas
        const maxResponses = Math.max(...Object.values(responseMap).map((answers) => answers.length));

        // Añadir respuestas debajo de cada pregunta
        for (let i = 0; i < maxResponses; i++) {
            const row = questions.map((question) => responseMap[question][i] || ''); // Rellenar vacíos si faltan respuestas
            worksheet.addRow(row);
        }

        // Configurar la descarga del archivo
        res.setHeader(
            'Content-Disposition',
            `attachment; filename=resultados_leader_${leaderId}.xlsx`
        );
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al exportar los resultados:', error);
        res.status(500).json({ message: 'Error al exportar los resultados.' });
    }
});






module.exports = router;
