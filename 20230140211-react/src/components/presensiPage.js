import React, {  useState, useEffect, useRef, useCallback} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// React Leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Webcam from "react-webcam";

function PresensiPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null); // { lat, lng }
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  // ============================
  // AMBIL LOKASI USER
  // ============================
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Browser tidak mendukung Geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError("Gagal mendapatkan lokasi: " + err.message);
      }
    );
  };

  // Ambil lokasi saat halaman dibuka
  useEffect(() => {
    getLocation();
  }, []);

  // ============================
  // FUNGSI PRESENSI
  // ============================
  const handlePresensi = async (type) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Check-in Wajib lokasi
    if (type === "in" && !coords) {
      setError("Lokasi belum tersedia. Silakan izinkan akses lokasi.");
      return;
    }

    if (!image) {
      setError("Foto wajib ada!");
      return;
    }

    const endpoint =
      type === "in"
        ? "http://localhost:3001/api/presensi/check-in"
        : "http://localhost:3001/api/presensi/check-out";

    try {
      const blob = await (await fetch(image)).blob();

      //Buat FormData
      const formData = new FormData();
      formData.append("latitude", coords.lat);
      formData.append("longitude", coords.lng);
      formData.append("buktiFoto", blob, "selfie.jpg");

      const res = await axios.post(endpoint, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(res.data.message);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      setMessage("");
      setError(
        err.response?.data?.message ||
          `Gagal melakukan Check-${type === "in" ? "In" : "Out"}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {/* ================= PETA LOKASI (MODUL OSM) ================= */}
        {coords && (
          <div className="my-4 border rounded-lg overflow-hidden">
            <MapContainer
              center={[coords.lat, coords.lng]}
              zoom={15}
              style={{ height: "300px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              <Marker position={[coords.lat, coords.lng]}>
                <Popup>Lokasi Presensi Anda</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
        {/* =========================================================== */}

<div className="my-4 border rounded-lg overflow-hidden bg-black">
 	        {image ? (
 	          <img src={image} alt="Selfie" className="w-full" />
 	        ) : (
 	          <Webcam
 	            audio={false}
 	            ref={webcamRef}
 	            screenshotFormat="image/jpeg"
 	            className="w-full"
 	          />
 	        )}
 	      </div>
 	
 	      <div className="mb-4">
 	        {!image ? (
 	          <button onClick={capture} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
 	            Ambil Foto 📸
 	          </button>
 	        ) : (
 	          <button onClick={() => setImage(null)} className="bg-gray-500 text-white px-4 py-2 rounded w-full">
 	            Foto Ulang 🔄
 	          </button>
 	        )}
 	      </div>


        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Lakukan Presensi
        </h2>

        {message && (
          <p className="text-green-600 mb-4 font-semibold">{message}</p>
        )}

        {error && <p className="text-red-600 mb-4 font-semibold">{error}</p>}

        <div className="flex space-x-4">
          <button
            onClick={() => handlePresensi("in")}
            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
          >
            Check-In
          </button>

          <button
            onClick={() => handlePresensi("out")}
            className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
          >
            Check-Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default PresensiPage;
