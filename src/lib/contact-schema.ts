// Contact form rules, shared by the browser check and the server action.
// The messages are codes, not text: the form turns them into translated messages.
import { z } from "astro/zod";

// Length limits. The upper limits also block oversized requests, which protects Zod itself.
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MIN_MESSAGE = 10;
const MAX_MESSAGE = 5000;
const MAX_HONEYPOT = 200;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(MAX_NAME, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(MAX_EMAIL, "tooLong")
    .pipe(z.email("invalidEmail")),
  message: z
    .string()
    .trim()
    .min(1, "required")
    .min(MIN_MESSAGE, "tooShort")
    .max(MAX_MESSAGE, "tooLong"),
  // Honeypot: hidden from people, so only bots fill it in.
  website: z.string().max(MAX_HONEYPOT).optional(),
});
