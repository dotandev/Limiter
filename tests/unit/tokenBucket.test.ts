import { TokenBucket } from "../../src";


describe('TokenBucket', () => {
  it('should allow requests within the limit', () => {
    const bucket = new TokenBucket(10, 5); // Capacity: 10, Refill rate: 5 tokens/sec
    expect(bucket.allowRequest()).toBe(true);
  });

  it('should deny requests when tokens are exhausted', () => {
    const bucket = new TokenBucket(1, 1); // Capacity: 1, Refill rate: 1 token/sec
    bucket.allowRequest();
    expect(bucket.allowRequest()).toBe(false);
  });

  it('should refill tokens over time', (done) => {
    const bucket = new TokenBucket(2, 1); // Capacity: 2, Refill rate: 1 token/sec
    bucket.allowRequest();
    setTimeout(() => {
      expect(bucket.allowRequest()).toBe(true);
      done();
    }, 1000);
  });
});
