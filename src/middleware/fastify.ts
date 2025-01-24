import { FastifyReply, FastifyRequest } from 'fastify';
import { RateLimiter } from '../types';

export function fastifyMiddleware(rateLimiter: RateLimiter) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    if (rateLimiter.allowRequest()) {
      return;
    } else {
      reply.status(429).send('Too Many Requests');
    }
  };
}