const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    // DEV MODE BYPASS - Remove in production!
    if (process.env.NODE_ENV === 'development') {
        console.log('🔓 DEV MODE: Bypassing authentication');
        // Create a fake test user for development
        req.user = await User.findOne({ email: 'test@qareebe.com' }) ||
            await User.create({
                name: 'Dev Test User',
                email: 'test@qareebe.com',
                phone: '0000000000',
                password: 'dev123',
                role: 'shop_owner'
            });
        return next();
    }

    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            error: { message: 'Not authorized, no token provided', status: 401 }
        });
    }

    // Validate JWT_SECRET
    if (!process.env.JWT_SECRET) {
        console.error('CRITICAL: JWT_SECRET is not set in environment variables!');
        return res.status(500).json({
            error: { message: 'Server configuration error', status: 500 }
        });
    }

    try {
        // Verify token
        console.log('Verifying token:', token.substring(0, 20) + '...');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token verified, User ID:', decoded.id);

        // Get user from token
        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            console.log('User not found for ID:', decoded.id);
            return res.status(401).json({
                error: { message: 'User not found', status: 401 }
            });
        }

        next();
    } catch (error) {
        console.error('Token Verification Failed:', error.message);
        console.error('Token was:', token.substring(0, 50) + '...');
        return res.status(401).json({
            error: { message: 'Not authorized, token failed: ' + error.message, status: 401 }
        });
    }
};

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
    console.log('Admin Middleware Check:', {
        user: req.user ? req.user._id : 'No User',
        role: req.user ? req.user.role : 'No Role'
    });

    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ error: { message: 'Not authorized as an admin', status: 401 } });
    }
};

module.exports = { protect, admin, generateToken };
