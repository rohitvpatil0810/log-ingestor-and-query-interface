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

// Controller to search logs based on a JSON object query
const searchLogs = async (req, res) => {
  try {
    const { searchQuery, filters } = req.body;

    let logQuery = {};

    if (searchQuery) {
      logQuery.$text = { $search: searchQuery };
    }

    if (filters) {
      const applyArrayFilter = (field, values) => {
        if (values && values.length > 0) {
          logQuery[field] = { $in: values };
        }
      };

      const applyFiltersForFields = () => {
        Object.keys(filters).forEach((field) => {
          if (Array.isArray(filters[field])) {
            applyArrayFilter(field, filters[field]);
          }
          // Add more logic for other types of filters if needed
        });
      };

      applyFiltersForFields();

      if (filters.timestampStart && filters.timestampEnd) {
        logQuery.timestamp = {
          $gte: new Date(filters.timestampStart),
          $lte: new Date(filters.timestampEnd),
        };
      }
    }

    const logs = await Log.find(logQuery);

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error searching logs:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getUniqueAttributes = async (req, res) => {
  try {
    const attribute = req.params.attribute;
    const uniqueValues = await Log.distinct(attribute);

    res.status(200).json({ success: true, data: uniqueValues });
  } catch (error) {
    console.error(
      `Error getting unique values for ${req.params.attribute}:`,
      error
    );
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  ingestLog,
  insertLogs,
  getAllLogs,
  searchLogs,
  getUniqueAttributes,
};
