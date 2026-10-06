import { MongoClient, Db } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db('lottery_db');
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getUsersCollection() {
  const { db } = await connectToDatabase();
  return db.collection('users');
}

export async function getLotteryCollection() {
  const { db } = await connectToDatabase();
  return db.collection('lottery_results');
}
