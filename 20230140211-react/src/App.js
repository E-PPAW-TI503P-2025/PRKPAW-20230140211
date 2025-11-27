import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/navbar';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

// Sesuaikan dengan nama file EXACT yang kamu pakai
import MahasiswaDashboard from './components/MahasiswaDashboardPage';
import AdminDashboard from './components/AdminDashboard';

import LaporanPresensiPage from './components/LaporanPresensiPage';
import PresensiPage from './components/presensiPage';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/register", "/"].includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Mahasiswa Routes */}
          <Route path="/mahasiswa/dashboard" element={<MahasiswaDashboard />} />
          <Route path="/mahasiswa/presensi" element={<PresensiPage />} />


          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/laporan-presensi" element={<LaporanPresensiPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
