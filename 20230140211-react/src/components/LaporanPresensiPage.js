import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LaporanPresensiPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:3001/api/presensi/laporan",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(res.data.data || []);
    } catch (err) {
      setError("Gagal memuat laporan presensi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-10">Memuat data...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Laporan Presensi</h1>

      {data.length === 0 ? (
        <p className="mt-6">Belum ada data presensi.</p>
      ) : (
        <table className="w-full mt-6 border-collapse bg-white shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Mahasiswa</th>
              <th className="border p-3">Tanggal</th>
              <th className="border p-3">Check-In</th>
              <th className="border p-3">Check-Out</th>
              <th className="border p-3">Latitude</th>
              <th className="border p-3">Longitude</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="text-center">
                <td className="border p-3">{row.mahasiswa || "(Tidak ditemukan)"}</td>
                <td className="border p-3">{row.tanggal || "-"}</td>
                <td className="border p-3">{row.checkIn || "-"}</td>
                <td className="border p-3">{row.checkOut || "-"}</td>
                <td className="border p-3">{row.latitude ?? "-"}</td>
                <td className="border p-3">{row.longitude ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
