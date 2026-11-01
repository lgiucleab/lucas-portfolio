// Sends a contact form message to Lucas's inbox through Resend.
import { CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL, RESEND_API_KEY } from "astro:env/server";
import { Resend } from "resend";

// The fields of a checked message.
interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

// Sends the email and throws if it could not be sent, so the form can show an error.
export async function sendContactEmail({ name, email, message }: ContactMessage): Promise<void> {
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) throw new Error("Resend is not configured.");

  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: `Portfolio <${CONTACT_FROM_EMAIL}>`,
    to: CONTACT_TO_EMAIL,
    // Pressing Reply in the inbox answers the visitor directly.
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    // Plain text only, so a visitor cannot add HTML to the email.
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) throw new Error(`Resend refused the email: ${error.name}`);
}
