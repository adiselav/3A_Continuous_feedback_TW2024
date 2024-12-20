const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexiunea la baza de date a fost realizată cu succes!');
    } catch (error) {
        console.error('Eroare la conectarea la baza de date:', error);
    }
};

module.exports = { sequelize, connectDB };
