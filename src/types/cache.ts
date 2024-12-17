export interface CacheOptions {
  ttl: number;
  staleWhileRevalidate?: boolean;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}