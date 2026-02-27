import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  generationConfig: {
    temperature: 0,
    responseMimeType: "application/json",
  },
});

export const validationStructure = (obj) => {
  console.log(obj);

  if (!["success", "mismatch"].includes(obj?.status)) return false;

  if (obj.status === "success") {
    if (typeof obj.correctedCode !== "string") return false;
    if (!obj.feedback) return false;
    if (typeof obj.feedback.overview !== "string") return false;
  }

  if (obj.status === "mismatch") {
    if (typeof obj.message !== "string") return false;
  }

  return true;
};

export async function GeminiService(userCode, lang, framework, feature) {
  const prompt = `
You are CodeSense AI a Senior Software Architect.

You MUST follow these rules strictly:

------------------------------------------------
1 LANGUAGE & FRAMEWORK VALIDATION
------------------------------------------------
- Check if the provided code matches:
  Language: ${lang}
  Framework: ${framework}

- If ${lang} and ${framework} NOT matching with the provided code, return ONLY this JSON:
{
  "status": "mismatch",
  "message": "The provided code does not match the selected ${lang} / ${framework}. Please correct your selection."
}

Stop immediately if mismatch.

------------------------------------------------
2 FEATURE MODE
------------------------------------------------
Feature selected: ${feature}

Respond differently depending on feature:

- If Debug:
   • Identify real bugs only
   • Fix them

- If Optimize:
   • Improve performance
   • Improve memory usage
   • Improve structure
   • Explain optimizations clearly

- If Review:
   • Analyze architecture
   • Code quality
   • Best practices
   • Security issues
   • Scalability

------------------------------------------------
3 RESPONSE FORMAT (STRICT)
------------------------------------------------

Always return ONLY valid JSON.
No markdown.
No headings.
No explanation outside JSON.

Success format:

{
  "status": "success",
  "correctedCode": "FULL corrected code here as string",
  "feedback": {
      "overview": "Natural explanation like ChatGPT",
      "issuesFound": ["Issue 1", "Issue 2"],
      "improvements": ["Improvement 1", "Improvement 2"],
      "seniorAdvice": "High-level architectural advice"
  }
}

User Code:
${userCode}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  let parsed;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON from Gemini");
  }

  if (!validationStructure(parsed)) {
    throw new Error("Invalid structure");
  }

  return parsed;
}
