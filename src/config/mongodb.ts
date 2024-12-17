import { handleError } from '../utils/errors/errorHandler';
import { LocalStorageService } from '../services/storage/localStorage.service';
import { databaseConfig } from './database';

let isInitialized = false;

export const initializeStorage = async () => {
  if (isInitialized) {
    console.log('Storage already initialized');
    return;
  }

  try {
    // Initialize collections
    Object.values(databaseConfig.collections).forEach(collection => {
      if (!LocalStorageService.get(collection)) {
        LocalStorageService.set(collection, []);
      }
    });

    // Add admin user if not exists
    const users = LocalStorageService.get(databaseConfig.collections.users) || [];
    const adminEmail = 'admin@abhyashika.com';
    
    if (!users.some((u: any) => u.email === adminEmail)) {
      users.push({
        id: 'admin-001',
        name: 'Admin',
        email: adminEmail,
        mobile: '0000000000',
        role: 'admin',
        isVerified: true,
        createdAt: new Date().toISOString()
      });
      LocalStorageService.set(databaseConfig.collections.users, users);
    }

    isInitialized = true;
    console.log('Storage initialized successfully');
  } catch (error) {
    console.error('Storage initialization error:', error);
    handleError(error);
    throw new Error('Failed to initialize storage');
  }
};

export const clearStorage = () => {
  try {
    LocalStorageService.clear();
    isInitialized = false;
    console.log('Storage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
    handleError(error);
  }
};