import { getModel } from "../config/llmModels.js";

export const pptAgent = async (state) => {
  try {
    const llm = await getModel("ppt");
    const prompt = `You are a professional presentation designer.
    Return ONLY valid JSON.
    Follow this format:
    
    {
      "title": "",
      "subtitle": "",
      "slides": [
      {
       "title": "",
       "points": [
       "",
       "",
       "",
       ""
       ]
      }
    ]
}
    Follow these rules:

    - Generate exactly 6 content slides.
    - Each slide should have 4-6 concise bullet points.
    - No markdown.
    - No explanation.
    - No code blocks.
    - Return ONLY JSON.
    
    Topic:
    ${state.prompt}`;
    const res = await llm.invoke(prompt);
  } catch (error) {}
};
