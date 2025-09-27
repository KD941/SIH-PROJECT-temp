const libExpress = require('express');
const libCors = require('cors');
const libRandom = require('randomstring');
const bcrypt = require('bcrypt');
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
    const { name, password, phone } = req.body;
    const { id, role } = req.user;

    const updateFields = {};

    // Students can only update their name and password
    if (role === 'student') {
        if (name) updateFields.name = name;
        if (password) updateFields.password = password;
    } else { // Teachers and Admins have more permissions
        if (name) updateFields.name = name;
        if (password) updateFields.password = password;
        if (phone) updateFields.phone = phone;
    }

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No valid fields to update." });
    }

    try {
        await client.connect();
        const db = await client.db('SsMS');
        const collection = await db.collection('users');

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "Profile updated successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server error while updating profile." });
    } finally {
        client.close();
    }
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
                items: [
                    { name: 'Equation Master', type: 'game', cta: 'PLAY', points: 'Graphing', path: '/game/equation-master' },
                    { name: 'Formula Founders', type: 'game', cta: 'PLAY', points: 'Chemistry', path: '/game/formula-founders' },
                    { name: 'Algebra Basics', type: 'math', status: 'Completed', points: '+50', path: '/course/algebra' },
                    { name: 'Intro to Physics', type: 'science', cta: 'CONTINUE', points: 'Course', path: '/course/physics' },
                ]
            }
        ]
    });
});

const getTodaysDateString = () => new Date().toISOString().split('T')[0];

server.post('/ai/chat', verifyToken, async (req, res) => {
    const { message, context } = req.body;
    const userId = req.user.id;

    let responseMessage = "I'm here to help with your studies! Ask me for a hint or about a concept.";

    // Simple keyword-based AI logic
    const lowerCaseMessage = message.toLowerCase();

    try {
        await client.connect();
        const db = await client.db('SsMS');
        const usersCollection = await db.collection('users');
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Daily answer limit logic
        const today = getTodaysDateString();
        let dailyAnswers = user.dailyAnswers || 0;
        if (user.lastAnswerDate !== today) {
            dailyAnswers = 0;
        }

        if (lowerCaseMessage.includes('hint')) {
            if (context.game === 'equation-master') {
                responseMessage = "Try using 'x' as your variable. For a curve, you can try something like 'x*x' or 'x*x*x'. For a straight line, try '2*x + 5'.";
            } else if (context.game === 'formula-founders') {
                responseMessage = "Remember, the number of atoms for each element must be the same on both the reactant and product sides of the equation!";
            } else {
                responseMessage = "I can give hints for the game you are currently playing. Start a game first!";
            }
        } else if (lowerCaseMessage.includes('answer')) {
            if (dailyAnswers < 5) {
                responseMessage = "I can give you an answer, but try to solve it yourself first! The answer is [Correct Answer]. You have used " + (dailyAnswers + 1) + " of 5 answers for today.";
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $set: { lastAnswerDate: today, dailyAnswers: dailyAnswers + 1 } }
                );
            } else {
                responseMessage = "Sorry, you have already used all 5 of your answers for today. Try again tomorrow!";
            }
        } else if (context.game === 'equation-master' || lowerCaseMessage.includes('equation') || lowerCaseMessage.includes('graph')) {
            responseMessage = "Equation Master helps you visualize math! An equation like 'y = x' is a straight line because for every step you take on the x-axis, you take one step up on the y-axis.";
        } else if (context.game === 'formula-founders' || lowerCaseMessage.includes('formula') || lowerCaseMessage.includes('chemistry')) {
            responseMessage = "Formula Founders is about balancing chemical equations. For water (H₂O), you need two Hydrogen atoms and one Oxygen atom. So, to make two molecules of water, you'd need four Hydrogen atoms and two Oxygen atoms in total.";
        } else {
            responseMessage = "I can only help with topics related to STEM subjects and the games on this platform. How can I assist you with your learning?";
        }

        res.json({ reply: responseMessage });

    } catch (error) {
        console.error("AI chat error:", error);
        res.status(500).json({ reply: "I seem to be having some trouble thinking right now. Please try again later." });
    } finally {
        if (client) {
            // This check is to prevent closing a client that might already be closed.
            // A better pattern is to manage one single connection for the app's lifetime.
            // await client.close();
        }
    }
});

server.post('/user/sync-progress', verifyToken, async (req, res) => {
    const { progressData } = req.body;
    const userId = req.user.id;

    if (!progressData || !Array.isArray(progressData)) {
        return res.status(400).json({ message: 'Invalid progress data' });
    }

    console.log(`Syncing ${progressData.length} progress records for user ${userId}`);
    // TODO: Here you would process each record
    // 1. Save the raw progress to a 'progress' collection in MongoDB.
    // 2. (Optional) Call a separate Python service for complex evaluation.
    //    e.g., await axios.post('http://python-eval-service/evaluate', { userId, progressData });
    // 3. Update user's overall stats (points, badges, etc.) in the 'users' collection.

    res.json({ message: 'Sync successful' });
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