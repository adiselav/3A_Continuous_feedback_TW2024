const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB, syncModels } = require('./models');
const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activity')
const feedbackRoutes = require('./routes/feedback')

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range']
}));
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api', feedbackRoutes);

app.get('/', (req, res) => {
    res.send('Serverul funcționează!');
});

const startServer = async () => {
    try {
        await connectDB();
        await syncModels();

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Serverul rulează pe http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Eroare la pornirea serverului:', error);
    }
};

startServer();
