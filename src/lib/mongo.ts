import { Db, MongoClient } from "mongodb";

const DATABASE_URL = process.env.DATABASE_URL;
const MONGODB_DB = "Shrtn";

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDatabase() {
	// check the cached.
	if (cachedClient && cachedDb) {
		// load from cache
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}
    
	// check the MongoDB URI
	if (!DATABASE_URL) {
		throw new Error("Define the DATABASE_URL environmental variable");
	}
	// check the MongoDB DB
	if (!MONGODB_DB) {
		throw new Error("Define the MONGODB_DB environmental variable");
	}

	// Connect to cluster
	let client = new MongoClient(DATABASE_URL);
	await client.connect();
	let db = client.db(MONGODB_DB);

	// set cache
	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb,
	};
}
