export const databaseConfig = {
  collections: {
    users: 'users',
    subscriptions: 'subscriptions',
    bookings: 'bookings'
  },
  storage: {
    prefix: 'abhyashika_',
    keys: {
      users: 'users',
      currentUser: 'currentUser',
      subscriptions: 'subscriptions',
      blockedSeats: 'blockedSeats'
    }
  }
} as const;