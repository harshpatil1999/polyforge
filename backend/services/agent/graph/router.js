import { getModel } from "../config/llmModels.js";

export const router = async (state) => {
  const llm = await getModel("router");
  const prompt = ``;
  const response = await llm.invoke(prompt);
  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};
