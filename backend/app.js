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
                if (result[0].password == req.body.password) {  }
            }
        }
    else {
        res.json({ message: "All fields required" });
    }
})