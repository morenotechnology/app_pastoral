const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SurveyOption = sequelize.define('SurveyOption', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },    question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    option_text: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    tableName: 'survey_options',
    timestamps: false
});

module.exports = SurveyOption;
