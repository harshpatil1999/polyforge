import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";
import redis from "../../../shared/redis/redis.js";

export const agentController = async (req, res) => {
  try {
    const { conversationId, prompt, agent } = req.body;
    // await redis.del(`messages-${conversationId}`);
    await axios.post(`${process.env.CHAT_SERVICE}/saveMessage`, {
      conversationId,
      role: "user",
      content: prompt,
    });
    const result = await graph.invoke({
      conversationId,
      prompt,
      agent,
    });
    const response = result.aiResponse;
    await addMessage(conversationId, "user", prompt);
    await addMessage(conversationId, "assistant", response);
    await axios.post(`${process.env.CHAT_SERVICE}/saveMessage`, {
      conversationId,
      role: "assistant",
      content: response,
      images: result.images,
    });
    return res.status(200).json({ answer: response, images: result.images });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
