import React from "react";
import { Link } from "react-router-dom";

export default function MahasiswaDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard Mahasiswa</h1>

      <div className="space-y-4">
        {/* Tombol Presensi */}
        <Link
          to="/mahasiswa/presensi"
          className="block bg-blue-600 text-white p-4 rounded-lg shadow hover:bg-blue-700"
        >
          Lakukan Presensi (Check-In / Check-Out)
        </Link>
      </div>
    </div>
  );
}
