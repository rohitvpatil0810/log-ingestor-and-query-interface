const Log = require("../models/Log");

const ingestLog = async (req, res) => {
  try {
    const logData = req.body;

    const newLog = new Log(logData);

    const savedLog = await newLog.save();

    res.status(201).json({ success: true, logs: savedLog });
  } catch (error) {
    console.error("Error ingesting log:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const insertLogs = async (req, res) => {
  try {
    const logsData = req.body;
    const logs = logsData.map((log) => new Log(log));
    const savedLogs = await Log.insertMany(logs);

    res.status(201).json({ success: true, logs: savedLogs });
  } catch (error) {
    console.error("Error inserting logs:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  ingestLog,
  insertLogs,
  getAllLogs,
};
