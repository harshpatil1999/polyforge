import { getModel } from "../config/llmModels.js";
import { generatePdf } from "../utils/generatePdf.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfAgent = async (state) => {
  try {
    const llm = await getModel("pdf");
    const prompt = `
    You are an expert document writer.
    Return ONLY valid JSON.
    Do NOT return any markdown.
    Do NOT return explanations.
    
    Follow this structure:
    
    {
      "title": "",
      "subtitle": "",
      "sections": [
      {
       "heading": "",
       "points": []
      }
      ]
    }
      
    Generate 4-8 sections.
    Each section should have 3-6 concise bullet points.
    
    Topic: 
    ${state.prompt}
    `;

    const res = await llm.invoke(prompt);
    const data = JSON.parse(res.content);
    await deductCredits(state.userId, "pdf");
    const pdfBuffer = await generatePdf(data);
    const fileName = `pdf-${Date.now()}.pdf`;
    await uploadToS3(fileName, pdfBuffer, "application/pdf");
    const downloadUrl = await getFromS3(fileName, 24 * 60);
    return {
      ...state,
      aiResponse: `# PDF Generated Successfully
**${data.title}**
⬇️ [Download PDF](${downloadUrl})
_Link expires in 10 minutes._`,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: `❌ Failed to generate PDF.`,
    };
  }
};
