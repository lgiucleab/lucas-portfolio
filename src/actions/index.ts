// Astro Actions: typed server functions. This is the only code that runs on the server.
import { ActionError, defineAction } from "astro:actions";

import { contactSchema } from "@/lib/contact-schema";
import { isRateLimited } from "@/lib/rate-limit";
import { sendContactEmail } from "@/lib/send-contact-email";

export const server = {
  contact: defineAction({
    // Receives the browser's FormData and checks it against the shared rules.
    accept: "form",
    input: contactSchema,
    handler: async ({ name, email, message, website }, context) => {
      // A filled honeypot means a bot. Reporting success gives it no reason to try again.
      if (website) return { sent: true };

      if (await isRateLimited(context.clientAddress)) {
        throw new ActionError({ code: "TOO_MANY_REQUESTS" });
      }

      try {
        await sendContactEmail({ name, email, message });
      } catch (error) {
        // The details go to the server log, and never to the visitor.
        console.error("[contact] The email could not be sent.", error);
        throw new ActionError({ code: "INTERNAL_SERVER_ERROR" });
      }

      return { sent: true };
    },
  }),
};
