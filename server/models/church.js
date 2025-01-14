const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Church = sequelize.define('Church', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    pastor_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false
    }
});

module.exports = Church;
