import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/navbar'; 
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './components/DashboardPage';
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
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/presensi" element={<PresensiPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
