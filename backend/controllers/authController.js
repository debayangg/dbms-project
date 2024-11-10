const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const pool = require('../config/db');

// Fixed admin credentials
const adminCredentials = {
    email: 'admin@admin.com',
    password: 'admin',
};

// Login controller
async function login(req, res) {
    const { email, password } = req.body;

    // Check if it's admin login
    if (email === adminCredentials.email && password === adminCredentials.password) {
        const token = jwt.sign(
            { email: adminCredentials.email, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.json({ token, role: 'admin' });
    }

    // Otherwise, treat as normal user
    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await userModel.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: 'user' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, role: 'user' });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

// Signup controller for new users
async function signup(req, res) {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    try {
        await pool.execute(query, [email, hashedPassword]);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

module.exports = {
    login,
    signup,
};
