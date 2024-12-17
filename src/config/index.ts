export * from './database';
export * from './email';
export * from './payment';
export * from './google';

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5173',
  environment: import.meta.env.NODE_ENV || 'development',
  isProduction: import.meta.env.NODE_ENV === 'production'
} as const;