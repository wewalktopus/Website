import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const noopLimit = async () => ({ success: true, limit: 0, remaining: 0, reset: Date.now() });

export const contactRateLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, '1 h') })
  : { limit: noopLimit };

export const newsletterRateLimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(1, '10 m') })
  : { limit: noopLimit };
