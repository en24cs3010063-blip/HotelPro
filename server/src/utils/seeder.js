const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });

const users = [
  {
    name: 'Hotel Admin',
    email: 'admin@hotelpro.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1 555-0100',
    address: {
      street: '100 Grand Boulevard',
      city: 'Metropolis',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    }
  },
  {
    name: 'Front Desk Staff',
    email: 'staff@hotelpro.com',
    password: 'staff123',
    role: 'staff',
    phone: '+1 555-0101',
    address: {
      street: '101 Service Ave',
      city: 'Metropolis',
      state: 'NY',
      country: 'USA',
      zipCode: '10001'
    }
  },
  {
    name: 'John Guest',
    email: 'guest@hotelpro.com',
    password: 'guest123',
    role: 'guest',
    phone: '+1 555-0102',
    address: {
      street: '250 Vacation Lane',
      city: 'Sunnyvale',
      state: 'CA',
      country: 'USA',
      zipCode: '94086'
    }
  }
];

const seedData = async () => {
  try {
    const connUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hotelpro';
    await mongoose.connect(connUri);
    console.log(' Connected to MongoDB for seeding...');

    // Clear existing users
    await User.deleteMany();
    console.log('🗑️  Existing users cleared.');

    // Create seed users (using save or create to trigger bcrypt hook)
    for (const u of users) {
      await User.create(u);
    }

    console.log('✅ Demo users seeded successfully:');
    console.log('   👑 Admin: admin@hotelpro.com / admin123');
    console.log('   👔 Staff: staff@hotelpro.com / staff123');
    console.log('   🧳 Guest: guest@hotelpro.com / guest123');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err.message);
    process.exit(1);
  }
};

seedData();
