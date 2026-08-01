import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from agent service!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Agent service running on port ${process.env.PORT}`);
  connectToDB();
});
