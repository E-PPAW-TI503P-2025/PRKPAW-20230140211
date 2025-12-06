import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ BASE URL API (WAJIB)
const API_URL = "http://localhost:3001";

export default function LaporanPresensiPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchLaporan();
  }, []);

  const fetchLaporan = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API_URL}/api/presensi/laporan`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat laporan presensi");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-10">Memuat data...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Laporan Presensi</h1>

      {/* ✅ MODAL PREVIEW FOTO */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview Bukti Presensi"
            className="max-h-[90%] max-w-[90%] rounded-lg border-4 border-white shadow-lg"
          />
        </div>
      )}

      {data.length === 0 ? (
        <p>Belum ada data presensi.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-sm">
                <th className="border p-3">Mahasiswa</th>
                <th className="border p-3">Tanggal</th>
                <th className="border p-3">Check In</th>
                <th className="border p-3">Check Out</th>
                <th className="border p-3">Latitude</th>
                <th className="border p-3">Longitude</th>
                <th className="border p-3">Bukti Foto</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="text-center text-sm hover:bg-gray-50">
                  <td className="border p-3">{row.mahasiswa}</td>
                  <td className="border p-3">{row.tanggal}</td>
                  <td className="border p-3">{row.checkIn}</td>
                  <td className="border p-3">{row.checkOut}</td>
                  <td className="border p-3">{row.latitude}</td>
                  <td className="border p-3">{row.longitude}</td>

                  {/* ✅ FIX BUKTI FOTO */}
                  <td className="border p-3">
                    {row.buktiFoto ? (
                      <img
                        src={`${API_URL}/uploads/${row.buktiFoto}`}
                        alt="Bukti Presensi"
                        className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 mx-auto border"
                        onClick={() =>
                          setPreviewImage(
                            `${API_URL}/uploads/${row.buktiFoto}`
                          )
                        }
                      />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
