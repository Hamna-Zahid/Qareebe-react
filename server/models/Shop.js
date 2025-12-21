const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Shop name is required'],
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    rating: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    deliveryTime: {
        type: String,
        default: '30-45 min'
    },
    tags: [{
        type: String,
        trim: true
    }],
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for products
shopSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'shopId'
});

module.exports = mongoose.model('Shop', shopSchema);
