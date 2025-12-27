const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Shop = require('../models/Shop');
const { protect } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
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

// @route   POST /api/products
// @desc    Create a new product (Protected, Shop Owner only)
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        console.log('Product upload request:', req.body);
        console.log('File:', req.file);

        if (!req.file) {
            return res.status(400).json({ error: { message: 'Image is required' } });
        }

        // Find the shop owned by the user
        const shop = await Shop.findOne({ ownerId: req.user._id });

        if (!shop) {
            // Remove uploaded file if shop not found
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ error: { message: 'Shop not found. Please create a shop first.' } });
        }

        // Parse sizes (if coming as stringified JSON or CSV)
        let sizes = req.body.sizes;
        if (typeof sizes === 'string') {
            try {
                sizes = JSON.parse(sizes);
            } catch (e) {
                sizes = sizes.split(',').map(s => s.trim());
            }
        }

        const product = new Product({
            shopId: shop._id,
            name: req.body.name,
            price: req.body.price,
            originalPrice: req.body.originalPrice,
            description: req.body.description,
            category: req.body.category,
            sizes: sizes,
            stock: req.body.stock,
            image: `/uploads/${req.file.filename}` // Store relative path
        });

        await product.save();

        res.status(201).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Create product error:', error);
        // Clean up file on error
        if (req.file) fs.unlinkSync(req.file.path);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: { message: 'Validation Error', details: error.message } });
        }

        res.status(500).json({ error: { message: 'Server error', details: error.message } });
    }
});

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
