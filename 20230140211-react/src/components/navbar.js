import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ perbaikan import

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let user = null;

  // Cegah error jika token invalid / expired
  try {
    if (token) {
      user = jwtDecode(token);
    }
  } catch (err) {
    console.error("Token tidak valid:", err);
    localStorage.removeItem("token");
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">Presensi Web</h1>

      <div className="flex items-center space-x-6">
        <span>{user?.nama || "User"}</span>

        {user?.role === "admin" && (
          <Link to="/reports" className="hover:underline">
            Laporan Admin
          </Link>
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
