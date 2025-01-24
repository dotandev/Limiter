import { InMemoryStore, TokenBucket, expressMiddleware } from '../../src'
import express from 'express';
import request from 'supertest';

describe('Full System Integration', () => {
  let app: express.Application;

  beforeAll(() => {
    const store = new InMemoryStore();
    const bucket = new TokenBucket(3, 1);
    app = express();
    app.use(expressMiddleware(bucket));
    app.get('/', app);
  });

  it('should allow requests within the limit', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });

  it('should deny requests beyond the limit and respect rate refills', async () => {
    for (let i = 0; i < 3; i++) {
      await request(app).get('/');
    }

    let response = await request(app).get('/');
    expect(response.status).toBe(429);

    // Wait for 1.5 seconds to allow token refill
    await new Promise((resolve) => setTimeout(resolve, 1500));

    response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
}
)
