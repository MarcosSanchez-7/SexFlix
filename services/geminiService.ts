
import { GoogleGenAI } from "@google/genai";

export async function getMovieInsight(movieTitle: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a movie expert. Provide a unique, clever, and short (max 2 sentences) insight or "fun fact" for a movie fan about the film "${movieTitle}". Keep it engaging and professional.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
        maxOutputTokens: 100,
      }
    });

    return response.text?.trim() || "No AI insight available at this time.";
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Movie details are being updated with AI insights soon.";
  }
}
