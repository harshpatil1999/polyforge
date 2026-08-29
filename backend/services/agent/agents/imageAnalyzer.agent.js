import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModels.js";
import fs from "fs";
import { deductCredits } from "../utils/deductCredits.js";

export const imageAnalyzerAgent = async (state) => {
  try {
    const llm = await getModel("imageAnalyzer");
    const imageBuffer = await fs.readFile(state.file.path);
    const base64image = imageBuffer.toString("base64");
    const messages = [
      new SystemMessage(`You are a PolyForge image analyzer agent.
        
        Follow these rules:
        
        - Analyze only the uploaded image.
        - Answer the user's question accurately.
        - If any text exists in the image, extract it.
        - If any charts or tables exist, explain them.
        - If something is unclear, say so.
        - Use Markdown whenever required.
        - Do not hallucinate.`),
      new HumanMessage({
        content: [
          {
            type: "text",
            text: state.prompt || "Analyze the image",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${state.file.mimetype};base64,${base64image}`,
            },
          },
        ],
      }),
    ];
    const response = await llm.invoke(messages);
    await deductCredits(state.userId, "image");
    return {
      ...state,
      aiResponse: response.content,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      aiResponse: "❌ Failed to analyze the image.",
    };
  } finally {
    fs.unlink(state.file.path);
  }
};
