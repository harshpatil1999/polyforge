import express from "express";
import { agentController } from "../controllers/agent.controllers.js";
import multer from "../config/multer.js";

const router = express.Router();

router.post("/chat", multer.single("file"), agentController);

export default router;
