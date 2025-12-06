const express = require("express");
const router = express.Router();

const presensiController = require("../controllers/presensiController");
const { verifyToken } = require("../middleware/authMiddleware");

// ================= CHECK-IN =================
router.post(
  "/check-in",
  [
    verifyToken,
    presensiController.upload.single("buktiFoto")
  ],
  presensiController.CheckIn
);

// ================= CHECK-OUT =================
router.post("/check-out", verifyToken, presensiController.CheckOut);

// ================= LAPORAN PRESENSI (ADMIN) =================
router.get("/laporan", verifyToken, presensiController.getAllPresensi);

module.exports = router;
