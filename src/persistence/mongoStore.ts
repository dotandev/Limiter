import { MongoClient, Db, Collection } from 'mongodb';
import { PersistenceStore } from '../types';

export class MongoStore implements PersistenceStore {
  private client: MongoClient;
  private db: Db;
  private collection: Collection;

  constructor(mongoUri: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(mongoUri);
    this.db = this.client.db(dbName);
    this.collection = this.db.collection(collectionName);
    this.client.connect();
  }

  public async get(key: string): Promise<number | null> {
    const record = await this.collection.findOne({ key });
    return record ? record.value : null;
  }

  public async set(key: string, value: number, ttl?: number): Promise<void> {
    const expiry = ttl ? new Date(Date.now() + ttl * 1000) : null;
    await this.collection.updateOne(
      { key },
      { $set: { key, value, expiry } },
      { upsert: true }
    );
  }

  public async delete(key: string): Promise<void> {
    await this.collection.deleteOne({ key });
  }
}
