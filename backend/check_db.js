const mongoose = require('mongoose');

const uri = "mongodb+srv://greenleaf_dev_user:43bXacJ4atD65ek2@cluster0.niaur5h.mongodb.net/greenleaf-dev";

async function run() {
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const names = collections.map(c => c.name).sort();
    console.log("All Collections:");
    console.log(names);
    
    const targets = ["news", "schemes", "articles", "papers", "videos", "courses", "learning", "government", "policy", "policies", "whitepapers", "research"];
    for (const collName of names) {
      if (targets.some(t => collName.toLowerCase().includes(t))) {
        const collection = db.collection(collName);
        const count = await collection.countDocuments();
        console.log(`\n--- Collection: ${collName} (${count} docs) ---`);
        if (count > 0) {
          const doc = await collection.findOne({});
          console.log(JSON.stringify(doc, null, 2));
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
