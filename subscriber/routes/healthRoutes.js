const express = require("express");

const metrics = require("../metrics");

const { getBufferSize } = require("../batchProcessor");

const router = express.Router();

router.get("/health", (req, res) => {

  res.json({
    status: "OK",

    received: metrics.receivedCount,

    inserted: metrics.insertedCount,

    failed: metrics.failedCount,

    retries: metrics.retryCount,

    bufferSize: getBufferSize(),
  });
});

module.exports = router;