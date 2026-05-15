const express = require("express");

const logger = require("./logger");

const { connectDB } = require("./db");

require("./mqttConsumer");

const healthRoutes = require("./routes/healthRoutes");

const { flushBuffer } = require("./batchProcessor");

const app = express();

app.use("/", healthRoutes);

const PORT = 5000;

async function startServer() {

  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Subscriber Server Running On Port ${PORT}`);
  });
}

startServer();

process.on("SIGINT", async () => {

  logger.info("Graceful Shutdown Started");

  await flushBuffer();

  logger.info("Remaining Buffer Flushed");

  process.exit(0);
});