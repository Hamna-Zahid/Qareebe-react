const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Address = require('../models/Address');

// @route   GET /api/addresses/user/:userId
// @desc    Get user addresses
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
    try {
        // Ensure user can only access their own addresses
        if (req.user._id.toString() !== req.params.userId) {
            return res.status(403).json({ error: { message: 'Not authorized' } });
        }

        const addresses = await Address.find({ userId: req.params.userId }).sort({ isDefault: -1, createdAt: -1 });

        res.json({
            success: true,
            count: addresses.length,
            data: addresses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   POST /api/addresses
// @desc    Add new address
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { label, address, isDefault } = req.body;

        const newAddress = await Address.create({
            userId: req.user._id,
            label,
            address,
            isDefault: isDefault || false
        });

        res.status(201).json({
            success: true,
            data: newAddress
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   DELETE /api/addresses/:id
// @desc    Delete address
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({ error: { message: 'Address not found' } });
        }

        // Ensure user can only delete their own addresses
        if (address.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: { message: 'Not authorized' } });
        }

        await address.deleteOne();

        res.json({
            success: true,
            message: 'Address deleted'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

module.exports = router;
