const libExpress = require('express');
const libCors = require('cors');
const libRandom = require('randomstring');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const server = libExpress();
server.use(libExpress.json());
const client = new MongoClient('mongodb://Admin:TEAMABC123@localhost:27017/SsMS?authSource=SsMS');
server.use(libCors());
//COMMON API'S(get)

const sessions = {}; // In-memory session store (for demonstration)

// Middleware for token verification
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    const session = sessions[token];
    if (!session) {
        return res.status(403).json({ message: "Invalid token" });
    }

    // Token is valid, attach user info to the request
    req.user = session.user;
    next();
};

const removeUserSession = (userId) => {
    const token = Object.keys(sessions).find(key => sessions[key].user.id.toString() === userId.toString());
    if (token) delete sessions[token];
};

//COMMON API'S(post)
server.post('/user/signup', async (req, res) => {
    if (req.body.name && req.body.email && req.body.password &&req.body.role && req.body.phone) {
        await client.connect();
        const db = await client.db('SsMS');
        const collection = await db.collection('users');
        const result = await collection.find({ email: req.body.email }).toArray();
        if (result.length > 0) {
            res.json({ message: "User already exists" });
            console.log("User already exists");
        }
        else {
            const user =
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                phone: req.body.phone
            }
            await collection.insertOne(user);
            res.json({ message: "User Created Successfully" });
            console.log("User Created Successfully");

        }
        client.close();
    }
    else {
        res.json({ message: "All fields required" });
    }
})


server.post('/user/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        await client.connect();     
        const db = await client.db('SsMS');
        const collection = await db.collection('users');
        const result = await collection.find({ email: req.body.email }).toArray();
        if (result.length == 0) {
            res.json({ message: "User dont exists" });
            console.log("User dont exists");
        }
        else
        {
            if (result[0].password == req.body.password) {
                const user = {
                    id: result[0]._id,
                    name: result[0].name,
                    email: result[0].email,
                    role: result[0].role,
                };
                const token = libRandom.generate();
                sessions[token] = { user: user }; // Store session
                res.json({ message: "Login successful", user: user, token: token });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        }
        client.close();
    }
    else {
        res.json({ message: "All fields required" });
    }
})

server.post('/user/logout', verifyToken, (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (sessions[token]) {
        delete sessions[token];
        res.json({ message: "Logout successful" });
    } else {
        res.status(400).json({ message: "Session not found" });
    }
});

server.get('/user/profile', verifyToken, async (req, res) => {
    try {
        await client.connect();
        const db = await client.db('SsMS');
        const collection = await db.collection('users');
        const user = await collection.findOne({ _id: new ObjectId(req.user.id) });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add role-specific data
        let profileData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.name.charAt(0).toUpperCase(),
        };

        if (user.role === 'student') {
            // In a real app, this would be calculated from other collections
            profileData.performance = {
                level: 12,
                points: 1500,
                badges: ["Math Whiz", "Science Explorer", "Code Starter"],
                achievements: [
                    { title: "Completed Algebra Basics", date: "3 days ago", description: "Mastered all modules in the algebra course." },
                    { title: "5-Day Streak", date: "1 day ago", description: "Logged in and completed a task for 5 consecutive days." }
                ],
            };
        }

        res.json(profileData);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching profile" });
    } finally {
        client.close();
    }
});

server.post('/user/profile/update', verifyToken, async (req, res) => {
    // Implementation for updating user profile will go here
    // It should check the user's role from req.user.role before allowing changes
    res.status(501).json({ message: "Update not implemented yet." });
});

server.get('/student/dashboard', verifyToken, async (req, res) => {
    // In a real app, you'd get the user ID from the verified token
    // const userId = req.user.id;
    // Then fetch data for that user from the database
    res.json({
        title: 'Student Dashboard',
        kpis: [
            { label: 'Points', value: '1500' }, // from DB
            { label: 'Day Streak', value: '12' }, // from DB
            { label: 'Badges', value: '5' }, // from DB
        ],
        sections: [
            {
                title: 'My Courses & Subjects',
                items: [ // from DB, filtered for the student
                    { name: 'Algebra Basics', type: 'math', status: 'Completed', points: '+50' },
                    { name: 'Intro to Physics', type: 'science', cta: 'CONTINUE', points: 'Course' },
                    { name: 'JavaScript Fundamentals', type: 'course', cta: 'OPEN', points: 'Course' },
                ]
            }
        ]
    });
});

server.get('/teacher/dashboard', verifyToken, async (req, res) => {
    // const teacherId = req.user.id;
    // Fetch classes and students for this teacher
    res.json({
        title: 'Teacher Dashboard',
        kpis: [
            { label: 'Total Students', value: '142' }, // from DB
            { label: 'Avg. Progress', value: '68%' }, // calculated from DB
            { label: 'Weekly Growth', value: '+5%' }, // calculated from DB
            { label: 'Engagement', value: '88%' } // calculated from DB
        ],
        sections: [
            // This data would be dynamically generated from your database
        ]
    });
});

server.get('/admin/dashboard', verifyToken, async (req, res) => {
    // Fetch school-wide statistics
    await client.connect();
    const db = await client.db('SsMS');
    const users = await db.collection('users').find({}).toArray();
    // const courses = await db.collection('courses').countDocuments();
    // const classes = await db.collection('classes').countDocuments();

    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalTeachers = users.filter(u => u.role === 'teacher').length;

    res.json({
        title: 'School Administration',
        kpis: [
            { label: 'Total Students', value: totalStudents },
            { label: 'Teachers', value: totalTeachers },
            { label: 'Courses', value: '15' }, // from DB
            { label: 'Classes', value: '21' }, // from DB
            { label: 'Performance', value: '82%' } // from DB
        ],
        sections: [
            // Admin-specific sections like user verification would go here
        ]
    });
    client.close();
});