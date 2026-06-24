const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Token = sequelize.define('Token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Token;