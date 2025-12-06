import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isMahasiswaDashboard =
    location.pathname === "/mahasiswa/dashboard";

  const isAdminDashboard =
    location.pathname === "/admin/dashboard";

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Presensi Web</h1>

      <div className="flex items-center space-x-6">
        {/* ✅ LABEL ROLE */}
        <span className="font-semibold capitalize">
          {user?.role === "admin" ? "Admin" : "Mahasiswa"}
        </span>

        {/* ===== MAHASISWA ===== */}
        {user?.role === "mahasiswa" && (
          <>
            <Link to="/mahasiswa/dashboard" className="hover:underline">
              Dashboard
            </Link>

            {!isMahasiswaDashboard && (
              <Link to="/mahasiswa/presensi" className="hover:underline">
                Presensi
              </Link>
            )}
          </>
        )}

        {/* ===== ADMIN ===== */}
        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>

            {!isAdminDashboard && (
              <Link to="/admin/laporan-presensi" className="hover:underline">
                Laporan Presensi
              </Link>
            )}
          </>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
