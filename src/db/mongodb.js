
const { MongoClient, ServerApiVersion } = require('mongodb');
const { config } = require('dotenv');
const { Person } = require('../models');

config();


const uri = process.env.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("cse341").command({ ping: 1 });
        db = await client.db("cse341");
        // console.log("Found", await client.db("cse341").collection("persons").find().toArray());
        // await client.db("cse341").collection("persons").insertOne(Person("John", "Doe", new Date("1990-01-01"), "M", "123 Main St", "Anytown", "CA", "12345"));
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}

async function getDb() {
    if (!db) {
        await run();
    }
    return db;
}

module.exports = {
    run, getDb
}
