import express from "express";
import {
  createConversation,
  getConversations,
  getMessages,
  saveMessage,
  updateConversation,
} from "../controllers/chat.controllers.js";

const router = express.Router();

router.get("/createConversation", createConversation);
router.post("/updateConversation", updateConversation);
router.get("/getConversations", getConversations);
router.post("/saveMessage", saveMessage);
router.get("/getMessages/:conversationId", getMessages);

export default router;
