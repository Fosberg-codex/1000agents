import mongoose from "mongoose";

export const connectMongoDB = async () => {
  //process.env.MONGODB_URI
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};