const { sequelize, connectDB } = require('../config/database');
const User = require('./User');
const Activity = require('./Activity');
const Feedback = require('./Feedback');

const syncModels = async () => {
    await sequelize.sync({ alter: true });
    console.log('Tabelele au fost sincronizate!');
};

module.exports = {
    sequelize,
    connectDB,
    syncModels,
    User,
    Activity,
    Feedback,
};
