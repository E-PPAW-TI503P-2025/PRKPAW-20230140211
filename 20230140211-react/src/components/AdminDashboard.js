import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      <div className="space-y-4">
        <Link
          to="/admin/laporan-presensi"
          className="block bg-purple-600 text-white p-4 rounded-lg shadow hover:bg-purple-700"
        >
          Lihat Laporan Presensi Seluruh Mahasiswa
        </Link>
      </div>
    </div>
  );
}
