import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = (userType) => {
    navigate('/login', { state: { userType } });
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient">
      {/* Header */}
      <div className="text-center py-12">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center shadow-glow">
            <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="text-neon-green">i</span>Knowledge
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Education Made Fun for Everyone
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Interactive games, puzzles, and multilingual lessons designed for rural students with limited internet.
          </p>
        </div>

        {/* Key Features */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 bg-dark-800 border border-neon-green px-4 py-2 rounded-full shadow-glow">
            <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-neon-green">Interactive Games & Puzzles</span>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-neon-blue px-4 py-2 rounded-full shadow-glow">
            <svg className="w-5 h-5 text-neon-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            <span className="text-sm font-medium text-neon-blue">Multilingual Support</span>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-purple-500 px-4 py-2 rounded-full shadow-glow">
            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-purple-500">Offline-First Access</span>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-neon-yellow px-4 py-2 rounded-full shadow-glow">
            <svg className="w-5 h-5 text-neon-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-neon-yellow">Badges & Achievements</span>
          </div>
        </div>
      </div>

      {/* Login Portals */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Student Login */}
          <div className="card text-center hover:shadow-glow transition-all border border-slate-700">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center shadow-glow">
              <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Student Login</h3>
            <p className="text-slate-400 mb-6">
              Access your courses, games, and track progress.
            </p>
            <button
              onClick={() => handleLoginClick('student')}
              className="btn w-full bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold shadow-glow"
            >
              Enter Portal
            </button>
          </div>

          {/* Teacher Login */}
          <div className="card text-center hover:shadow-glow transition-all border border-slate-700">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-neon-blue to-purple-500 rounded-full flex items-center justify-center shadow-glow">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Teacher Login</h3>
            <p className="text-slate-400 mb-6">
              Manage classrooms, create content, view analytics.
            </p>
            <button
              onClick={() => handleLoginClick('teacher')}
              className="btn w-full bg-gradient-to-r from-neon-blue to-purple-500 text-white font-bold shadow-glow"
            >
              Enter Portal
            </button>
          </div>

          {/* School Admin Login */}
          <div className="card text-center hover:shadow-glow transition-all border border-slate-700">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-neon-yellow to-orange-500 rounded-full flex items-center justify-center shadow-glow">
              <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">School Admin Login</h3>
            <p className="text-slate-400 mb-6">
              Oversee school operations and manage users.
            </p>
            <button
              onClick={() => handleLoginClick('admin')}
              className="btn w-full bg-gradient-to-r from-neon-yellow to-orange-500 text-dark-900 font-bold shadow-glow"
            >
              Enter Portal
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-16">
        <p className="text-slate-400 text-sm">
          © 2024 iKnowledge • Empowering Rural Education
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;