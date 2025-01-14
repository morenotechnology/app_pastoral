const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pastor = sequelize.define('Pastor', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    years_of_ministry: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Pastor;
