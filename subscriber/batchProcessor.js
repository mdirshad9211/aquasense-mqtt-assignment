const config = require("./config");

const logger = require("./logger");

const metrics = require("./metrics");

const { getCollection } = require("./db");

let buffer = [];

let isFlushing = false;

async function flushBuffer() {

  if (buffer.length === 0 || isFlushing) {
    return;
  }

  isFlushing = true;

  const batch = [...buffer];

  buffer = [];

  try {

    const collection = getCollection();

    const result = await collection.insertMany(
      batch,
      { ordered: false }
    );

    metrics.insertedCount += result.insertedCount;

    logger.info(
      `Inserted Batch | Size: ${result.insertedCount}`
    );

  } catch (error) {

    metrics.failedCount += batch.length;

    logger.error(
      `Batch Insert Failed: ${error.message}`
    );

  } finally {

    isFlushing = false;
  }
}

function addMessage(message) {

  buffer.push(message);

  if (buffer.length >= config.BATCH_SIZE) {
    flushBuffer();
  }
}

setInterval(flushBuffer, config.FLUSH_INTERVAL);

function getBufferSize() {
  return buffer.length;
}

module.exports = {
  addMessage,
  flushBuffer,
  getBufferSize,
};