import { useState, useEffect } from 'react';
import { CacheManager } from '../services/cache/CacheManager';
import { CacheOptions } from '../types/cache';

export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: Partial<CacheOptions> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check cache first
        const cached = CacheManager.get<T>(key);
        if (cached !== null) {
          setData(cached);
          setLoading(false);
          return;
        }

        // If not in cache, fetch
        const result = await fetchFn();
        CacheManager.set(key, result, options);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  const refresh = async () => {
    setLoading(true);
    try {
      const result = await fetchFn();
      CacheManager.set(key, result, options);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refresh };
}