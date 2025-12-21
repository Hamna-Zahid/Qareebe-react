const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Order = require('../models/Order');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { items, total, deliveryAddress, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: { message: 'No items in order' } });
        }

        const order = await Order.create({
            userId: req.user._id,
            items,
            total,
            deliveryAddress,
            paymentMethod: paymentMethod || 'cod'
        });

        res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   GET /api/orders/user/:userId
// @desc    Get user orders
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
    try {
        // Ensure user can only access their own orders
        if (req.user._id.toString() !== req.params.userId) {
            return res.status(403).json({ error: { message: 'Not authorized' } });
        }

        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 })
            .populate('items.productId', 'name image');

        res.json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('userId', 'name phone')
            .populate('items.productId', 'name image price');

        if (!order) {
            return res.status(404).json({ error: { message: 'Order not found' } });
        }

        // Ensure user can only access their own orders
        if (order.userId._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: { message: 'Not authorized' } });
        }

        res.json({
            success: true,
            data: order
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

module.exports = router;
