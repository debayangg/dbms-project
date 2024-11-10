const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { verifyToken } = require('../middleware/authMiddleware');

// Admin route to add packages
router.post('/admin/packages', verifyToken, packageController.addPackage);

// User routes to view all packages and their own packages
router.get('/packages', packageController.getAllPackages); // All packages
router.get('/user/packages', verifyToken, packageController.getUserPackages); // User's own packages

module.exports = router;
