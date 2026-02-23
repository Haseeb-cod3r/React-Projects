import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const splitResponse = (fullText) => {
  const codeRegex = /```[\s\S]*?\n([\s\S]*?)\n```/g;
  const summaryRegex =
    /^[#\s]*Summary[#\s]*\n([\s\S]*?)(?=[#\s]*Fixed|[#\s]*Suggestions|$)/im;
  const fixedRegex = /^[#\s]*Fixed[#\s]*\n([\s\S]*?)(?=[#\s]*Suggestions|$)/im;
  const suggestionRegex = /^[#\s]*Suggestions[#\s]*\n([\s\S]*?)$/im;

  let matchCode;
  let codeBlocks = [];

  const summaryMatch = fullText.match(summaryRegex);
  const fixedMatch = fullText.match(fixedRegex);
  const suggestionMatch = fullText.match(suggestionRegex);

  while ((matchCode = codeRegex.exec(fullText)) !== null) {
    codeBlocks.push(matchCode[1]);
  }

  return {
    code: codeBlocks.join("\n\n"),
    summary: summaryMatch ? summaryMatch[1].trim() : "No summary provided.",
    fixed: fixedMatch ? fixedMatch[1].trim() : "No fixes identified.",
    suggestion: suggestionMatch
      ? suggestionMatch[1].trim()
      : "No extra suggestions.",
  };
};

export async function GroqServices(userCode, lang, framework, feature) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
          # ROLE
          You are a Senior Code Architect. You are reviewing code specifically for:
          - Language: ${lang}
          - Framework: ${framework}
          - Requested Action: ${feature}

          # STRICT GUARDRAILS
          1. VALIDATION: First, check if the provided code is actually ${lang} and uses ${framework}. 
             - If it does NOT match, ignore all other instructions and say exactly: "This is not React code. Please provide code matching your selection." 
          2. DEBUGGING MODE: If the feature is "Debugging":
             - Only fix actual bugs. 
             - If no bugs exist, say: "No bugs found. The code is logically sound. However, I have provided some optimizations below."
          3. FEATURE FOCUS: Tailor all feedback specifically to the ${feature} request.

         # OUTPUT STRUCTURE
          [Provide the full corrected code in ONE markdown block using triple backticks with code there has to be no heading and Provide 3  paragraphs with these headings [Summery,Fixed,Suggestions] each paragraph length should be 4 lines]

          ###FEEDBACK_START###
           
          ###Summary###
          - A summary of code that is provided and what was the problem in that code.

          ###Fixed###
          - Whats the fix is what are the changes you have done to make the code good.

          ###Suggestions###
          - Specific senior-level suggestions.
        `,
      },
      {
        role: "user",
        content: userCode,
      },
    ],
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
  });

  const { code, summary, fixed, suggestion } = splitResponse(
    chatCompletion.choices[0]?.message?.content,
  );

  const obj = {
    code,
    summary,
    fixed,
    suggestion,
  };
  return obj;
}
