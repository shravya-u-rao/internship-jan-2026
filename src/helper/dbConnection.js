import mongoose from "mongoose";

const connectDB = async () => {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/test") //mongoDB connection string for Compass
    .connect(
      "mongodb+srv://shravyaUser:lI23kizBe5NmzYza@cluster0.bt3nziq.mongodb.net/?appName=Cluster0",
      { dbName: "internship-jan-2026" },
    ) //mongoDB connection string for Atlas

    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Err while connecting to DB", err));
};
export default connectDB;
