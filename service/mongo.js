// getting-started.js
import mongoose from "mongoose";
export async function dbConnect() {
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  try {
    const conn = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
    console.log("database connected successfully!");
    return conn;
  } catch (error) {
    console.log(error);
  }
}

dbConnect();
