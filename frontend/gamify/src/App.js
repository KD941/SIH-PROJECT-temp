import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/dashboards/Dashboard';
import Profile from './components/Profile';
import EquationMaster from './components/games/EquationMaster';
import FormulaFounders from './components/games/FormulaFounders';
import { SyncManager } from './components/utils/offlineSync';
import AIAgent from './components/AIAgent';

const Notification = ({ message, onDismiss }) => (
  <div className="fixed top-5 right-5 bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold px-6 py-3 rounded-lg shadow-glow z-50 animate-fade-in-down">
    {message}
  </div>
);

function App() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const handleSyncSuccess = (event) => {
      const { count } = event.detail;
      if (count > 0) {
        setNotification(`Successfully synced ${count} offline record(s)!`);
        const timer = setTimeout(() => {
          setNotification(null);
        }, 5000); // Hide after 5 seconds
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('sync-success', handleSyncSuccess);

    return () => {
      window.removeEventListener('sync-success', handleSyncSuccess);
    };
  }, []);

  return (
    <>
      {notification && <Notification message={notification} />}
      <AIAgent />
      <SyncManager />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
          <Route path="/profile/:role" element={<Profile />} />
          
          {/* Game Routes */}
          <Route path="/game/equation-master" element={<EquationMaster />} />
          <Route path="/game/formula-founders" element={<FormulaFounders />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;