import { RedisStore } from '../../src'

describe('RedisStore', () => {
  const store = new RedisStore('redis://localhost:6379');

  beforeAll(async () => {
    await store.set('test-key', 100);
  });

  afterAll(async () => {
    await store.delete('test-key');
  });

  it('should get a value from Redis', async () => {
    const value = await store.get('test-key');
    expect(value).toBe(100);
  });

  it('should set a value with TTL', async () => {
    await store.set('temp-key', 200, 1); // 1 second TTL
    const value = await store.get('temp-key');
    expect(value).toBe(200);
    setTimeout(async () => {
      const expiredValue = await store.get('temp-key');
      expect(expiredValue).toBeNull();
    }, 1500);
  });
});
