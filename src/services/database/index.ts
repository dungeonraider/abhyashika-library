export * from './database.service';
export * from './user.service';
export * from './subscription.service';

// Initialize database
import { DatabaseService } from './database.service';
import { UserService } from './user.service';

export const initializeDatabase = async () => {
  try {
    // Initialize storage
    DatabaseService.initialize();

    // Add admin user if not exists
    const adminEmail = 'admin@abhyashika.com';
    const adminExists = await UserService.getUserByEmail(adminEmail);
    
    if (!adminExists) {
      await UserService.createUser({
        id: 'admin-001',
        name: 'Admin',
        email: adminEmail,
        mobile: '0000000000',
        role: 'admin',
        isVerified: true,
        createdAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Database initialization failed:', error);
  }
};