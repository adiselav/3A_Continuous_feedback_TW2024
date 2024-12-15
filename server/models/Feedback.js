const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Activity = require('./Activity');

const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reaction: {
        type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'),
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

Feedback.belongsTo(Activity, { foreignKey: 'ActivityId' });

module.exports = Feedback;
