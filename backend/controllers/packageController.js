const db = require('../config/db');

// Add a new package (admin only)
async function addPackage(req, res) {
    const { title, description, destination, duration, price, maxParticipants, imageUrl } = req.body;

    const query = 'INSERT INTO packages (title, description, destination, duration, price, maxParticipants, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
        await db.query(query, [title, description, destination, duration, price, maxParticipants, imageUrl]);
        res.status(201).json({ message: 'Package added successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add package.' });
    }
}

// Get all packages (for users)
async function getAllPackages(req, res) {
    try {
        const [rows] = await db.query('SELECT * FROM packages');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch packages.' });
    }
}

// Get user's own packages
async function getUserPackages(req, res) {
    const userId = req.user.id;

    try {
        const [rows] = await db.query('SELECT * FROM packages WHERE user_id = ?', [userId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your packages.' });
    }
}

module.exports = {
    addPackage,
    getAllPackages,
    getUserPackages,
};
