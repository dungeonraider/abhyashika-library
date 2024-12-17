export function generateCacheKey(base: string, params: Record<string, any>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${JSON.stringify(params[key])}`)
    .join('&');
  
  return `${base}-${sortedParams}`;
}

export function clearCacheByPattern(pattern: string): void {
  const keys = Array.from(localStorage.keys());
  keys.forEach(key => {
    if (key.startsWith(pattern)) {
      localStorage.removeItem(key);
    }
  });
}