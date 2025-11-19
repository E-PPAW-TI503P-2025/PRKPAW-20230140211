import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('mahasiswa');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        nama,
        email,
        role,
        password,
      });

      navigate('/login');
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Register gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

      <div className="bg-white/80 backdrop-blur-lg p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 border border-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center text-4xl shadow-lg">
              ✨
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Daftar Akun
          </h2>
          <p className="text-gray-600">Bergabunglah dengan Lumilook Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Nama */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              👤 Nama Lengkap
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-400 focus:outline-none transition-colors bg-white/50"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white/50"
              placeholder="nama@email.com"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              🎭 Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-orange-400 focus:outline-none transition-colors bg-white/50 cursor-pointer"
            >
              <option value="mahasiswa">👨‍🎓 Mahasiswa</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              🔒 Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-400 focus:outline-none transition-colors bg-white/50"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mendaftar...
              </span>
            ) : (
              'Daftar Sekarang 🚀'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Sudah punya akun?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:underline"
            >
              Login disini
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Dengan mendaftar, Anda menyetujui syarat & ketentuan kami
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;