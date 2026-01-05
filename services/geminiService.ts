
import { GoogleGenAI, Type } from "@google/genai";
import { ClockInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTimeInsight(timeOfDay: string, location?: string): Promise<ClockInsight> {
  const prompt = `Generate a profound, short (max 12 words) philosophical insight or mindful quote about time specifically for the ${timeOfDay} period. ${location ? `Consider that the user is in ${location}.` : ''} Categorize it as either motivation, reflection, productivity, or zen.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            author: { type: Type.STRING },
            category: { type: Type.STRING, enum: ['motivation', 'reflection', 'productivity', 'zen'] }
          },
          required: ['quote', 'category']
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    return result as ClockInsight;
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return {
      quote: "Time is the wisest counselor of all.",
      author: "Pericles",
      category: "reflection"
    };
  }
}
