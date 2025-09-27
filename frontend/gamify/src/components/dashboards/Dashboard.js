import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StarIcon, PlanetIcon, RocketIcon, RobotHeadIcon, SparkleIcon, BlobShape } from '../icons/IconLibrary';
import { bootstrapDefaults, authApi, userApi, classApi } from '../utils/storage';

const Badge = ({ label, value }) => (
  <div className="card text-center">
    <div className="text-2xl font-bold mb-1">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const Dashboard = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('glp_auth_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const API_URL = 'http://127.0.0.1:8000';
      let endpoint = '';
      if (role === 'student') endpoint = '/student/dashboard';
      else if (role === 'teacher') endpoint = '/teacher/dashboard';
      else if (role === 'admin') endpoint = '/admin/dashboard';

      if (endpoint) {
        try {
          const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          setDashboardData(data);
        } catch (error) {
          console.error('Failed to fetch dashboard data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [role, navigate, refresh]);

  const currentUser = authApi.current();

  return (
    <div className="min-h-screen bg-dark-900 bg-space-gradient p-6 text-slate-100 relative overflow-hidden">
      {/* Decorative Stickers */}
      <div className="sticker sticker-float-slow sticker-glow" style={{ top: '-20px', left: '-20px' }}>
        <BlobShape size={220} />
      </div>
      <div className="sticker sticker-float" style={{ top: 40, right: 40 }}>
        <PlanetIcon size={88} />
      </div>
      <div className="sticker sticker-spin-slow" style={{ bottom: 80, left: 30 }}>
        <StarIcon size={20} />
      </div>
      <div className="sticker sticker-spin-slow" style={{ bottom: 120, left: 80 }}>
        <SparkleIcon size={16} />
      </div>
      <div className="sticker sticker-float" style={{ bottom: 20, right: -10 }}>
        <RocketIcon size={90} />
      </div>
      {/* Top bar */}
      <div className="container mx-auto mb-6 relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{loading ? 'Loading...' : dashboardData?.title}</h1>
            <p className="text-sm text-slate-400">Welcome back!</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="btn btn-outline">Home</button>
            <button className="btn btn-primary shadow-glow">Download for Offline</button>
            <button onClick={() => navigate(`/profile/${role}`)} className="btn" style={{background:'linear-gradient(135deg,#22f3a2,#3b82f6)',color:'#0b1020'}}>Profile</button>
          </div>
        </div>
      </div>

      {/* KPIs */}
      {!loading && dashboardData?.kpis && (
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
          {dashboardData.kpis.map((k) => (
            <Badge key={k.label} label={k.label} value={k.value} />
          ))}
        </div>
      )}

      {/* Sections */}
      {!loading && dashboardData?.sections && (
        <div className="container mx-auto grid gap-6 relative z-10">
          {dashboardData.sections.map((section) => (
          <div key={section.title} className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
            </div>

            {/* Cards list for student */}
            {section.items && (
              <div className="grid md:grid-cols-4 gap-4">
                {section.items.map((item) => (
                  <div key={item.name} className="border border-slate-700 bg-dark-800 rounded-lg p-4 relative">
                    {/* Small corner sticker */}
                    <div className="sticker" style={{ top: -6, right: -6 }}>
                      {item.type === 'mimo' ? (
                        <RobotHeadIcon size={36} />
                      ) : item.type === 'course' ? (
                        <RocketIcon size={34} />
                      ) : (
                        <StarIcon size={18} />
                      )}
                    </div>
                    <div className="text-sm text-slate-400 mb-2">{item.type}</div>
                    <div className="font-semibold mb-4 text-slate-100">{item.name}</div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{item.points}</span>
                      {item.cta ? (
                        <button
                          className="btn btn-primary py-1 px-3 shadow-glow"
                          onClick={() => item.path && navigate(item.path)}
                        >{item.cta}</button>
                      ) : (
                        <span className="text-slate-500">{item.status}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Teacher tools */}
            {role === 'teacher' && (
              <TeacherTools key="teacher-tools" onChange={() => setRefresh(v => v+1)} />
            )}

            {/* Admin tools */}
            {role === 'admin' && (
              <>
                <AdminTools key="admin-tools" onChange={() => setRefresh(v => v+1)} />
                <VerifyUsersPanel key="verify-users" onChange={() => setRefresh(v => v+1)} />
              </>
            )}

            {/* Actions for admin */}
            {section.actions && (
              <div className="grid md:grid-cols-4 gap-3">
                {section.actions.map((a) => (
                  <button key={a.label} className={`btn text-white bg-gradient-to-r ${a.color} shadow-glow`}>
                    {a.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

// Teacher tool to add students to classes
const TeacherTools = ({ onChange }) => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [klassId, setKlassId] = useState('');
  const users = userApi.all();
  const classes = classApi.all();

  useEffect(() => {
    if (!klassId && classes.length) setKlassId(classes[0].id);
  }, [classes, klassId]);

  const handleAddStudent = () => {
    if (!studentName || !studentEmail || !klassId) return;
    const newStudent = { id: `u${Date.now()}`, role: 'student', name: studentName, email: studentEmail, password: 'student123', verified: false };
    userApi.add(newStudent);
    classApi.addStudent(klassId, newStudent.id);
    setStudentName(''); setStudentEmail('');
    onChange?.();
  };

  return (
    <div className="card border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Add Student to Class</h3>
      <div className="grid md:grid-cols-3 gap-3 mb-3">
        <input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Student name" className="px-3 py-2 bg-dark-800 border border-slate-600 rounded" />
        <input value={studentEmail} onChange={e=>setStudentEmail(e.target.value)} placeholder="Student email" className="px-3 py-2 bg-dark-800 border border-slate-600 rounded" />
        <select value={klassId} onChange={e=>setKlassId(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
          {classes.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
      </div>
      <button onClick={handleAddStudent} className="btn btn-primary shadow-glow">Add Student</button>
    </div>
  );
};

// Admin tools to verify, create classes, assign teacher and students
const AdminTools = ({ onChange }) => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('Math');
  const [teacherId, setTeacherId] = useState('');
  const [classIdAssign, setClassIdAssign] = useState('');
  const [studentIdAssign, setStudentIdAssign] = useState('');

  const users = userApi.all();
  const teachers = users.filter(u=>u.role==='teacher' && u.verified!==false);
  const students = users.filter(u=>u.role==='student' && u.verified!==false);
  const classes = classApi.all();

  useEffect(() => {
    if (!teacherId && teachers.length) setTeacherId(teachers[0].id);
    if (!classIdAssign && classes.length) setClassIdAssign(classes[0].id);
    if (!studentIdAssign && students.length) setStudentIdAssign(students[0].id);
  }, [teachers, classes, students, teacherId, classIdAssign, studentIdAssign]);

  const handleCreateClass = () => {
    if (!className) return;
    classApi.create({ id: `c${Date.now()}`, name: className, subject, teacherId, studentIds: [] });
    setClassName('');
    onChange?.();
  };

  const handleAssignTeacher = () => { if (classIdAssign && teacherId) { classApi.assignTeacher(classIdAssign, teacherId); onChange?.(); } };
  const handleAssignStudent = () => { if (classIdAssign && studentIdAssign) { classApi.addStudent(classIdAssign, studentIdAssign); onChange?.(); } };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Create Class</h3>
        <div className="grid gap-3 mb-3">
          <input value={className} onChange={e=>setClassName(e.target.value)} placeholder="Class name e.g. Grade 8 - Science" className="px-3 py-2 bg-dark-800 border border-slate-600 rounded" />
          <select value={subject} onChange={e=>setSubject(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {['Math','Science','Technology','Arts','English'].map(s=> <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={teacherId} onChange={e=>setTeacherId(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {teachers.map(t=> (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
        </div>
        <button onClick={handleCreateClass} className="btn btn-primary shadow-glow">Create Class</button>
      </div>
      <div className="card border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Assign Teacher / Student</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <select value={classIdAssign} onChange={e=>setClassIdAssign(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {classes.map(c=> (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <select value={teacherId} onChange={e=>setTeacherId(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {teachers.map(t=> (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
          <button onClick={handleAssignTeacher} className="btn btn-primary shadow-glow">Assign Teacher</button>
          <select value={studentIdAssign} onChange={e=>setStudentIdAssign(e.target.value)} className="px-3 py-2 bg-dark-800 border border-slate-600 rounded">
            {students.map(s=> (<option key={s.id} value={s.id}>{s.name}</option>))}
          </select>
          <button onClick={handleAssignStudent} className="btn btn-secondary">Add Student</button>
        </div>
      </div>
    </div>
  );
};

const VerifyUsersPanel = ({ onChange }) => {
  const [pending, setPending] = useState([]);
  useEffect(() => {
    const users = userApi.all();
    setPending(users.filter(u => u.verified === false));
  }, []);

  const verify = (id) => {
    userApi.verify(id, true);
    setPending(prev => prev.filter(p => p.id !== id));
    onChange?.();
  };

  if (!pending.length) return null;
  return (
    <div className="card border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Verify New Users</h3>
      <div className="space-y-2">
        {pending.map(u => (
          <div key={u.id} className="flex items-center justify-between p-3 bg-dark-800 rounded">
            <div>
              <div className="text-white font-medium">{u.name} <span className="text-xs text-slate-400">({u.role})</span></div>
              <div className="text-slate-400 text-sm">{u.email}</div>
            </div>
            <button onClick={()=>verify(u.id)} className="btn btn-primary shadow-glow">Verify</button>
          </div>
        ))}
      </div>
    </div>
  );
};
