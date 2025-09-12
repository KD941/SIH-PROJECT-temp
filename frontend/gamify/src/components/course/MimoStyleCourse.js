import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MimoStyleCourse = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const courseData = {
    title: "Intro to JavaScript",
    track: "Back-End Developer",
    progress: 0,
    steps: [
      { id: 1, type: 'content', title: 'What is JavaScript?', completed: false, locked: false },
      { id: 2, type: 'content', title: 'Variables & Data Types', completed: false, locked: true },
      { id: 3, type: 'game', title: 'Flip Card Challenge', completed: false, locked: true },
      { id: 4, type: 'content', title: 'Functions', completed: false, locked: true },
      { id: 5, type: 'game', title: 'Fill in the Blanks', completed: false, locked: true },
      { id: 6, type: 'content', title: 'Arrays & Loops', completed: false, locked: true },
      { id: 7, type: 'game', title: 'Memory Game', completed: false, locked: true },
      { id: 8, type: 'quiz', title: 'Final Quiz', completed: false, locked: true }
    ]
  };

  const userStats = {
    hearts: 5,
    coins: 200,
    streak: 0
  };

  const getStepIcon = (step) => {
    if (step.completed) {
      return (
        <svg className="w-6 h-6 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    }
    if (step.locked) {
      return (
        <svg className="w-6 h-6 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6 text-neon-blue" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    );
  };

  const handleStepClick = (step) => {
    if (!step.locked) {
      setCurrentStep(step.id - 1);
      navigate(`/course/intro-js/step/${step.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient text-slate-100">
      {/* Top Status Bar */}
      <div className="bg-dark-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-dark-700 px-3 py-1 rounded-full">
              <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold">{userStats.hearts}</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-700 px-3 py-1 rounded-full">
              <svg className="w-5 h-5 text-neon-yellow" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold">{userStats.coins}</span>
            </div>
            <div className="flex items-center gap-2 bg-dark-700 px-3 py-1 rounded-full">
              <svg className="w-5 h-5 text-neon-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold">{userStats.streak}</span>
            </div>
          </div>
          <button onClick={() => navigate('/dashboard/student')} className="text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-dark-800 border-b border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{courseData.track}</h1>
            <p className="text-slate-400">Track Progress</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-neon-green">{courseData.progress}%</div>
            <div className="text-sm text-slate-400">Complete</div>
          </div>
        </div>
      </div>

      {/* Main Course Card */}
      <div className="p-6">
        <div className="bg-dark-800 border-2 border-neon-blue rounded-xl p-6 mb-6 shadow-glow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{courseData.title}</h2>
              <p className="text-slate-400">Start your coding journey</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-neon-green to-neon-blue rounded-full flex items-center justify-center shadow-glow">
              <svg className="w-8 h-8 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="space-y-4">
          {courseData.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connection Line */}
              {index < courseData.steps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-slate-600"></div>
              )}

              {/* Step Card */}
              <div
                onClick={() => handleStepClick(step)}
                className={`relative flex items-center p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  step.completed
                    ? 'bg-neon-green/10 border-neon-green shadow-glow'
                    : step.locked
                    ? 'bg-dark-800 border-slate-600 opacity-50 cursor-not-allowed'
                    : 'bg-dark-800 border-neon-blue hover:border-neon-green hover:shadow-glow'
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-dark-700 mr-4">
                  {getStepIcon(step)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-slate-400 capitalize">{step.type}</p>
                </div>
                {!step.locked && !step.completed && (
                  <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-slate-700 p-4">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-neon-green">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-xs">Learn</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-neon-blue">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Practice</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-neon-yellow">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15a1 1 0 01-2 0v-3a1 1 0 012 0v3zm4 0a1 1 0 01-2 0v-3a1 1 0 012 0v3z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Leaderboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-neon-green">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MimoStyleCourse;


