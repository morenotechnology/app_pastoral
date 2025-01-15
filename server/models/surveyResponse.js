const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SurveyResponse = sequelize.define('SurveyResponse', {
    leaderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    responses: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

module.exports = SurveyResponse;
