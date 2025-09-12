import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authApi } from './utils/storage';

const Profile = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data based on role
  const getUserData = () => {
    switch (role) {
      case 'student':
        return {
          name: 'Alex Johnson',
          email: 'alex@school.com',
          avatar: '👨‍🎓',
          level: 5,
          points: 1250,
          streak: 7,
          badges: ['First Steps', 'Quiz Master', 'Speed Learner'],
          courses: [
            { name: 'Intro to JavaScript', progress: 75, completed: false },
            { name: 'Web Development Basics', progress: 100, completed: true },
            { name: 'Data Structures', progress: 30, completed: false }
          ],
          achievements: [
            { title: 'Early Bird', description: 'Completed 5 lessons before 8 AM', date: '2024-01-15' },
            { title: 'Streak Master', description: 'Maintained 7-day learning streak', date: '2024-01-20' },
            { title: 'Quiz Champion', description: 'Scored 100% on 3 consecutive quizzes', date: '2024-01-18' }
          ]
        };
      case 'teacher':
        return {
          name: 'Dr. Sarah Wilson',
          email: 'sarah@school.com',
          avatar: '👩‍🏫',
          students: 45,
          courses: 8,
          rating: 4.8,
          classes: [
            { name: 'Grade 8-A', students: 25, progress: 78 },
            { name: 'Grade 9-B', students: 20, progress: 85 }
          ],
          recentActivity: [
            { action: 'Created new quiz', course: 'JavaScript Basics', time: '2 hours ago' },
            { action: 'Graded assignments', course: 'Web Development', time: '4 hours ago' },
            { action: 'Added new lesson', course: 'Data Structures', time: '1 day ago' }
          ]
        };
      case 'admin':
        return {
          name: 'Principal Michael Chen',
          email: 'michael@school.com',
          avatar: '👨‍💼',
          school: 'Tech Academy',
          totalStudents: 450,
          totalTeachers: 25,
          totalCourses: 12,
          performance: 87,
          recentReports: [
            { title: 'Monthly Performance Report', date: '2024-01-20', status: 'Completed' },
            { title: 'Student Engagement Analysis', date: '2024-01-18', status: 'In Progress' },
            { title: 'Teacher Evaluation Summary', date: '2024-01-15', status: 'Completed' }
          ]
        };
      default:
        return {};
    }
  };

  const userData = getUserData();

  const current = authApi.current();

  const getRoleColor = () => {
    switch (role) {
      case 'student': return 'from-neon-green to-neon-blue';
      case 'teacher': return 'from-neon-blue to-purple-500';
      case 'admin': return 'from-neon-yellow to-orange-500';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'student':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      case 'teacher':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        );
      case 'admin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-6a1 1 0 00-1-1H9a1 1 0 00-1 1v6a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient text-slate-100 p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/dashboard/${role}`)}
            className="btn btn-outline"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <div className="w-24" />
        </div>

        {/* Profile Header */}
        <div className="card border border-slate-700 mb-8">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center text-4xl shadow-glow`}>
              {userData.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <div className={`px-3 py-1 bg-gradient-to-r ${getRoleColor()} text-white rounded-full text-sm font-medium`}>
                  {role?.toUpperCase()}
                </div>
              </div>
              <p className="text-slate-400 mb-2">{userData.email}</p>
              {role === 'student' && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-slate-300">Level {userData.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-neon-blue" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-300">{userData.points} Points</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {['overview', 'progress', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? `bg-gradient-to-r ${getRoleColor()} text-white shadow-glow`
                  : 'bg-dark-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {role === 'student' && (
              <>
                <div className="card border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Badges Earned</h3>
                  <div className="space-y-3">
                    {userData.badges.map((badge, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-dark-800 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-neon-yellow to-orange-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-dark-900" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-slate-300">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Achievements</h3>
                  <div className="space-y-3">
                    {userData.achievements.map((achievement, index) => (
                      <div key={index} className="p-3 bg-dark-800 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white">{achievement.title}</h4>
                          <span className="text-xs text-slate-400">{achievement.date}</span>
                        </div>
                        <p className="text-sm text-slate-400">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {role === 'teacher' && (
              <>
                <div className="card border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Class Overview</h3>
                  <div className="space-y-3">
                    {userData.classes.map((cls, index) => (
                      <div key={index} className="p-4 bg-dark-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{cls.name}</h4>
                          <span className="text-sm text-slate-400">{cls.students} students</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full"
                            style={{ width: `${cls.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{cls.progress}% average progress</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {userData.recentActivity.map((activity, index) => (
                      <div key={index} className="p-3 bg-dark-800 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white">{activity.action}</h4>
                          <span className="text-xs text-slate-400">{activity.time}</span>
                        </div>
                        <p className="text-sm text-slate-400">{activity.course}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {role === 'admin' && (
              <>
                <div className="card border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">School Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-dark-800 rounded-lg">
                      <div className="text-2xl font-bold text-neon-green">{userData.totalStudents}</div>
                      <div className="text-sm text-slate-400">Total Students</div>
                    </div>
                    <div className="text-center p-4 bg-dark-800 rounded-lg">
                      <div className="text-2xl font-bold text-neon-blue">{userData.totalTeachers}</div>
                      <div className="text-sm text-slate-400">Teachers</div>
                    </div>
                    <div className="text-center p-4 bg-dark-800 rounded-lg">
                      <div className="text-2xl font-bold text-neon-yellow">{userData.totalCourses}</div>
                      <div className="text-sm text-slate-400">Courses</div>
                    </div>
                    <div className="text-center p-4 bg-dark-800 rounded-lg">
                      <div className="text-2xl font-bold text-purple-500">{userData.performance}%</div>
                      <div className="text-sm text-slate-400">Performance</div>
                    </div>
                  </div>
                </div>

                <div className="card border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Reports</h3>
                  <div className="space-y-3">
                    {userData.recentReports.map((report, index) => (
                      <div key={index} className="p-3 bg-dark-800 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-white">{report.title}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.status === 'Completed'
                              ? 'bg-neon-green/20 text-neon-green'
                              : 'bg-neon-blue/20 text-neon-blue'
                          }`}>
                            {report.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">{report.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="card border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Progress Tracking</h3>
            {role === 'student' && (
              <div className="space-y-4">
                {userData.courses.map((course, index) => (
                  <div key={index} className="p-4 bg-dark-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{course.name}</h4>
                      <span className="text-sm text-slate-400">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          course.completed
                            ? 'bg-gradient-to-r from-neon-green to-neon-blue'
                            : 'bg-gradient-to-r from-neon-blue to-purple-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    {course.completed && (
                      <div className="flex items-center gap-2 mt-2">
                        <svg className="w-4 h-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-neon-green">Completed</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="w-full px-3 py-2 bg-dark-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full px-3 py-2 bg-dark-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green text-slate-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 bg-dark-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-green text-slate-100"
                />
              </div>
              <button className="btn bg-gradient-to-r from-neon-green to-neon-blue text-dark-900 font-bold shadow-glow">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;


