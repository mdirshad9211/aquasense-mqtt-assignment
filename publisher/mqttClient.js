const mqtt = require("mqtt");
require("dotenv").config();

const logger = require("./logger");

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  logger.info("Publisher connected to MQTT broker");
});

client.on("error", (error) => {
  logger.error(`MQTT Connection Error: ${error.message}`);
});

module.exports = client;