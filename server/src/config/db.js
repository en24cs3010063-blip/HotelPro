const mongoose = require('mongoose');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hotelpro';

  try {
    // Attempt standard connection (timeout 2000ms if local mongod is not running)
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  Local/configured MongoDB not reachable (${error.message}).`);
    console.log('🔄 Spinning up in-memory MongoDB server for instant local testing...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`✅ In-Memory MongoDB Connected: ${memoryUri}`);

      // Auto-seed initial demo accounts so user can log in immediately
      const User = require('../models/User');
      const count = await User.countDocuments();
      if (count === 0) {
        const demoUsers = [
          {
            name: 'Hotel Admin',
            email: 'admin@hotelpro.com',
            password: 'admin123',
            role: 'admin',
            phone: '+1 555-0100'
          },
          {
            name: 'Front Desk Staff',
            email: 'staff@hotelpro.com',
            password: 'staff123',
            role: 'staff',
            phone: '+1 555-0101'
          },
          {
            name: 'John Guest',
            email: 'guest@hotelpro.com',
            password: 'guest123',
            role: 'guest',
            phone: '+1 555-0102'
          }
        ];
        for (const u of demoUsers) {
          await User.create(u);
        }
        console.log('🌱 Demo users seeded automatically into database:');
        console.log('   👑 Admin: admin@hotelpro.com / admin123');
        console.log('   👔 Staff: staff@hotelpro.com / staff123');
        console.log('   🧳 Guest: guest@hotelpro.com / guest123');
      }
      return conn;
    } catch (memError) {
      console.error(`❌ In-memory MongoDB failed to start: ${memError.message}`);
      console.log('💡 Note: You can provide a MongoDB Atlas connection string in server/.env');
    }
  }
};

module.exports = connectDB;
