import { TavilySearch } from "@langchain/tavily";

export const searcTool = new TavilySearch({
  maxResults: 5,
  topic: "general",
  includeImages: true,
});
