import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email: email,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('token', token); 

      navigate('/dashboard');

    } catch (err) {
      setError(err.response ? err.response.data.message : 'Login gagal');
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
          <div className="inline-block mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center text-4xl shadow-xl">
              👋
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Selamat Datang
          </h2>
          <p className="text-gray-600">Masuk ke Lumilook Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-gray-700 font-medium mb-2"
            >
              📧 Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@email.com"
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-purple-400 focus:outline-none transition-colors bg-white/50"
            />
          </div>

          {/* Password */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-gray-700 font-medium mb-2"
            >
              🔒 Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Masukkan password"
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl focus:border-pink-400 focus:outline-none transition-colors bg-white/50 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-medium hover:underline"
            >
              Lupa password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
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
                Masuk...
              </span>
            ) : (
              'Masuk 🚀'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white/80 text-gray-500">atau</span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full bg-white border-2 border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">🔵</span>
            Masuk dengan Google
          </button>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Belum punya akun?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:underline"
            >
              Daftar sekarang
            </button>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Dengan masuk, Anda menyetujui</p>
          <p className="mt-1">
            <span className="hover:underline cursor-pointer">Syarat Layanan</span>
            {' & '}
            <span className="hover:underline cursor-pointer">Kebijakan Privasi</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;