import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./src/helper/dbConnection.js";
import router from "./routes.js";
dotenv.config({ quiet: true });
const PORT = process.env.PORT;


app.use(express.json());//to allow json format data in request body
app.use(express.urlencoded({ extended: true })); //to allow urlencoded data in request body

connectDB();
router(app);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
