import { User } from '../types/auth';
import { UserSubscription } from '../types/subscription';

const DB_KEYS = {
  USERS: 'abhyashika_users',
  SUBSCRIPTIONS: 'abhyashika_subscriptions',
  CURRENT_USER: 'currentUser',
  BLOCKED_SEATS: 'blockedSeats'
} as const;

export class DatabaseService {
  static initialize(): void {
    // Initialize collections if they don't exist
    if (!localStorage.getItem(DB_KEYS.USERS)) {
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.SUBSCRIPTIONS)) {
      localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify([]));
    }
    if (!localStorage.getItem(DB_KEYS.BLOCKED_SEATS)) {
      localStorage.setItem(DB_KEYS.BLOCKED_SEATS, JSON.stringify([]));
    }

    // Add admin user if not exists
    const users = this.getUsers();
    const adminEmail = 'admin@abhyashika.com';
    if (!users.some(u => u.email === adminEmail)) {
      users.push({
        id: 'admin-001',
        name: 'Admin',
        email: adminEmail,
        mobile: '0000000000',
        role: 'admin',
        isVerified: true,
        createdAt: new Date().toISOString()
      });
      this.setUsers(users);
    }
  }

  // User methods
  static getUsers(): User[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
  }

  static setUsers(users: User[]): void {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
  }

  static getUserByEmail(email: string): User | null {
    const users = this.getUsers();
    return users.find(u => u.email === email) || null;
  }

  static createUser(user: User): User {
    const users = this.getUsers();
    users.push(user);
    this.setUsers(users);
    return user;
  }

  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    users[index] = { ...users[index], ...updates };
    this.setUsers(users);
    return users[index];
  }

  // Subscription methods
  static getSubscriptions(): UserSubscription[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.SUBSCRIPTIONS) || '[]');
  }

  static setSubscriptions(subscriptions: UserSubscription[]): void {
    localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
  }

  static createSubscription(subscription: UserSubscription): UserSubscription {
    const subscriptions = this.getSubscriptions();
    subscriptions.push(subscription);
    this.setSubscriptions(subscriptions);
    return subscription;
  }

  static updateSubscription(id: string, updates: Partial<UserSubscription>): UserSubscription | null {
    const subscriptions = this.getSubscriptions();
    const index = subscriptions.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    subscriptions[index] = { ...subscriptions[index], ...updates };
    this.setSubscriptions(subscriptions);
    return subscriptions[index];
  }

  // Current user methods
  static getCurrentUser(): User | null {
    const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    }
  }

  // Blocked seats methods
  static getBlockedSeats(): number[] {
    return JSON.parse(localStorage.getItem(DB_KEYS.BLOCKED_SEATS) || '[]');
  }

  static setBlockedSeats(seats: number[]): void {
    localStorage.setItem(DB_KEYS.BLOCKED_SEATS, JSON.stringify(seats));
  }

  // Clear all data
  static clearDatabase(): void {
    Object.values(DB_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    this.initialize();
  }
}