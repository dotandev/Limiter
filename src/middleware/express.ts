// import { Request, Response, NextFunction } from 'express';
// import { RateLimiter } from '../types';

// export function expressMiddleware(rateLimiter: RateLimiter) {
//   return (req: unknown, res: unknown, next: NextFunction): void => {
//     const request = req as Request;
//     const response = res as Response;

//     if (rateLimiter.allowRequest()) {
//       next();
//     } else {
//       response.status(429).send('Too Many Requests');
//     }
//   };
// }


import { RequestHandler } from 'express';
import { RateLimiter } from '../types';
export const expressMiddleware = (rateLimiter: RateLimiter): RequestHandler => {
  return (req, res, next) => {
    if (rateLimiter.allowRequest()) {
      next();
    } else {
      res.status(429).send('Too Many Requests');
    }
  };
};
