# MQTT-Based High Throughput Data Ingestion System

## Overview

This project demonstrates a high-frequency real-time data ingestion pipeline using:

- Node.js
- Express.js
- MQTT (Mosquitto Broker)
- MongoDB
- Batch Processing Architecture

The system simulates continuous event ingestion similar to:

- IoT telemetry systems
- analytics pipelines
- real-time monitoring systems
- distributed event-driven architectures

---

# Architecture

Publisher Service
        |
        v
 MQTT Broker (Mosquitto)
        |
        v
Subscriber Service
        |
        v
 In-Memory Buffer
        |
        v
MongoDB Batch Insert

---

# Features

## Publisher Service

- Continuously generates high-frequency messages
- Publishes messages to MQTT topic
- Uses QoS 1 for reliable delivery
- Tracks published message count

## Subscriber Service

- Consumes MQTT messages asynchronously
- Buffers incoming messages in memory
- Performs optimized MongoDB batch inserts
- Uses insertMany() for high throughput
- Supports:
  - batch-size based flushing
  - time-based flushing
  - graceful shutdown
  - health monitoring

## Reliability Features

- Centralized logging using Winston
- Data loss monitoring
- Graceful shutdown handling
- Retry-ready architecture
- MongoDB persistent storage using Docker volumes

---

# Tech Stack

| Component | Technology |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Queue Protocol | MQTT |
| Broker | Mosquitto |
| Database | MongoDB |
| Logging | Winston |
| Containerization | Docker Compose |

---

# Project Structure

mqtt-ingestion-system/

├── publisher/
├── subscriber/
├── logs/
├── docker-compose.yml
├── .env
├── package.json
└── README.md

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repo-url>
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Infrastructure

```bash
docker-compose up -d
```

This starts:

- Mosquitto MQTT Broker
- MongoDB

## 4. Start Subscriber Service

```bash
npm run subscriber
```

## 5. Start Publisher Service

Open another terminal:

```bash
npm run publisher
```

---

# Health Monitoring

Access:

http://localhost:5000/health

Example response:

```json
{
  "status": "OK",
  "received": 10000,
  "inserted": 10000,
  "failed": 0,
  "bufferSize": 200
}
```

---

# Batch Processing Strategy

The subscriber stores incoming messages in an in-memory buffer.

Flush Conditions:

- Batch size reaches 1000 messages
- OR every 5 seconds

This significantly reduces database write overhead.

---

# Why Batch Processing?

Without batching:

1000 messages = 1000 DB operations

With batching:

1000 messages = 1 DB operation

This improves:

- throughput
- scalability
- database efficiency

---

# Data Loss Handling

The system minimizes data loss using:

- MQTT QoS 1
- graceful shutdown flushing
- persistent MongoDB storage
- centralized logging
- failure tracking

---

# Performance Optimization

Implemented optimizations:

- insertMany()
- unordered batch inserts
- persistent MQTT connection
- in-memory buffering
- modular architecture

---

# Future Improvements

- Retry queue
- Dead Letter Queue (DLQ)
- Kafka integration
- Horizontal consumer scaling
- Redis buffering
- Kubernetes deployment
