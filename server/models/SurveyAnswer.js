const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Conexión a la base de datos

const SurveyAnswer = sequelize.define(
    'SurveyAnswer',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        survey_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        option_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'survey_answers',
        timestamps: true, // Habilita createdAt y updatedAt automáticos
    }
);

module.exports = SurveyAnswer;
