import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bootstrapDefaults, authApi } from './utils/storage';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState(location.state?.userType || 'student');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => { bootstrapDefaults(); }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = (formData.email || '').trim();
    const password = (formData.password || '').trim();
    bootstrapDefaults();
    const user = authApi.login(email, password);
    if (user) {
      navigate(`/dashboard/${user.role}`);
    } else alert('Invalid credentials or user not verified');
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'student':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'teacher':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      case 'admin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center shadow-glow">
              <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-slate-400">Learn with Fun, Anywhere, Anytime</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">I am a</label>
            <div className="grid grid-cols-3 gap-2">
              {['student', 'teacher', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedRole === role
                      ? `border-neon-green bg-neon-green/10 text-neon-green`
                      : 'border-slate-600 bg-dark-800 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {getRoleIcon(role)}
                    <span className="text-xs font-medium capitalize">{role}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="student@school.com"
                className="w-full px-3 py-2 bg-dark-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent text-slate-100"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-dark-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-transparent text-slate-100"
                required
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-neon-green hover:text-neon-blue">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              id="login-submit-btn"
              className={`w-full btn text-white font-medium py-3 rounded-lg transition-all shadow-glow ${
                selectedRole === 'student'
                  ? 'bg-gradient-to-r from-neon-green to-neon-blue text-dark-900'
                  : selectedRole === 'teacher'
                  ? 'bg-gradient-to-r from-neon-blue to-purple-500'
                  : 'bg-gradient-to-r from-neon-yellow to-orange-500 text-dark-900'
              }`}
            >
              Login
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { label: 'Student', email: 'student', pass: 'student123' },
              { label: 'Teacher', email: 'teacher', pass: 'teacher123' },
              { label: 'Admin', email: 'admin', pass: 'admin123' }
            ].map((q) => (
              <button key={q.label} onClick={() => { setSelectedRole(q.label.toLowerCase()); setFormData({ email: q.email, password: q.pass }); setTimeout(()=>document.getElementById('login-submit-btn')?.click(), 50); }} className="p-2 text-sm bg-dark-800 border border-slate-600 rounded hover:border-slate-500">
                {q.label}
              </button>
            ))}
          </div>

          {/* Signup Link */}
          <div className="text-center mt-6">
            <p className="text-slate-400">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-neon-green hover:text-neon-blue font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/')}
              className="text-slate-500 hover:text-slate-300 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;