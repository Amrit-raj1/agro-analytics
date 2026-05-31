const mongoose = require('mongoose');

const uri = 'mongodb+srv://greenleaf_dev_user:43bXacJ4atD65ek2@cluster0.niaur5h.mongodb.net/greenleaf-dev';

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
