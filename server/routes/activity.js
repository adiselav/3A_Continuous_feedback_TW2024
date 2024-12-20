const express = require('express');
const router = express.Router();
const { Activity } = require('../models/Activity');
const { User } = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken.js');

// Middleware for role authorization
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// POST /activities - Create a new activity (doar prof)
router.post('/activities', authenticateToken, authorizeRole('professor'), async (req, res) => {
    try {
        const { description, code, date, duration } = req.body;

        const newActivity = await Activity.create({
            description,
            code,
            date,
            duration,
            ProfessorId: req.user.id,
        });

        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ message: 'Error creating activity', error });
    }
});

// GET /activities - Get all activities (doar prof)
router.get('/activities', authenticateToken, authorizeRole('professor'), async (req, res) => {
    try {
        const activities = await Activity.findAll({ where: { ProfessorId: req.user.id } });
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});

// DELETE /activities/:id - Delete an activity (doar prof)
router.delete('/activities/:id', authenticateToken, authorizeRole('professor'), async (req, res) => {
    try {
        const activity = await Activity.findOne({ where: { id: req.params.id, ProfessorId: req.user.id } });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        await activity.destroy();
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error });
    }
});

// GET /activities/:id - Get activity details (doar student)
router.get('/activities/:id', authenticateToken, authorizeRole('student'), async (req, res) => {
    try {
        const activity = await Activity.findOne({ where: { id: req.params.id } });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }

        res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching activity', error });
    }
});

module.exports = router;
