const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const Shop = require('../models/Shop');
const Product = require('../models/Product');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/qareebe');
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Shop.deleteMany({});
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Create sample users
        const users = await User.create([
            {
                name: 'John Doe',
                phone: '+923001234567',
                email: 'john@example.com',
                password: 'password123'
            },
            {
                name: 'Shop Owner 1',
                phone: '+923009876543',
                email: 'owner1@example.com',
                password: 'password123',
                role: 'shop_owner'
            }
        ]);
        console.log('✅ Created users');

        // Create shops
        const shops = await Shop.create([
            {
                name: "Zara's Boutique",
                ownerId: users[1]._id,
                location: 'Gulberg III',
                rating: 4.8,
                deliveryTime: '25-35 min',
                tags: ['Women', 'Dresses', 'Premium'],
                image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop'
            },
            {
                name: 'Outfitters Local',
                ownerId: users[1]._id,
                location: 'DHA Phase 5',
                rating: 4.5,
                deliveryTime: '15-25 min',
                tags: ['Men', 'Casual', 'Streetwear'],
                image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop'
            },
            {
                name: 'Kids Corner',
                ownerId: users[1]._id,
                location: 'Johar Town',
                rating: 4.9,
                deliveryTime: '30-45 min',
                tags: ['Kids', 'Toys', 'Clothing'],
                image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=2070&auto=format&fit=crop'
            },
            {
                name: 'Silk & Satin',
                ownerId: users[1]._id,
                location: 'Liberty Market',
                rating: 4.2,
                deliveryTime: '40-50 min',
                tags: ['Women', 'Fabric', 'Unstitched'],
                image: 'https://images.unsplash.com/photo-1605218427306-2c7c7c34ce7d?q=80&w=2070&auto=format&fit=crop'
            }
        ]);
        console.log('✅ Created shops');

        // Create products
        await Product.create([
            {
                shopId: shops[0]._id,
                name: 'Summer Floral Dress',
                price: 3500,
                originalPrice: 4500,
                image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=2046&auto=format&fit=crop',
                sizes: ['S', 'M', 'L', 'XL'],
                category: 'women'
            },
            {
                shopId: shops[0]._id,
                name: 'Silk Scarf',
                price: 1200,
                image: 'https://images.unsplash.com/photo-1601368156644-d8bc5d290238?q=80&w=2070&auto=format&fit=crop',
                sizes: ['M'],
                category: 'women'
            },
            {
                shopId: shops[0]._id,
                name: 'Evening Gown',
                price: 8500,
                originalPrice: 12000,
                image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop',
                sizes: ['S', 'M', 'L'],
                category: 'women'
            },
            {
                shopId: shops[1]._id,
                name: 'Denim Jacket',
                price: 2800,
                originalPrice: 3200,
                image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1974&auto=format&fit=crop',
                sizes: ['M', 'L', 'XL'],
                category: 'men'
            },
            {
                shopId: shops[1]._id,
                name: 'Graphic Tee',
                price: 1500,
                image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
                sizes: ['S', 'M', 'L', 'XL'],
                category: 'men'
            },
            {
                shopId: shops[2]._id,
                name: 'Dinosaur T-Shirt',
                price: 900,
                originalPrice: 1200,
                image: 'https://images.unsplash.com/photo-1519238809107-7e7895d30e38?q=80&w=2070&auto=format&fit=crop',
                sizes: ['S', 'M', 'L'],
                category: 'kids'
            },
            {
                shopId: shops[3]._id,
                name: 'Embroidered Kurta',
                price: 4500,
                originalPrice: 5500,
                image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1934&auto=format&fit=crop',
                sizes: ['M', 'L', 'XL'],
                category: 'women'
            }
        ]);
        console.log('✅ Created products');

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Test Credentials:');
        console.log('Customer: +923001234567 / password123');
        console.log('Shop Owner: +923009876543 / password123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
