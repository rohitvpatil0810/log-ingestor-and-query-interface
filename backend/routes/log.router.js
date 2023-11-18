const { Router } = require("express");
const logController = require("../controllers/log.controllers");
const logRouter = Router();

logRouter.get("/", logController.getAllLogs);
logRouter.post("/", logController.ingestLogs);

module.exports = logRouter;
