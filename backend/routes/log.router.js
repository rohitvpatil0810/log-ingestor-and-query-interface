const { Router } = require("express");
const logController = require("../controllers/log.controllers");
const logRouter = Router();

logRouter.get("/", logController.getAllLogs);
logRouter.get("/unique-values", logController.getUniqueAttributes);
logRouter.post("/search", logController.searchLogs);

logRouter.post("/", logController.ingestLog);
logRouter.post("/batch", logController.insertLogs);

module.exports = logRouter;
