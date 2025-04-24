import { RateLimiter, PersistenceStore } from './types';

export class DotLimiter implements RateLimiter {
  private key: string;
  private limit: number;
  private windowInSeconds: number;
  private store: PersistenceStore;

  constructor(key: string, limit: number, windowInSeconds: number, store: PersistenceStore) {
    this.key = key;
    this.limit = limit;
    this.windowInSeconds = windowInSeconds;
    this.store = store;
  }

  public async allowRequest(): Promise<boolean> {
    const now = Math.floor(Date.now() / 1000);
    const value = await this.store.get(this.key);

    if (value === null) {
      await this.store.set(this.key, 1, this.windowInSeconds);
      return true;
    }

    if (value < this.limit) {
      await this.store.set(this.key, value + 1, this.windowInSeconds);
      return true;
    }

    return false;
  }
}
