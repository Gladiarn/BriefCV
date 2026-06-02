import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { aiConfig } from "@/lib/ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(aiConfig.apiKey || "");

export async function POST(req: Request) {
  try {
    const { essay, cvDocument } = await req.json();

    if (!essay || !cvDocument) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({
      model: aiConfig.model || "gemini-1.5-flash",
    });

    const prompt = `
      You are an expert CV professional. I will provide you with a user's professional "essay" or introduction, and the current state of their CV document's sections.
      Your task is to extract relevant information from the essay and map it to the appropriate sections in the CV document.
      
      User Essay:
      """
      ${essay}
      """
      
      Current CV Sections:
      ${JSON.stringify(cvDocument.sections, null, 2)}
      
      Instructions:
      1. Analyze the essay for professional details, skills, experience, and education.
      2. Identify which sections in the current CV document should be updated.
      3. For each section you update, provide the COMPLETE new content for that section.
      4. For the "header" section, populate "fullName", "jobTitle", and "contacts". 
         Contacts should be an array of { id, type, label, value }.
         Valid types are: "email", "phone", "location", "link", "custom".
         Use sensible IDs like "email", "phone", etc.
      5. For "experience" and "education", populate an array of items following their respective schemas.
      6. For "skills", provide an array of strings.
      7. Return ONLY a JSON object where keys are section IDs and values are the new "content" object for those sections.
      8. If no relevant information is found for a section, do not include it in the output.
      9. Be concise, professional, and ensure the JSON is valid.
      
      Example output format:
      {
        "header-1": {
          "fullName": "John Doe",
          "jobTitle": "Software Engineer",
          "contacts": [{ "id": "email", "type": "email", "label": "Email", "value": "john@example.com" }]
        },
        "skills-1": ["React", "TypeScript"]
      }
    `;

    // Simple retry mechanism
    let result: any;
    let retries = 3;
    while (retries > 0) {
      try {
        result = await model.generateContent(prompt);
        break;
      } catch (error: any) {
        if (error.status === 429 && retries > 1) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          retries--;
        } else {
          throw error;
        }
      }
    }
    const response = await result.response;
    const text = response.text();
    console.log("AI Response Text:", text);

    // Parse the AI response as JSON
    let updatedFields: Record<string, any>;
    try {
      updatedFields = JSON.parse(text);
    } catch (_e) {
      // Handle cases where AI might return markdown or non-JSON despite instructions
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        updatedFields = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response as JSON");
      }
    }

    return NextResponse.json({ updatedFields });
  } catch (error) {
    console.error("AI Populate Error:", error);
    return NextResponse.json(
      { error: "Failed to populate CV via AI" },
      { status: 500 },
    );
  }
}
