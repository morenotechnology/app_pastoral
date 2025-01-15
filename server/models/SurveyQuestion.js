const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importa la configuración de Sequelize

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
    timestamps: false // No queremos que Sequelize agregue createdAt y updatedAt automáticamente
});

module.exports = SurveyQuestion;
