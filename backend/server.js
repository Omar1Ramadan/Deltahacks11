const { connectToMongoDB } = require("./db/connection.js");
const dotenv = require('dotenv');
const express = require('express');

// routes for db
const usersRoute = require('./routes/users'); // Correctly import the users route
const chatsRoute = require('./routes/chats'); // Import the chats route
const creditRoute = require('./routes/credit.js') // import the credit route

const app = express();
const port = 3000;

// Add this middleware to parse JSON bodies
app.use(express.json());

dotenv.config({ path: './data/.env' });

connectToMongoDB().then((database) => {
  db = database;
  app.use('/users', usersRoute(db)); // Use the users route
  app.use('/chats', chatsRoute(db)); // Use the chats route
  app.use('/credit', creditRoute(db)); // use the credit route

  app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });
}).catch((err) => {
  console.error("Failed to connect to MongoDB. Server not started:", err);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});