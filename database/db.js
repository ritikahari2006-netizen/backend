//db.js is responsible for connecting Node.js to MongoDB.

const { MongoClient } = require("mongodb");

// const url = "mongodb://127.0.0.1:27017";
const url="mongodb://ritikahari2006_db_user:Password123@ac-klb0atn-shard-00-00.tbijyaw.mongodb.net:27017,ac-klb0atn-shard-00-01.tbijyaw.mongodb.net:27017,ac-klb0atn-shard-00-02.tbijyaw.mongodb.net:27017/?ssl=true&replicaSet=atlas-lb5xvb-shard-0&authSource=admin&appName=Cluster0"
const client = new MongoClient(url);

const dbName = "sample_mflix";

async function connectDB() {
    try {
        await client.connect();

        console.log("Mongodb connected successfully");

        const db = client.db(dbName);

        return db;

    } catch (error) {
        console.log("Mongodb connection Error:", error);
    }
}

module.exports = connectDB;