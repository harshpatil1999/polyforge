import { Annotation } from "@langchain/langgraph";

export const agentState = Annotation.Root({
  userId: Annotation(),
  conversationId: Annotation(),
  prompt: Annotation(),
  aiResponse: Annotation(),
  agent: Annotation(),
  searchResults: Annotation(),
  images: Annotation(),
  artifacts: Annotation(),
  file: Annotation(),
});
