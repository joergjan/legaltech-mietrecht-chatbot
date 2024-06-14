import { z } from "zod";

export const provideUsername = z.object({
  username: z.string().min(2).max(50),
});

export const askQuestion = z.object({
  question: z.string().min(2).max(50),
});

export type FormSchema = typeof provideUsername | typeof askQuestion;
