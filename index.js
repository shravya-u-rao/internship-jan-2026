import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./src/helper/dbConnection.js";
import router from "./routes.js";
dotenv.config({ quiet: true });
const PORT = process.env.PORT;
import cors from "cors";

import path from "path";
const __dirname = path.resolve();

app.use(cors()); //to allow cross origin requests
app.use(express.json()); //to allow json format data in request body
app.use(express.urlencoded({ extended: true })); //to allow urlencoded data in request body
app.use(express.static(path.join(__dirname, "public"))); //to serve static files from public folder
connectDB();
router(app);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
