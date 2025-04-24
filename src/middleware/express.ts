import { NextFunction, Request, Response } from 'express';
import { RateLimiter } from '../types';

export const expressMiddleware = async (rateLimiter: RateLimiter) => {
  return async (request: Request, reply: Response, next: NextFunction): Promise<void> => {
    if (await rateLimiter.allowRequest()) {
      next();
    } else {
      reply.status(429).send('Too Many Requests');
    }
  };
};
