require("dotenv").config();

module.exports = {
  MQTT_BROKER_URL: process.env.MQTT_BROKER_URL,

  MQTT_TOPIC: process.env.MQTT_TOPIC,

  MONGO_URI: process.env.MONGO_URI,

  DB_NAME: process.env.DB_NAME,

  COLLECTION_NAME: process.env.COLLECTION_NAME,

  BATCH_SIZE: 1000,

  FLUSH_INTERVAL: 5000,
};