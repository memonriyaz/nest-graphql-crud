// Run this script to clean up database issues
// Usage: node cleanup-db.js

const { MongoClient } = require('mongodb');

async function cleanupDatabase() {
  const uri = 'mongodb+srv://riyazmemon:dbuser123@cluster0.esbfn.mongodb.net/';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('test'); // Your database name
    const collection = db.collection('users');

    // Option 1: Drop the entire collection
    await collection.drop();
    console.log('Users collection dropped');

    // Option 2: Remove the problematic index
    try {
      await collection.dropIndex('username_1');
      console.log('Dropped username_1 index');
    } catch (error) {
      console.log('Index username_1 not found or already dropped');
    }

    // Option 3: List all indexes to see what exists
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes);

    console.log('Database cleanup completed');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

cleanupDatabase();