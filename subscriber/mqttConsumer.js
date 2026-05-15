const mqtt = require("mqtt");

const config = require("./config");

const logger = require("./logger");

const metrics = require("./metrics");

const { addMessage } = require("./batchProcessor");

const client = mqtt.connect(config.MQTT_BROKER_URL);

client.on("connect", () => {

  logger.info("Subscriber connected to MQTT broker");

  client.subscribe(config.MQTT_TOPIC, { qos: 1 }, (error) => {

    if (error) {
      logger.error(`Subscription Failed: ${error.message}`);
      return;
    }

    logger.info(`Subscribed to ${config.MQTT_TOPIC}`);
  });
});

client.on("message", (topic, message) => {

  try {

    const parsedMessage = JSON.parse(message.toString());

    metrics.receivedCount++;

    addMessage(parsedMessage);

  } catch (error) {

    logger.error(`Message Processing Failed: ${error.message}`);
  }
});