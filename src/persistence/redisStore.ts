
import { createClient, RedisClientType } from 'redis';
import { PersistenceStore } from '../types';

export class RedisStore implements PersistenceStore {
  private client: RedisClientType;

  constructor(redisUrl: string) {
    this.client = createClient({ url: redisUrl });
    this.client.connect();
  }

  public async get(key: string): Promise<number | null> {
    const value = await this.client.get(key);
    return value ? parseInt(value, 10) : null;
  }

  public async set(key: string, value: number, ttl?: number): Promise<void> {
    await this.client.set(key, value.toString(), {
      EX: ttl,
    });
  }

  public async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}