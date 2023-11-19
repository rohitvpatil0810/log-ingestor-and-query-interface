const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

const kafkaBuffer = [];

const addToBuffer = (log) => {
  kafkaBuffer.push(log);
};

const sendToKafka = () => {
  if (kafkaBuffer.length > 0) {
    const payloads = [
      {
        topic: "logs",
        messages: JSON.stringify(kafkaBuffer),
      },
    ];

    producer.send(payloads, (err, data) => {
      if (err) {
        console.error("Error sending logs to Kafka:", err);
      } else {
        console.log("Logs sent to Kafka:", data);
        // Clear the buffer after successful send
        kafkaBuffer.length = 0;
      }
    });
  }
};

setInterval(sendToKafka, 3000);

module.exports = {
  addToBuffer,
};
