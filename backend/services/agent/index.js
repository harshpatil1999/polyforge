import "dotenv/config";
import express from "express";
import connectToDB from "./config/db.js";
import router from "./routes/agent.routes.js";

const app = express();

app.use(express.json());

app.use("/", router);

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    return res.status(err.status).json(err.data);
  }
  return res.status(500).json({ message: `Agent error: ${err}` });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from agent service!" });
});

app.listen(process.env.PORT, () => {
  console.log(`Agent service running on port ${process.env.PORT}`);
  connectToDB();
});
