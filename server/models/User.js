const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre_completo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    celular: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    documento_identidad: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    congregacion_actual: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    distrito: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    años_de_ministerio: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;
