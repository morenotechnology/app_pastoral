const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importa la configuración de Sequelize
const SurveyOption = require('./SurveyOption'); // Importar el modelo de opciones si es necesario

const SurveyQuestion = sequelize.define('SurveyQuestion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'survey_questions', // Nombre de la tabla en la base de datos
    timestamps: false // Desactiva createdAt y updatedAt automáticos
});



module.exports = SurveyQuestion;
