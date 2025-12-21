const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// @route   GET /api/shops
// @desc    Get all shops (with search)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = { isActive: true };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        const shops = await Shop.find(query).sort({ rating: -1 });

        res.json({
            success: true,
            count: shops.length,
            data: shops
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   GET /api/shops/:id
// @desc    Get shop by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);

        if (!shop) {
            return res.status(404).json({ error: { message: 'Shop not found' } });
        }

        res.json({
            success: true,
            data: shop
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   GET /api/shops/:id/products
// @desc    Get products for a shop
// @access  Public
router.get('/:id/products', async (req, res) => {
    try {
        const Product = require('../models/Product');
        const products = await Product.find({ shopId: req.params.id, isActive: true });

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

module.exports = router;
