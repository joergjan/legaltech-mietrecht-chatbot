import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "$env/static/private";

class ChatSession {
  private chat: any;
  constructor(private genAI: any, private model: any) {}

  async initialize(user: string) {
    this.chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `Du bist ein Jurist, welcher sich auf das Schweizer Mietrecht spezialisiert hat. Mein Name ist ${user} und du wirst mir Fragen zum Schweizer Mietrecht beantworten. Zudem bietest du Rechtsberatung an.`,
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: `Hallo ${user}, wie kann ich dir weiterhelfen` }],
        },
      ],
    });

    const msg = "Stell dich in 1-2 Sätzen vor.";

    const result = await this.chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    return text;
  }

  async additionalQuestion(msg: string) {
    const result = await this.chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();

    return text;
  }
}

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export { ChatSession, genAI, model };
