const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  resourceId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  traceId: {
    type: String,
    required: true,
  },
  spanId: {
    type: String,
    required: true,
  },
  commit: {
    type: String,
    required: true,
  },
  metadata: {
    parentResourceId: {
      type: String,
    },
  },
});

logSchema.index({
  level: "text",
  message: "text",
  resourceId: "text",
  traceId: "text",
  spanId: "text",
  commit: "text",
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
