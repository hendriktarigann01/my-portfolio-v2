import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "@/data/chat-knowledge";

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_gemini_api_key_here") {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: SYSTEM_PROMPT,
    });

    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? ("user" as const) : ("model" as const),
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1];

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT")), 10000),
    );

    const result = await Promise.race([
      chat.sendMessage(lastMessage.content),
      timeoutPromise,
    ]);

    return Response.json({ message: result.response.text() });
  } catch (error) {
    let errorMsg = "Maaf, terjadi kendala teknis. Silakan coba sesaat lagi.";

    if (error instanceof Error) {
      if (error.message.includes("503") || error.message === "TIMEOUT") {
        errorMsg = "Layanan Google AI saat ini sedang mengalami lonjakan antrean. Mohon tunggu sejenak dan coba lagi.";
      } else if (error.message.includes("429")) {
        errorMsg = "Batas permintaan tercapai (Rate Limit). Coba kembali dalam 1 menit.";
      }
    }

    return Response.json({ error: errorMsg }, { status: 503 });
  }
}
