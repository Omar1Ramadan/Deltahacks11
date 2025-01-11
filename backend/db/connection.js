const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv")

dotenv.config({ path: './data/.env' })

const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db("DeltaHacks"); // Create or connect to the "Deltahacks" database
    console.log("Successfully connected to MongoDB!");
    return db
    
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
}

module.exports = { db, connectToMongoDB };