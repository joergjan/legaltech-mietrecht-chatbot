import type { PageServerLoad, Actions } from "./$types.js";
import { message, superValidate } from "sveltekit-superforms";
import { provideUsername, askQuestion } from "./schema";
import { fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { ChatSession, genAI, model } from "$lib/server/gemini";

const chatSession = new ChatSession(genAI, model);
let history: Array<{ role: string; text: string }> = [];

export const load: PageServerLoad = async () => {
  return {
    provideUsername: await superValidate(zod(provideUsername)),
    askQuestion: await superValidate(zod(askQuestion)),
  };
};

export const actions: Actions = {
  provideUsername: async (event) => {
    const form = await superValidate(event, zod(provideUsername));

    history = [];

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const user = form.data.username;

    const text = await chatSession.initialize(user);

    history.push({ role: "model", text });

    return message(form, history);
  },
  askQuestion: async (event) => {
    const form = await superValidate(event, zod(askQuestion));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const msg = form.data.question;

    const text = await chatSession.additionalQuestion(msg);

    history.push({ role: "user", text: msg });
    history.push({ role: "model", text });

    return message(form, history);
  },
};
