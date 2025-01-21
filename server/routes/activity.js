const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken.js');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Middleware for role authorization
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// POST /professor - Create a new activity
router.post('/professor', authorizeRole('professor'), async (req, res) => {
    try {
        const { title, description, duration, code, date } = req.body;

        if (!title || !description || !duration || !code || !date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newActivity = await Activity.create({
            title,
            description,
            duration,
            code,
            date,
            ProfessorId: req.user.id,
        });

        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error creating activity', error: error.message });
    }
});

// GET /professor - Get all activities for professor
router.get('/professor', authorizeRole('professor'), async (req, res) => {
    try {
        const activities = await Activity.findAll({
            where: { ProfessorId: req.user.id },
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error: error.message });
    }
});

// GET /code/:code - Get an activity by its code
router.get('/code/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const activity = await Activity.findOne({ where: { code } });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activity by code', error: error.message });
    }
});

// DELETE /professor/:id - Delete an activity
router.delete('/professor/:id', authorizeRole('professor'), async (req, res) => {
    try {
        const { id } = req.params;
        const activity = await Activity.findOne({ where: { id } });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found.' });
        }

        await activity.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error: error.message });
    }
});

module.exports = router;
