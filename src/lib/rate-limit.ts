const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max = 5, windowMs = 60_000) {
  const now = Date.now();
  const value = hits.get(key);
  if (!value || value.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (value.count >= max) return false;
  value.count += 1;
  return true;
}
