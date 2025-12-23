const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');
// Order model will be needed, ensure it exists or mock for now

// @route   GET /api/admin/stats
// @desc    Get system overview stats
// @access  Private/Admin
router.get('/stats', async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const shopCount = await Shop.countDocuments();
        const productCount = await Product.countDocuments();

        // Mock revenue for now as Order model might not be fully standardized yet
        // In real implementation: const orders = await Order.find(); ... sum total
        const totalRevenue = 1540000;

        res.json({
            users: userCount,
            shops: shopCount,
            products: productCount,
            revenue: totalRevenue
        });
    } catch (error) {
        res.status(500).json({ error: { message: 'Server Error' } });
    }
});

// @route   GET /api/admin/users
// @desc    Get all users list
// @access  Private/Admin
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: { message: 'Server Error' } });
    }
});

// @route   GET /api/admin/shops
// @desc    Get all shops list
// @access  Private/Admin
router.get('/shops', async (req, res) => {
    try {
        // Populate owner details
        const shops = await Shop.find({}).populate('ownerId', 'name email').sort({ createdAt: -1 });
        res.json(shops);
    } catch (error) {
        res.status(500).json({ error: { message: 'Server Error' } });
    }
});

module.exports = router;
