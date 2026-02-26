const store = new Map();

export function checkRateLimit(key, limit = 20, windowMs = 60_000) {
  const now = Date.now();
  const item = store.get(key) || { count: 0, reset: now + windowMs };
  if (now > item.reset) {
    item.count = 0;
    item.reset = now + windowMs;
  }
  item.count += 1;
  store.set(key, item);
  return item.count <= limit;
}
