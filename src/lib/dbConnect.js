import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.URI);
const dbName = process.env.DB_USER;

export const collections = {
  PRODUCTS: "products",
  USERS: "users"
};

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

export const dbConnect = (cName) => {
  return client.db(dbName).collection(cName);
};
