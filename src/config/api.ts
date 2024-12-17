export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || window.location.origin,
  endpoints: {
    auth: {
      register: '/auth/register',
      login: '/auth/login',
      verify: '/auth/verify'
    },
    subscriptions: {
      create: '/subscriptions/create',
      update: '/subscriptions/update',
      cancel: '/subscriptions/cancel'
    },
    seats: {
      availability: '/seats/availability',
      status: '/seats/status'
    }
  }
} as const;