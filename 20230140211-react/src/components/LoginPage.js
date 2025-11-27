import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || "Login gagal");
        return;
      }

      localStorage.setItem("token", data.token);

      // decode token
      const payload = JSON.parse(atob(data.token.split(".")[1]));

    if (payload.role === "admin") {
    navigate("/admin/dashboard");
}   else {
    navigate("/mahasiswa/dashboard");
}


    } catch (error) {
      setErrorMessage("Gagal terhubung ke server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Login
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Masuk ke akun Anda
        </p>

        {errorMessage && (
          <p className="text-red-500 text-center mb-3">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="text-gray-700 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Masukkan email"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
              placeholder="Masukkan password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          Belum punya akun?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
