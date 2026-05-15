const { MongoClient } = require("mongodb");

const config = require("./config");

const logger = require("./logger");

const client = new MongoClient(config.MONGO_URI);

let collection;

async function connectDB() {
  try {
    await client.connect();

    logger.info("MongoDB Connected");

    const db = client.db(config.DB_NAME);

    collection = db.collection(config.COLLECTION_NAME);

  } catch (error) {
    logger.error(`MongoDB Connection Failed: ${error.message}`);

    process.exit(1);
  }
}

function getCollection() {
  return collection;
}

module.exports = {
  connectDB,
  getCollection,
};