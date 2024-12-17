export const databaseConfig = {
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