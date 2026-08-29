import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../config/vectorDb.js";
import { getModel } from "../config/llmModels.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfRagAgent = async (state) => {
  try {
    const buffer = fs.readFileSync(state.file.path);
    const pdf = new PDFParse({
      data: buffer,
    });
    const result = pdf.getText();
    const text = result.text;
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.createDocuments([text]);
    const collectionName = `pdf-${Date.now()}`;
    const store = await vectorStore(docs, collectionName);
    const relevantDocuments = await store.similaritySearch(state.prompt, 5);
    const context = relevantDocuments.map((d) => d.pageContent).join("/n/n");
    const llm = await getModel("pdfRag");
    const messages = [
      new SystemMessage(`You are a PolyForge PDF assistant.
            Follow these rules:
            
            - Answer ONLY from the uploaded PDF file.
            - Never make up any information.
            - If the answer is not present in the PDF, reply: "I could not find this information in the uploaded PDF file."
            - Use Markdown formatting.`),
      new HumanMessage(`
            Context: ${context}
            Question: ${state.prompt}`),
    ];
    const response = await llm.invoke(messages);
    await deductCredits(state.userId, "pdf");
    return {
      ...state,
      aiResponse: response.content,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      aiResponse: "❌ Failed to analyze the PDF file.",
    };
  } finally {
    fs.unlinkSync(state.file.path);
  }
};
