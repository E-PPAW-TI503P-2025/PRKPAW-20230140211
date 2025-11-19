import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-6 md:p-10 flex flex-col items-center relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center mb-10 relative z-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent drop-shadow-sm mb-2">
            ✨ Lumilook Dashboard
          </h1>
          <p className="text-gray-600 text-sm">Selamat datang kembali!</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition transform font-medium"
        >
          Logout
        </button>
      </header>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white relative z-10">
        
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          
          {/* Avatar with Glow Effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 shadow-xl flex items-center justify-center text-white text-5xl">
              😊
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Halo, Pengguna! 👋
            </h2>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Selamat datang di dashboard Anda! Nikmati pengalaman yang indah dan intuitif dengan desain modern yang penuh warna.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-5 border border-purple-200">
            <div className="text-purple-600 text-3xl font-bold mb-1">127</div>
            <div className="text-purple-700 text-sm font-medium">Total Aktivitas</div>
          </div>
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl p-5 border border-pink-200">
            <div className="text-pink-600 text-3xl font-bold mb-1">42</div>
            <div className="text-pink-700 text-sm font-medium">Proyek Aktif</div>
          </div>
          <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl p-5 border border-orange-200">
            <div className="text-orange-600 text-3xl font-bold mb-1">95%</div>
            <div className="text-orange-700 text-sm font-medium">Pencapaian</div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 - Statistik */}
          <div 
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-2xl font-bold text-white mb-3">Statistik</h3>
              <p className="text-purple-100 text-sm leading-relaxed">
                Pantau performa dan aktivitas Anda dengan visualisasi data yang menarik.
              </p>
              <div className="mt-4 inline-flex items-center text-white font-medium text-sm group-hover:translate-x-2 transition-transform">
                Lihat Detail →
              </div>
            </div>
          </div>

          {/* Card 2 - Data */}
          <div 
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">📁</div>
              <h3 className="text-2xl font-bold text-white mb-3">Data Anda</h3>
              <p className="text-pink-100 text-sm leading-relaxed">
                Kelola semua informasi dan dokumen penting Anda dengan mudah dan aman.
              </p>
              <div className="mt-4 inline-flex items-center text-white font-medium text-sm group-hover:translate-x-2 transition-transform">
                Kelola Data →
              </div>
            </div>
          </div>

          {/* Card 3 - Pengaturan */}
          <div 
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚙️</div>
              <h3 className="text-2xl font-bold text-white mb-3">Pengaturan</h3>
              <p className="text-orange-100 text-sm leading-relaxed">
                Sesuaikan preferensi dan kustomisasi dashboard sesuai keinginan Anda.
              </p>
              <div className="mt-4 inline-flex items-center text-white font-medium text-sm group-hover:translate-x-2 transition-transform">
                Buka Pengaturan →
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition transform font-medium text-sm">
            + Tambah Proyek
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition transform font-medium text-sm">
            📧 Pesan Baru
          </button>
          <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition transform font-medium text-sm">
            🔔 Notifikasi
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-600 text-sm relative z-10 flex items-center gap-2">
        <span>&copy; {new Date().getFullYear()}</span>
        <span className="text-purple-500">•</span>
        <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent font-semibold">
          Via Dashboard
        </span>
        <span className="text-purple-500">•</span>
        <span>Dibuat dengan</span>
        <span className="text-pink-500 animate-pulse">💖</span>
      </footer>
    </div>
  );
}

export default DashboardPage;