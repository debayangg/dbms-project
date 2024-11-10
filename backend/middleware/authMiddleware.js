const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded; // Store user info in req.user
        next();
    });
}

module.exports = {
    verifyToken,
};
