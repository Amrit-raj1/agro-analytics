const mongoose = require('mongoose');

require('dotenv').config();
const uri = process.env.MONGO_URI;

async function checkDb() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    

    
    console.log('\n--- Collections ---');
    for (const c of collections) {
      console.log(c.name);
      const sample = await db.collection(c.name).findOne({});
      console.log('Sample Document:', JSON.stringify(sample, null, 2));
      console.log('-------------------');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    mongoose.disconnect();
  }
}

checkDb();
