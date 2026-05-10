const mongoose = require('mongoose');
const Product = require('./models/Product');
const sampleProducts = require('./SAMPLE_DATA');
require('dotenv').config();

const importSampleData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI);
    console.log('MongoDB connected for data import...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products...');

    // Import sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully imported ${products.length} sample products!`);

    // List imported products
    console.log('\n📋 Imported Products:');
    products.forEach((product, idx) => {
      console.log(`  ${idx + 1}. ${product.name} - ${product.images?.length || 0} images`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Import error:', error.message);
    process.exit(1);
  }
};

importSampleData();