const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// @route   POST /api/auth/signup
// @desc    Register new user
// @access  Public
router.post('/signup', [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, phone, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ phone });
        if (user) {
            return res.status(400).json({ error: { message: 'User already exists with this phone number' } });
        }

        // Create user
        user = await User.create({
            name,
            phone,
            email,
            password
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { phone, password } = req.body;

        // Find user and include password
        const user = await User.findOne({ phone }).select('+password');

        if (!user) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: { message: 'Invalid credentials' } });
        }

        // Generate token
        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                phone: user.phone,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
const { protect } = require('../middleware/auth');
router.get('/me', protect, async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

module.exports = router;
