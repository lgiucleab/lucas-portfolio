// Limits how often one visitor can send the contact form, using Upstash Redis.
// Serverless functions keep no memory between requests, so the counts must live in a database.
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "astro:env/server";

// Allowed messages per visitor in each time window.
const MAX_MESSAGES = 5;
const WINDOW = "1 h";

// Gives up on Upstash after this long, so a slow database cannot block the form.
const TIMEOUT_MS = 2000;

// Returns nothing until the Upstash settings exist.
function createLimiter() {
  if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return undefined;

  return new Ratelimit({
    redis: new Redis({ url: UPSTASH_REDIS_REST_URL, token: UPSTASH_REDIS_REST_TOKEN }),
    limiter: Ratelimit.slidingWindow(MAX_MESSAGES, WINDOW),
    prefix: "contact-form",
    timeout: TIMEOUT_MS,
  });
}

const limiter = createLimiter();

// Stores a fingerprint of the address, so no real IP address is ever saved in the database.
async function hashAddress(address: string): Promise<string> {
  const data = new TextEncoder().encode(address);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Answers whether this visitor has used up their messages.
// If Upstash fails, the message is allowed: losing a real message is worse than a little spam.
export async function isRateLimited(address: string): Promise<boolean> {
  if (!limiter) {
    console.warn("[contact] Upstash is not configured, so rate limiting is off.");
    return false;
  }

  try {
    const { success } = await limiter.limit(await hashAddress(address));
    return !success;
  } catch (error) {
    console.error("[contact] Rate limiting failed.", error);
    return false;
  }
}
