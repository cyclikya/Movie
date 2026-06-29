const { DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const UserMovie = sequelize.define('UserMovie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    kinopoiskId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
});

module.exports = UserMovie;