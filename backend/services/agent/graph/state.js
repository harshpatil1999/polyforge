import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
  conversationId: Annotation(),
  prompt: Annotation(),
  aiResponse: Annotation(),
  agent: Annotation(),
  searchResults: Annotation(),
  images: Annotation(),
});
