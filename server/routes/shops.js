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

const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `shop-${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Images Only!');
        }
    }
});

// @route   GET /api/shops/me
// @desc    Get current user's shop
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        const shop = await Shop.findOne({ ownerId: req.user._id });
        if (!shop) {
            return res.status(404).json({ error: { message: 'Shop not found' } });
        }
        res.json({ success: true, data: shop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   PUT /api/shops/me
// @desc    Update current user's shop
// @access  Private
router.put('/me', protect, async (req, res) => {
    try {
        let shop = await Shop.findOne({ ownerId: req.user._id });
        if (!shop) {
            return res.status(404).json({ error: { message: 'Shop not found' } });
        }

        // Update fields
        shop.name = req.body.name || shop.name;
        shop.description = req.body.description || shop.description;
        shop.location = req.body.location || shop.location;
        shop.deliveryTime = req.body.deliveryTime || shop.deliveryTime;
        shop.deliveryFee = req.body.deliveryFee || shop.deliveryFee;

        // Handle tags/categories if present
        if (req.body.tags) shop.tags = req.body.tags;
        if (req.body.categories) shop.categories = req.body.categories;

        await shop.save();

        res.json({ success: true, data: shop });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: { message: 'Server error' } });
    }
});

// @route   POST /api/shops
// @desc    Create a new shop (Protected)
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        console.log('Shop creation request:', req.body);

        // Check if user already has a shop
        const existingShop = await Shop.findOne({ ownerId: req.user._id });
        if (existingShop) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({ error: { message: 'User already owns a shop' } });
        }

        let imagePath = 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070'; // Default
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        // Parse tags and categories if sent as strings (FormData)
        let tags = req.body.tags;
        if (typeof tags === 'string') {
            try { tags = JSON.parse(tags); } catch (e) { tags = tags.split(','); }
        }

        const shop = new Shop({
            ownerId: req.user._id,
            name: req.body.name,
            location: req.body.location,
            rating: 4.5, // Start with default good rating
            deliveryTime: req.body.deliveryTime || '30-45 min',
            tags: tags || [],
            image: imagePath,
            description: req.body.description,
            // Add any other fields you want to save from onboarding
        });

        await shop.save();

        // Update user role or shopId link if necessary (Optional, but good practice)
        // const user = await User.findById(req.user._id);
        // user.shopId = shop._id;
        // await user.save();

        res.status(201).json({
            success: true,
            data: shop
        });
    } catch (error) {
        console.error('Create shop error:', error);
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ error: { message: 'Server error', details: error.message } });
    }
});

module.exports = router;
