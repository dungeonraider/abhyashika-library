export const rateLimit = (maxRequests: number, timeWindow: number) => {
  const requests: number[] = [];
  
  return {
    tryRequest: (): boolean => {
      const now = Date.now();
      
      // Remove expired timestamps
      while (requests.length > 0 && requests[0] <= now - timeWindow) {
        requests.shift();
      }
      
      if (requests.length >= maxRequests) {
        return false;
      }
      
      requests.push(now);
      return true;
    }
  };
};