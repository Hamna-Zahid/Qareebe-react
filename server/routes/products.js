const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// @route   GET /api/products
// @desc    Get all products (with search)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { search, category, shopId } = req.query;
        let query = { isActive: true };

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (category) {
            query.category = category;
        }

        if (shopId) {
            query.shopId = shopId;
        }

        const products = await Product.find(query).populate('shopId', 'name location');

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

// @route   GET /api/products/popular
// @desc    Get popular products
// @access  Public
router.get('/popular', async (req, res) => {
    try {
        const products = await Product.find({ isActive: true })
            .populate('shopId', 'name location')
            .limit(12)
            .sort({ createdAt: -1 });

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

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('shopId', 'name location rating');

        if (!product) {
            return res.status(404).json({ error: { message: 'Product not found' } });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

module.exports = router;
