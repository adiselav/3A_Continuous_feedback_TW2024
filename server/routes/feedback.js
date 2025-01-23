const express = require('express');
const router = express.Router();
const { Feedback } = require('../models/Feedback');
const { Activity } = require('../models/Activity');
const authenticateToken = require('../middleware/authenticateToken');

router.use(authenticateToken);

// Middleware for role authorization
const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

// POST /feedback - Submit feedback (only students)
router.post('/feedback', authenticateToken, authorizeRole('student'), async (req, res) => {
    try {
        const { reaction, activityId } = req.body;

        if (!reaction || !['smiley', 'frowny', 'surprised', 'confused'].includes(reaction)) {
            return res.status(400).json({ message: 'Invalid reaction type!' });
        }

        if (!activityId || isNaN(activityId)) {
            return res.status(400).json({ message: 'Invalid or missing "activityId"!' });
        }

        const activity = await Activity.findByPk(activityId);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found!' });
        }

        const feedback = await Feedback.create({ reaction, ActivityId: activityId });
        res.status(201).json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while submitting feedback.' });
    }
});

// GET /feedback - Retrieve all feedbacks (only professors)
router.get('/feedback', authenticateToken, authorizeRole('professor'), async (req, res) => {
    try {
        const { activityId } = req.query;

        const whereClause = activityId ? { ActivityId: activityId } : {};

        const feedbacks = await Feedback.findAll({
            where: whereClause,
            include: [
                {
                    model: Activity,
                    attributes: ['id', 'title', 'description'],
                },
            ],
        });

        res.status(200).json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving feedbacks.' });
    }
});

module.exports = router;
