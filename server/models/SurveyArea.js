const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Asegúrate de que este path sea correcto

const SurveyArea = sequelize.define('SurveyArea', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    area_name: { // Cambié 'name' por 'area_name'
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'survey_areas', // Nombre de la tabla en la base de datos
    timestamps: false // No queremos que Sequelize agregue createdAt y updatedAt automáticamente
});

module.exports = SurveyArea;
