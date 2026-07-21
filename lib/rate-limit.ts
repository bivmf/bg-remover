type Entry = { count: number; resetAt: number };

const entries = new Map<string, Entry>();

export type RateLimitResult = { allowed: true; remaining: number } | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(key: string, limit = 10, windowMs = 15 * 60 * 1000): RateLimitResult {
  const now = Date.now();
  const current = entries.get(key);
  if (!current || current.resetAt <= now) { entries.set(key, { count: 1, resetAt: now + windowMs }); return { allowed: true, remaining: limit - 1 }; }
  if (current.count >= limit) return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  current.count += 1;
  return { allowed: true, remaining: limit - current.count };
}

// Replace this in-memory adapter with a shared store (for example Upstash)
// when strict rate limits must span every serverless instance.
