export const apiConfig = {
  cors: {
    allowedOrigins: [
      'https://abhyashika-library.vercel.app',
      'http://localhost:5173'
    ],
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Content-Type',
      'Date',
      'X-Api-Version',
      'Authorization'
    ],
    credentials: true
  },
  rateLimit: {
    maxRequests: 100,
    timeWindow: 5 * 60 * 1000 // 5 minutes
  }
} as const;