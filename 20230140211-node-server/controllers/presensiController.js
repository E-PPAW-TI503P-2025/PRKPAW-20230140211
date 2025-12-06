const { Presensi, User } = require("../models");
const { format } = require("date-fns-tz");
const multer = require("multer");
const path = require("path");

const timeZone = "Asia/Jakarta";

/* ================= MULTER ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar!"), false);
  }
};

exports.upload = multer({ storage, fileFilter });

/* ================= CHECK-IN ================= */
exports.CheckIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;
    const waktuSekarang = new Date();

    // ✅ SIMPAN HANYA NAMA FILE
    const buktiFoto = req.file ? req.file.filename : null;

    const existing = await Presensi.findOne({
      where: { userId, checkOut: null },
    });

    if (existing) {
      return res.status(400).json({
        message: "Anda sudah check-in dan belum check-out",
      });
    }

    const presensi = await Presensi.create({
      userId,
      checkIn: waktuSekarang,
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      buktiFoto,
    });

    res.status(201).json({
      message: "Check-in berhasil",
      data: presensi,
    });
  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

/* ================= CHECK-OUT ================= */
exports.CheckOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const waktuSekarang = new Date();

    const presensi = await Presensi.findOne({
      where: { userId, checkOut: null },
    });

    if (!presensi) {
      return res.status(404).json({
        message: "Tidak ada check-in aktif",
      });
    }

    presensi.checkOut = waktuSekarang;
    await presensi.save();

    res.json({
      message: "Check-out berhasil",
      data: presensi,
    });
  } catch (err) {
    console.error("CHECK-OUT ERROR:", err);
    res.status(500).json({
      message: "Terjadi kesalahan server",
    });
  }
};

/* ================= LAPORAN PRESENSI ================= */
exports.getAllPresensi = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    const presensi = await Presensi.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "nama", "email"],
      },
      order: [["checkIn", "DESC"]],
    });

    const result = presensi.map((p) => ({
      mahasiswa: p.user?.nama || "-",
      tanggal: format(p.checkIn, "yyyy-MM-dd", { timeZone }),
      checkIn: format(p.checkIn, "HH:mm:ss", { timeZone }),
      checkOut: p.checkOut
        ? format(p.checkOut, "HH:mm:ss", { timeZone })
        : "-",
      latitude: p.latitude ?? "-",
      longitude: p.longitude ?? "-",
      // ✅ JANGAN DOUBLE uploads
      buktiFoto: p.buktiFoto,
    }));

    res.json({ data: result });
  } catch (err) {
    console.error("LAPORAN ERROR:", err);
    res.status(500).json({
      message: "Gagal mengambil laporan",
    });
  }
};
