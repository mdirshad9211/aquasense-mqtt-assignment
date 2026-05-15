require("dotenv").config();

const client = require("./mqttClient");
const logger = require("./logger");

let publishedCount = 0;

function generateMessage() {
  return {
    sensorId: `sensor_${Math.floor(Math.random() * 1000)}`,

    temperature: Math.floor(Math.random() * 50),

    timestamp: new Date().toISOString(),
  };
}

function publishMessage() {
  const message = generateMessage();

  client.publish(
    process.env.MQTT_TOPIC,
    JSON.stringify(message),
    { qos: 1 },

    (error) => {
      if (error) {
        logger.error(`Publish Failed: ${error.message}`);
        return;
      }

      publishedCount++;

      logger.info(
        `Published #${publishedCount} | ${JSON.stringify(message)}`
      );
    }
  );
}

setInterval(publishMessage, process.env.PUBLISH_INTERVAL);