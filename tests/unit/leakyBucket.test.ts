import { LeakyBucket } from '../../src'

describe('LeakyBucket', () => {
  it('should allow requests if under capacity', () => {
    const bucket = new LeakyBucket(10, 2); // Capacity: 10, Leak rate: 2/sec
    expect(bucket.allowRequest()).toBe(true);
  });

  it('should deny requests if over capacity', () => {
    const bucket = new LeakyBucket(1, 1); // Capacity: 1, Leak rate: 1/sec
    bucket.allowRequest();
    expect(bucket.allowRequest()).toBe(false);
  });

  it('should leak water over time', (done) => {
    const bucket = new LeakyBucket(2, 1); // Capacity: 2, Leak rate: 1/sec
    bucket.allowRequest();
    setTimeout(() => {
      expect(bucket.allowRequest()).toBe(true);
      done();
    }, 1000);
  });
});
