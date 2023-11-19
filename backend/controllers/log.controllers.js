const redisClient = require("../config/redis");
const Log = require("../models/Log");
const { addToBuffer } = require("./kafka/kafka-producer.controller");

const ingestLog = async (req, res) => {
  try {
    const logData = req.body;

    addToBuffer(logData);

    res.status(201).json({ success: true, data: "Log added to Database." });
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
    // Check if the data is already in the cache
    const cacheKey = JSON.stringify({ searchQuery, filters });
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("getting cached data");
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json({ success: true, data: parsedData });
    }

    // Data is not in the cache, fetch from the database
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

    // Fetch logs from the database
    const logs = await Log.find(logQuery);

    // Store fetched data in the cache for future use
    redisClient.setEx(cacheKey, 60, JSON.stringify(logs));

    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    console.error("Error searching logs:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const getUniqueAttributes = async (req, res) => {
  try {
    const attributes = [
      "level",
      "resourceId",
      "traceId",
      "spanId",
      "commit",
      "metadata.parentResourceId",
    ];

    const cachedData = await redisClient.get("uniqueValues");

    if (cachedData) {
      // If data is in the cache, return it directly
      const parsedData = JSON.parse(cachedData);
      return res.status(200).json({ success: true, data: parsedData });
    }

    const getAttributesValue = async () => {
      let uniqueValues = {};
      await Promise.all(
        attributes.map(async (attribute) => {
          uniqueValues[attribute] = await Log.distinct(attribute);
        })
      );
      return uniqueValues;
    };

    const uniqueValues = await getAttributesValue();
    res.status(200).json({ success: true, data: uniqueValues });

    redisClient.setEx("uniqueValues", 60, JSON.stringify(uniqueValues));
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
