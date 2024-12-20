const express = require('express');
const dotenv = require('dotenv');
const { connectDB, syncModels } = require('./models');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Serverul funcționează!');
});

const startServer = async () => {
    try {
        await connectDB();
        await syncModels();

        const PORT = process.env.PORT || 5001;
        app.listen(PORT, () => {
            console.log(`Serverul rulează pe http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Eroare la pornirea serverului:', error);
    }
};

startServer();
