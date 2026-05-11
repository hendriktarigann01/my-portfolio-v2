// Tujuan      : API Route Handler untuk chatbot AI portfolio
// Caller      : src/components/ChatWidget.tsx (client-side fetch)
// Dependensi  : @google/generative-ai, src/data/chat-knowledge.ts
// Main Exports: POST handler
// Side Effects: HTTP call ke Google Gemini API

import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/data/chat-knowledge";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "Messages are required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({
     model: "gemini-flash-latest",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert message history to Gemini format
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "user" as const : "model" as const,
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const responseText = result.response.text();

    return Response.json({ message: responseText });
  } catch (error) {
    console.error("Chat API error:", error);

    // Extract a more helpful error message if possible
    let errorMsg = "Failed to generate response. Please try again.";
    if (error instanceof Error) {
      if (error.message.includes("429")) {
        errorMsg = "Wah, AI-nya lagi kepenuhan request dari Google (Rate Limit 429). Coba tunggu 1 menit lagi ya!";
      } else {
        errorMsg = `API Error: ${error.message}`;
      }
    }

    return Response.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
