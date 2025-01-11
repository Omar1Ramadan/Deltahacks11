const { connectToMongoDB } = require("./db/connection.js")
const { ObjectId } = require("mongodb")
const dotenv = require('dotenv')
const express = require('express');

const app = express();
const port = 3000;

const router = express.Router()

let db

dotenv.config({ path: './data/config.env' })

connectToMongoDB().then( (database) => {
    db = database
    app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
    })
}).catch( (err) => {
    console.error("Failed to connect to MongoDB. Server not started:", err)
})