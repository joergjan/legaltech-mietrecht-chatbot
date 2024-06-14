import type { PageServerLoad, Actions } from "./$types.js";
import { message, superValidate } from "sveltekit-superforms";
import { provideUsername, askQuestion } from "./schema";
import { fail } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { chatSession } from "$lib/server/gemini";

export const load: PageServerLoad = async () => {
  return {
    provideUsername: await superValidate(zod(provideUsername)),
    askQuestion: await superValidate(zod(askQuestion)),
  };
};

export const actions: Actions = {
  provideUsername: async (event) => {
    const form = await superValidate(event, zod(provideUsername));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    const user = form.data.username;

    const text = await chatSession.initialize(user);

    const history = chatSession.getChatHistory();

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

    const history = chatSession.getChatHistory();

    console.log(history);

    return message(form, history);
  },
  restartChat: async () => {
    await chatSession.reset();

    return {
      redirect: "/",
    };
  },
};
