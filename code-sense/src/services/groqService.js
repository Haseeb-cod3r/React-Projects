import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});


export const splitResponse = (fullText) => {
  try {
      console.log(fullText);
    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return {
        error: "Invalid AI response format.",
      };
    }
console.log(JSON.parse(jsonMatch[0]));
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    return {
      error: true,
    };
  }
};

export async function GroqServices(userCode, lang, framework, feature) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are CodeSense AI — a Senior Software Architect.

You MUST follow these rules strictly:

------------------------------------------------
1️⃣ LANGUAGE & FRAMEWORK VALIDATION
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
2️⃣ FEATURE MODE
------------------------------------------------
Feature selected: ${feature}

Respond differently depending on feature:

- If Debug:
   • Identify real bugs only
   • Fix them
   • If no bugs:
     return:
     {
       "status": "success",
       "message": "No bugs found. The code is logically correct.",
       "improvements": []
     }

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
3️⃣ RESPONSE FORMAT (STRICT)
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

  const parsed = splitResponse(
    chatCompletion.choices[0]?.message?.content || "",
  );

  return parsed;
}
