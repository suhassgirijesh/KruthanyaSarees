const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kruthanya');
    console.log('MongoDB connected for seeding...');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@kruthanya.com' });
    
    if (existingAdmin) {
      console.log('✓ Admin user already exists');
      console.log(`  Email: ${existingAdmin.email}`);
      console.log(`  Role: ${existingAdmin.role}`);
    } else {
      // Create new admin user
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@kruthanya.com',
        password: 'Admin@123', // Default password - change after first login
        phone: '9999999999',
        role: 'admin'
      });

      await adminUser.save();
      console.log('✓ Admin user created successfully!');
      console.log('  Email: admin@kruthanya.com');
      console.log('  Password: Admin@123');
      console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    }

    // List all admin users
    const allAdmins = await User.find({ role: 'admin' }).select('-password');
    console.log('\n📋 All Admin Users:');
    allAdmins.forEach((admin, idx) => {
      console.log(`  ${idx + 1}. ${admin.firstName} ${admin.lastName} (${admin.email})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
