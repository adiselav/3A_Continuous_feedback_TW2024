const express = require('express');
const router = express.Router();
const { Feedback } = require('../models/Feedback');
const { Activity } = require('../models/Activity');
const authenticateToken = require('../middleware/authenticateToken');

// Middleware for role authorization
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// POST /feedbacks - Submit feedback (doar student)
router.post('/feedbacks', authenticateToken, authorizeRole('student'), async (req, res) => {
    try {
        const { reaction, activityId } = req.body;

        if (!reaction || !['smiley', 'frowny', 'surprised', 'confused'].includes(reaction)) {
            return res.status(400).json({ message: 'Invalid reaction type!' });
        }

        if (!activityId || isNaN(activityId)) {
            return res.status(400).json({ message: 'Invalid or missing activityId!' });
        }

        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found!' });
        }

        const existingFeedback = await Feedback.findOne({
            where: { ActivityId: activityId },
        });

        if (existingFeedback) {
            return res.status(400).json({ message: 'Feedback already submitted for this activity!' });
        }

        const feedback = await Feedback.create({
            reaction,
            ActivityId: activityId,
        });

        res.status(201).json({ message: 'Feedback submitted successfully!', feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error: error.message });
    }
});

// GET /feedbacks/:activityId - Get feedbacks for an activity (doar prof)
router.get('/feedbacks/:activityId', authenticateToken, authorizeRole('professor'), async (req, res) => {
    try {
        const { activityId } = req.params;

        if (!activityId || isNaN(activityId)) {
            return res.status(400).json({ message: 'Invalid or missing activityId!' });
        }

        const activity = await Activity.findOne({
            where: { id: activityId, ProfessorId: req.user.id },
        });

        if (!activity) {
            return res.status(404).json({ message: 'Activity not found or access denied!' });
        }

        const feedbacks = await Feedback.findAll({ where: { ActivityId: activityId } });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
    }
});

module.exports = router;
