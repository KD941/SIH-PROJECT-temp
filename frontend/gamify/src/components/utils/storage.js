// Simple localStorage-backed storage for demo purposes
const STORAGE_KEYS = {
  users: 'glp_users',
  currentUser: 'glp_current_user',
  classes: 'glp_classes'
};

export const getJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const setJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const bootstrapDefaults = () => {
  const users = getJson(STORAGE_KEYS.users, []);
  if (!users.length) {
    setJson(STORAGE_KEYS.users, [
      { id: 'u1', role: 'admin', name: 'Principal', email: 'admin@school.com', password: 'admin123', verified: true },
      { id: 'u2', role: 'teacher', name: 'Ms. Smith', email: 'teacher@school.com', password: 'teacher123', verified: true },
      { id: 'u3', role: 'student', name: 'Alex', email: 'student@school.com', password: 'student123', verified: true }
    ]);
  }
  const classes = getJson(STORAGE_KEYS.classes, []);
  if (!classes.length) {
    setJson(STORAGE_KEYS.classes, [
      { id: 'c1', name: 'Grade 8 - Math', subject: 'Math', teacherId: 'u2', studentIds: ['u3'] }
    ]);
  }
};

export const authApi = {
  login(email, password) {
    const users = getJson(STORAGE_KEYS.users, []);
    // Allow shortcuts like "student" or "stu" to login demo users quickly
    const aliasMap = {
      student: 'student@school.com',
      stu: 'student@school.com',
      teacher: 'teacher@school.com',
      tea: 'teacher@school.com',
      admin: 'admin@school.com'
    };
    const normalizedEmail = aliasMap[email?.trim()?.toLowerCase()] || email;
    const user = users.find(u => (u.email === normalizedEmail || u.name?.toLowerCase() === normalizedEmail?.toLowerCase()) && u.password === password);
    if (user && user.verified !== false) {
      setJson(STORAGE_KEYS.currentUser, user);
      return user;
    }
    return null;
  },
  logout() { localStorage.removeItem(STORAGE_KEYS.currentUser); },
  current() { return getJson(STORAGE_KEYS.currentUser, null); }
};

export const userApi = {
  all() { return getJson(STORAGE_KEYS.users, []); },
  saveAll(users) { setJson(STORAGE_KEYS.users, users); },
  add(user) {
    const users = getJson(STORAGE_KEYS.users, []);
    users.push(user);
    setJson(STORAGE_KEYS.users, users);
    return user;
  },
  verify(userId, verified = true) {
    const users = getJson(STORAGE_KEYS.users, []);
    const idx = users.findIndex(u => u.id === userId);
    if (idx >= 0) { users[idx].verified = verified; setJson(STORAGE_KEYS.users, users); }
  }
};

export const classApi = {
  all() { return getJson(STORAGE_KEYS.classes, []); },
  saveAll(classes) { setJson(STORAGE_KEYS.classes, classes); },
  create(klass) {
    const classes = getJson(STORAGE_KEYS.classes, []);
    classes.push(klass);
    setJson(STORAGE_KEYS.classes, classes);
    return klass;
  },
  assignTeacher(classId, teacherId) {
    const classes = getJson(STORAGE_KEYS.classes, []);
    const idx = classes.findIndex(c => c.id === classId);
    if (idx >= 0) { classes[idx].teacherId = teacherId; setJson(STORAGE_KEYS.classes, classes); }
  },
  addStudent(classId, studentId) {
    const classes = getJson(STORAGE_KEYS.classes, []);
    const idx = classes.findIndex(c => c.id === classId);
    if (idx >= 0) {
      const set = new Set(classes[idx].studentIds || []);
      set.add(studentId);
      classes[idx].studentIds = Array.from(set);
      setJson(STORAGE_KEYS.classes, classes);
    }
  }
};

export default { STORAGE_KEYS, getJson, setJson, bootstrapDefaults, authApi, userApi, classApi };


