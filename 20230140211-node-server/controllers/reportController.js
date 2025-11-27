'use strict';

const { Presensi, User } = require("../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
  try {
    // ✅ hanya admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Akses ditolak: hanya admin"
      });
    }

    const { nama, tanggalMulai, tanggalSelesai } = req.query;

    let presensiWhere = {};
    let userWhere = {};

    // ✅ filter berdasarkan nama user (JOIN)
    if (nama) {
      userWhere.nama = {
        [Op.like]: `%${nama}%`
      };
    }

    // ✅ filter berdasarkan tanggal checkIn
    if (tanggalMulai && tanggalSelesai) {
      presensiWhere.checkIn = {
        [Op.between]: [
          new Date(tanggalMulai),
          new Date(tanggalSelesai)
        ]
      };
    }

    const records = await Presensi.findAll({
      where: presensiWhere,
      include: [
        {
          model: User,
          as: "user",
          where: userWhere,
          attributes: ["id", "nama", "email"]
        }
      ],
      order: [["checkIn", "DESC"]]
    });

    res.json({
      reportDate: new Date().toLocaleDateString(),
      data: records
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil laporan",
      error: error.message
    });
  }
};
