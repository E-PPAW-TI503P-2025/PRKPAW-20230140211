const { Presensi, User } = require("../models");
const { format } = require("date-fns-tz");

const timeZone = "Asia/Jakarta";

// ==================== CHECK-IN ====================
exports.CheckIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;
    const waktuSekarang = new Date();

    // Cek apakah user sudah check-in tapi belum check-out
    const existing = await Presensi.findOne({
      where: { userId, checkOut: null }
    });

    if (existing) {
      return res.status(400).json({
        message: "Anda sudah check-in dan belum check-out"
      });
    }

    const presensi = await Presensi.create({
      userId,
      checkIn: waktuSekarang,
      latitude: latitude ?? null,
      longitude: longitude ?? null
    });

    res.status(201).json({
      message: "Check-in berhasil",
      data: presensi
    });
  } catch (err) {
    console.error("CHECK-IN ERROR:", err);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: err.message
    });
  }
};

// ==================== CHECK-OUT ====================
exports.CheckOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const waktuSekarang = new Date();

    const presensi = await Presensi.findOne({
      where: { userId, checkOut: null }
    });

    if (!presensi) {
      return res.status(404).json({
        message: "Tidak ada check-in aktif"
      });
    }

    presensi.checkOut = waktuSekarang;
    await presensi.save();

    res.json({
      message: "Check-out berhasil",
      data: presensi
    });
  } catch (err) {
    console.error("CHECK-OUT ERROR:", err);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: err.message
    });
  }
};

// ==================== LAPORAN PRESENSI ====================
exports.getAllPresensi = async (req, res) => {
  try {
    // Hanya admin yang boleh akses
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Akses ditolak" });
    }

    const presensi = await Presensi.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "nama", "email"]
      },
      order: [["checkIn", "DESC"]]
    });

    // Format data supaya lebih rapi
    const result = presensi.map(p => ({
      mahasiswa: p.user.nama,
      tanggal: format(p.checkIn, "yyyy-MM-dd", { timeZone }),
      checkIn: format(p.checkIn, "HH:mm:ss", { timeZone }),
      checkOut: p.checkOut ? format(p.checkOut, "HH:mm:ss", { timeZone }) : "-",
      latitude: p.latitude ?? "-",
      longitude: p.longitude ?? "-"
    }));

    res.json({ data: result });
  } catch (err) {
    console.error("LAPORAN ERROR:", err);
    res.status(500).json({
      message: "Gagal mengambil laporan presensi",
      error: err.message
    });
  }
};
