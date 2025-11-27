const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.get("/daily", verifyToken, verifyAdmin, reportController.getDailyReport);

module.exports = router;
