import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/dashboards/Dashboard';
import CoursePage from './components/course/CoursePage';
import MimoStyleCourse from './components/course/MimoStyleCourse';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/mimo-course" element={<MimoStyleCourse />} />
         <Route path="/profile/:role" element={<Profile />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;

