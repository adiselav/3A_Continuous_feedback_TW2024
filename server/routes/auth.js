const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// MARK: - REGISTER
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii!' });
    }
    if (!['professor', 'student'].includes(role)) {
        return res.status(400).json({ message: 'Rol invalid!' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Acest email este deja folosit!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: 'Utilizator creat cu succes!', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la crearea utilizatorului!' });
    }
});

// MARK: - LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii!' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Email sau parolă incorectă!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Email sau parolă incorectă!' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Autentificare reușită!',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Eroare la autentificare!' });
    }
});

module.exports = router;
