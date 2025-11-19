import React, { useState } from "react";
import axios from "axios";

function PresensiPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCheckIn = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/api/presensi/check-in",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal Check-In");
      setMessage("");
    }
  };

  const handleCheckOut = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3001/api/presensi/check-out",
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setMessage(res.data.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal Check-Out");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Lakukan Presensi
        </h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={handleCheckIn}
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
          >
            Check-In
          </button>

          <button
            onClick={handleCheckOut}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
          >
            Check-Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default PresensiPage;
