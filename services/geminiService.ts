import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

// Initialize Gemini Client
// NOTE: Process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuizQuestions = async (topic: string, difficulty: string = "Medium", count: number = 5): Promise<Question[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate ${count} ${difficulty}-level multiple-choice objective questions about "${topic}" for a student. 
      Includes a question text, 4 distinct options, the correct answer text (must match one option exactly), and a short explanation.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              text: { type: Type.STRING, description: "The question text" },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Array of 4 options"
              },
              correctAnswer: { type: Type.STRING, description: "The correct option text" },
              explanation: { type: Type.STRING, description: "Explanation of the answer" }
            },
            required: ["text", "options", "correctAnswer", "explanation"],
            propertyOrdering: ["text", "options", "correctAnswer", "explanation"]
          }
        },
        systemInstruction: "You are a strict educational quiz generator. Ensure options are factually correct and distinctive.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const questions = JSON.parse(text) as Question[];
    // Assign IDs locally to ensure unique keys just in case
    return questions.map((q, idx) => ({ ...q, id: Date.now() + idx }));

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz. Please try a different topic.");
  }
};