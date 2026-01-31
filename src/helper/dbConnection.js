import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/test") //mongoDB connection string for Compass
    .connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME }) //mongoDB connection string for Atlas

    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Err while connecting to DB", err));
};
export default connectDB;
