const store = new Map();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
function cleanupExpired(now) {
    for (const [key, entry] of store) {
        if (entry.resetAt <= now)
            store.delete(key);
    }
}
export default class RateLimitMiddleware {
    async handle({ request, response }, next) {
        const now = Date.now();
        cleanupExpired(now);
        const key = `${request.ip()}:${request.url()}`;
        const entry = store.get(key);
        if (!entry || entry.resetAt <= now) {
            store.set(key, { count: 1, resetAt: now + WINDOW_MS });
            await next();
            return;
        }
        if (entry.count >= MAX_REQUESTS) {
            const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
            return response.tooManyRequests({
                message: 'Too many requests. Please try again later.',
                retryAfter,
            });
        }
        entry.count += 1;
        await next();
    }
}
//# sourceMappingURL=rate_limit_middleware.js.map