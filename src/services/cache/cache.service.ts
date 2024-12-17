export class CacheService {
  private static cache = new Map<string, { data: unknown; timestamp: number }>();
  private static defaultTTL = 5 * 60 * 1000; // 5 minutes

  static set(key: string, data: unknown, ttl = this.defaultTTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now() + ttl,
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

  static clear(): void {
    this.cache.clear();
  }

  static remove(key: string): void {
    this.cache.delete(key);
  }
}