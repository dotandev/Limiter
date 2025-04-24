
export interface RateLimiter {
    allowRequest(): Promise<boolean>;
}

export interface PersistenceStore {
    get(key: string): Promise<number | null> | number | null;
    set(key: string, value: number, ttl?: number): Promise<void> | void;
    delete(key: string): Promise<void> | void;
}

