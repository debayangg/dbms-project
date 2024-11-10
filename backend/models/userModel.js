const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Find user by email
async function findUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

// Compare password
async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    findUserByEmail,
    comparePassword,
};
