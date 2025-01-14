// models/leader.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Church = require('./church'); // Importar el modelo Church

const Leader = sequelize.define('Leader', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    committee: { type: DataTypes.STRING, allowNull: false },
    church_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: { model: Church, key: 'id' }
    }
}, {
    tableName: 'leaders',
    timestamps: true
});

module.exports = Leader;
