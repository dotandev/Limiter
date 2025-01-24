import express, { Application, Request, Response } from 'express';
import request from 'supertest';
import { TokenBucket, expressMiddleware } from '../../src';

describe('Express Middleware', () => {
  let app: Application;

  beforeEach(() => {
    const bucket = new TokenBucket(5, 2);
    app = express();
    app.use(expressMiddleware(bucket));
    app.get('/', app);
  });

  it('should allow requests within the limit', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  it('should return 429 for requests exceeding the limit', async () => {
    for (let i = 0; i < 6; i++) {
      await request(app).get('/');
    }
    const response = await request(app).get('/');
    expect(response.status).toBe(429);
    expect(response.text).toBe('Too Many Requests');
  });
});
