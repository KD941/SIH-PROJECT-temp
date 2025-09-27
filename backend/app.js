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

// TODO: Add a middleware for token verification

server.get('/student/dashboard', async (req, res) => {
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

server.get('/teacher/dashboard', async (req, res) => {
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

server.get('/admin/dashboard', async (req, res) => {
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