import { CacheManager } from '../cache/CacheManager';
import { CacheOptions } from '../../types/cache';

export function withCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: Partial<CacheOptions> = {}
): Promise<T> {
  // Check cache first
  const cached = CacheManager.get<T>(key);
  if (cached !== null) {
    return Promise.resolve(cached);
  }

  // If not in cache, fetch and cache
  return fetchFn().then(data => {
    CacheManager.set(key, data, options);
    return data;
  });
}