const { Router } = require("express");
const router = Router();
const logRouter = require("./log.router");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Welcome to Log Ingestor and Query Interface App.",
  });
});

router.get("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Server is Alive.",
  });
});

router.use("/logs", logRouter);

module.exports = router;
