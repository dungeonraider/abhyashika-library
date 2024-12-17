import { CacheOptions } from '../../types/cache';

export class CacheManager {
  private static cache = new Map<string, { data: unknown; timestamp: number }>();
  private static defaultTTL = 5 * 60 * 1000; // 5 minutes

  static set<T>(key: string, data: T, options: Partial<CacheOptions> = {}): void {
    const ttl = options.ttl || this.defaultTTL;
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl
    });
  }

  static get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    if (Date.now() > cached.timestamp) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data as T;
  }

  static has(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    
    if (Date.now() > cached.timestamp) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }

  static delete(key: string): void {
    this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  static clearExpired(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.timestamp) {
        this.cache.delete(key);
      }
    }
  }
}