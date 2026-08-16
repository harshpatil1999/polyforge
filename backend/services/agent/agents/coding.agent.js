import { getModel } from "../config/llmModels.js";

export const codingAgent = async (state) => {
  const intentLLM = await getModel("intent");
  const llm = await getModel("coding");
  const intentResponse = await intentLLM.invoke(`
    You are an intent classifier.
    Return ONLY one of the following values:

    CODE_GENERATION
    CODE_REVIEW
    CODE_EXPLANATION
    DEBUGGING
    OPTIMIZATION
    CONVERSION
    DOCUMENTATION

    User Request:
    ${state.prompt}
`);
  const intent = intentResponse.content;
  console.log(intent);
  if (intent == "CODE_GENERATION") {
    const prompt = `
    You are PolyForge coding agent.
    Generate the requested project.
    Default stack:
    - HTML
    - CSS
    - JavaScript

    Use React/NextJS/Vue ONLY if explicitly requested.
    
    The generated project should have the following:
    
    - Responsive
    - Modern UI
    - CSS variables
    - Flexbox/Grid
    - Smooth scroll
    - Hover effects
    - Beautiful spacing
    - Single page unless requested otherwise

    Return ONLY valid JSON.

    The schema should look like this:

    {
      "files": [
        {
           "name": "index.html",
           "content": "..."
        },
        {
           "name": "style.css",
           "content": "..."
        },
        {
           "name": "script.js",
           "content": "..."
        }     
      ]
    }
    
    Follow these rules:
    
    - The output must start with {
    - The output must end with }
    - No markdown
    - No explanation
    - No extra text
    - No \`\`\`
    - Never mention intent
    
    User Request:
    ${state.prompt}`;
    const res = await llm.invoke(prompt);
    console.log(JSON.parse(res.content));
    const data = JSON.parse(res.content);
    return {
      ...state,
      aiResponse: "Code generated successfully...",
      artifacts: [
        {
          id: Date.now(),
          type: "Project",
          files: data.files || [],
          title: state.prompt,
        },
      ],
    };
  }
  const res = await llm.invoke(`
    The user's request is:
    ${intent}
    
    Return Markdown only.
    Never generate project files.
    Use headings like:
    
    # Overview

    ## Explanation

    ## Problems

    ## Improvements

    ## Best Practices

    ## Optimized code (if needed)

    User Request:
    ${state.prompt}`);
  const data = res.content;
  return {
    ...state,
    aiResponse: data,
    artifacts: [],
  };
};
