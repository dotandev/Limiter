import { FastifyReply as Response, FastifyRequest as Request } from 'fastify';
import { RateLimiter } from '../types';

export function fastifyMiddleware(rateLimiter: RateLimiter) {
  return async (request: Request, reply: Response, ): Promise<void> => {
    if (await rateLimiter.allowRequest()) {
      return;
    } else {
      reply.status(429).send('Too Many Requests');
    }
  };
}