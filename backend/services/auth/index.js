import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from auth service!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Auth service running on port ${process.env.PORT}`);
  connectToDB();
});
