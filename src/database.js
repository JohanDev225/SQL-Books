import { MongoClient } from "mongodb";

export async function connect() {
    try {
        const client = await MongoClient.connect("mongodb+srv://root:CQnmNTNfRtQb1SIG@cluster0.dxjqx.mongodb.net/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        const db = client.db("nodejs-restapi");
        console.log("Database is connected to:", db.databaseName);
        return db;
    } catch (e) {
        console.log(e);
    }
}