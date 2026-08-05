import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

export const agentController = async (req, res) => {
  try {
    const { conversationId, prompt } = req.body;
    await addMessage(conversationId, "user", prompt);
    await axios.post(`${process.env.CHAT_SERVICE}/saveMessage`, {
      conversationId,
      role: "user",
      content: prompt,
    });
    const result = await graph.invoke({
      conversationId,
      prompt,
    });
    const response = result.aiResponse;
    await addMessage(conversationId, "assistant", response);
    await axios.post(`${process.env.CHAT_SERVICE}/saveMessage`, {
      conversationId,
      role: "assistant",
      content: response,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
