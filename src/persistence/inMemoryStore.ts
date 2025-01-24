import { PersistenceStore } from '../types';

export class InMemoryStore implements PersistenceStore {
  private store: Map<string, number>;

  constructor() {
    this.store = new Map<string, number>();
  }

  public get(key: string): number | null {
    return this.store.get(key) || null;
  }

  public set(key: string, value: number): void {
    this.store.set(key, value);
  }

  public delete(key: string): void {
    this.store.delete(key);
  }
}