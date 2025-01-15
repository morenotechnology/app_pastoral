const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');// Importa la instancia correcta de Sequelize

const SurveyModel = sequelize.define('Survey', {
    id: {
        type: DataTypes.UUID, // Usamos UUID para identificadores únicos
        defaultValue: DataTypes.UUIDV4, // Genera automáticamente un UUID
        primaryKey: true
    },
    leader_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'leaders', // Nombre de la tabla referenciada
            key: 'id'
        },
        onDelete: 'CASCADE' // Si se elimina un líder, se eliminan sus encuestas
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'surveys', // Nombre de la tabla en la base de datos
    timestamps: false // No queremos que Sequelize agregue createdAt y updatedAt automáticamente
});

module.exports = SurveyModel;
