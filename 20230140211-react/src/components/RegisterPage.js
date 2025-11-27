import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "mahasiswa" // default
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Registrasi gagal");
        return;
      }

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");

    } catch (error) {
      setErrorMessage("Gagal terhubung ke server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Register
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Daftar untuk membuat akun baru
        </p>

        {errorMessage && (
          <p className="text-red-500 text-center mb-3">{errorMessage}</p>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="text-gray-700 text-sm">Nama</label>
            <input
              type="text"
              name="nama"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Masukkan nama lengkap"
              value={form.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Masukkan email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Masukkan password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ROLE SELECT */}
          <div>
            <label className="text-gray-700 text-sm">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Sudah punya akun?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
