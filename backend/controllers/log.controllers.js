const Log = require("../models/Log");

const ingestLogs = async (req, res) => {
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

module.exports = {
  ingestLogs,
  getAllLogs,
};
