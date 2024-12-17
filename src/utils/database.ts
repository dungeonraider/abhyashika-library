import { toast } from 'react-hot-toast';
import { User } from '../types/auth';
import { UserSubscription } from '../types/subscription';

const DB_KEYS = {
  USERS: 'abhyashika_users',
  SUBSCRIPTIONS: 'abhyashika_subscriptions',
  CURRENT_USER: 'currentUser',
  BLOCKED_SEATS: 'blockedSeats'
};

// Admin credentials
const ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@abhyashika.com',
  mobile: '0000000000',
  role: 'admin',
  createdAt: new Date().toISOString()
};

export const databaseUtils = {
  initializeDatabase() {
    try {
      // Initialize users if not exists
      const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
      if (!users.some((u: User) => u.email === ADMIN_USER.email)) {
        users.push(ADMIN_USER);
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
      }

      // Initialize empty collections
      if (!localStorage.getItem(DB_KEYS.SUBSCRIPTIONS)) {
        localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, '[]');
      }
      if (!localStorage.getItem(DB_KEYS.BLOCKED_SEATS)) {
        localStorage.setItem(DB_KEYS.BLOCKED_SEATS, '[]');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  },

  getDatabaseState() {
    try {
      return {
        users: JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]'),
        subscriptions: JSON.parse(localStorage.getItem(DB_KEYS.SUBSCRIPTIONS) || '[]'),
        blockedSeats: JSON.parse(localStorage.getItem(DB_KEYS.BLOCKED_SEATS) || '[]')
      };
    } catch (error) {
      console.error('Error getting database state:', error);
      return {
        users: [],
        subscriptions: [],
        blockedSeats: []
      };
    }
  },

  clearDatabase() {
    try {
      // Clear all stored data except admin user
      const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
      const adminUser = users.find((u: User) => u.role === 'admin');

      Object.values(DB_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });

      // Reinitialize with empty arrays and admin user
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(adminUser ? [adminUser] : [ADMIN_USER]));
      localStorage.setItem(DB_KEYS.SUBSCRIPTIONS, '[]');
      localStorage.setItem(DB_KEYS.BLOCKED_SEATS, '[]');

      toast.success('Database cleared successfully');
      
      // Force page reload to reset all states
      window.location.reload();
    } catch (error) {
      console.error('Error clearing database:', error);
      toast.error('Failed to clear database');
    }
  }
};