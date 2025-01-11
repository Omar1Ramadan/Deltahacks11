const { connectToMongoDB } = require("./db/connection.js")
const { ObjectId } = require("mongodb")
const dotenv = require('dotenv')
const express = require('express');

const app = express();
const port = 3000;

// Add this middleware to parse JSON bodies
app.use(express.json());

const router = express.Router()


dotenv.config({ path: './data/.env' })

connectToMongoDB().then( (database) => {
    db = database
    app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
    app.post('/addUser', async (req, res) => {
        try {
            const user = req.body;
            const result = await db.collection('users').insertOne(user);
            res.status(201).send(result);
        } catch (error) {
            console.error("Error adding user:", error); // Log the error for debugging
            res.status(500).send({ error: 'Failed to add user' });
        }
    });
    })
}).catch( (err) => {
    console.error("Failed to connect to MongoDB. Server not started:", err)
})
app.get('/', (req, res) => {
    res.send('Hello, World!');
});