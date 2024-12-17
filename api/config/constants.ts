export const API_ROUTES = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    VERIFY: '/auth/verify'
  },
  SUBSCRIPTIONS: {
    CREATE: '/subscriptions/create',
    UPDATE: '/subscriptions/update',
    CANCEL: '/subscriptions/cancel'
  },
  SEATS: {
    AVAILABILITY: '/seats/availability',
    STATUS: '/seats/status'
  }
} as const;

export const RATE_LIMIT = {
  MAX_REQUESTS: 100,
  TIME_WINDOW: 5 * 60 * 1000 // 5 minutes
} as const;