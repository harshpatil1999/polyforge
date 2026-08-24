import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import router from "./routes/billing.route.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: "Hello from billing service!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Billing service running on port ${process.env.PORT}`);
  connectToDB();
});
