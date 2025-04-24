


import { RateLimiter } from '../types';

export class LeakyBucket implements RateLimiter {
  private capacity: number;
  private leakRate: number;
  private waterLevel: number;
  private lastLeak: number;

  constructor(capacity: number, leakRate: number) {
    this.capacity = capacity;
    this.leakRate = leakRate;
    this.waterLevel = 0;
    this.lastLeak = Date.now();
  }

  private leakWater(): void {
    const now = Date.now();
    const elapsed = (now - this.lastLeak) / 1000;
    this.waterLevel = Math.max(0, this.waterLevel - elapsed * this.leakRate);
    this.lastLeak = now;
  }

  public loadState(state: number): void {
    this.waterLevel = state;
  }

  public getState(): number {
    return this.waterLevel;
  }

  public async allowRequest(): Promise<boolean> {
    this.leakWater();
    if (this.waterLevel < this.capacity) {
      this.waterLevel += 1;
      return true;
    }
    return false;
  }

}
