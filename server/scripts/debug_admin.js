const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const checkAdmin = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/qareebe');
        console.log('✅ Connected');

        console.log('\n🔍 Searching for Admin User...');
        const admin = await User.findOne({ phone: '+923000000000' }).select('+password');

        if (!admin) {
            console.log('❌ Admin user NOT found!');
        } else {
            console.log('✅ Admin user found:');
            console.log('   ID:', admin._id);
            console.log('   Name:', admin.name);
            console.log('   Phone:', admin.phone);
            console.log('   Role:', admin.role);
            console.log('   Password Hash:', admin.password ? 'User has password' : 'NO PASSWORD');

            console.log('\n🔐 Testing Password (adminpassword123)...');
            const isMatch = await admin.comparePassword('adminpassword123');
            console.log('   Password Match:', isMatch ? '✅ YES' : '❌ NO');

            if (admin.role !== 'admin') {
                console.log('⚠️ WARNING: Role is NOT admin!');
            }
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

checkAdmin();
