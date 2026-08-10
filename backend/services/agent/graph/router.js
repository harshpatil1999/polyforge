import { getModel } from "../config/llmModels.js";

export const router = async (state) => {
  if (state.agent && state.agent !== "auto") {
    return {
      ...state,
      agent: state.agent,
    };
  }
  const llm = await getModel("router");
  const prompt = `
  You are a router agent.

  These are the available AI agents :
  
  - chat
  - search
  - coding
  - pdf
  - ppt
  - image

  Rules :

  - Use the chat agent for general conversations, explanations, learnings and questions.
  - Use the search agent for getting information on current events, news, recent developments and for Internet lookup.
  - Use the coding agent for generating code, debugging code, building projects, architecture and API design.
  - Use the pdf agent for generating PDF files and providing context for uploaded PDF files.
  - Use the ppt agent for generating PPT files and providing context for uploaded PPT files.
  - Use the image agent for generating images.
  
  Return ONLY one word :

  chat 
  search
  coding
  pdf
  ppt
  image

  User Query: 
  ${state.prompt}
  `;

  const response = await llm.invoke(prompt);
  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};
