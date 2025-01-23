const { sequelize, connectDB } = require('../config/database');
const User = require('./User');
const Activity = require('./Activity');
const Feedback = require('./Feedback');

Activity.hasMany(Feedback, { foreignKey: 'ActivityId' });
Feedback.belongsTo(Activity, { foreignKey: 'ActivityId' });

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
