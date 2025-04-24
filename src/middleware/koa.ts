import { Middleware } from 'koa';
import { RateLimiter } from '../types';

export function koaMiddleware(rateLimiter: RateLimiter): Middleware {
  return async (ctx, next) => {
    if (await rateLimiter.allowRequest()) {
      await next();
    } else {
      ctx.status = 429;
      ctx.body = 'Too Many Requests';
    }
  };
}