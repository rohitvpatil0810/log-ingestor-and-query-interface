// kafka-consumer.controller.js

const kafka = require("kafka-node");
const Log = require("../../models/Log");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "logs", partition: 0 }]);

consumer.on("message", async (message) => {
  const logs = JSON.parse(message.value);

  try {
    await Log.insertMany(logs);
    console.log("Logs inserted into the database:", logs);
  } catch (error) {
    console.error("Error inserting logs into the database:", error);
  }
});
