import { InMemoryStore } from '../../src'

describe('InMemoryStore', () => {
  it('should set and get values', () => {
    const store = new InMemoryStore();
    store.set('key', 123);
    expect(store.get('key')).toBe(123);
  });

  it('should return null for non-existent keys', () => {
    const store = new InMemoryStore();
    expect(store.get('unknown')).toBe(null);
  });

  it('should delete keys', () => {
    const store = new InMemoryStore();
    store.set('key', 123);
    store.delete('key');
    expect(store.get('key')).toBe(null);
  });
});
