import { User, RegisterFormData } from '../../src/types/auth';
import { StorageService } from './storage.service';
import { validateRegistration } from '../../src/utils/validation';
import { generateToken } from '../../src/utils/token';
import { handleError } from '../../src/utils/errors/errorHandler';
import { databaseConfig } from '../config/database.config';

export class AuthService {
  private static readonly usersKey = databaseConfig.storage.keys.users;

  static async registerUser(data: RegisterFormData): Promise<{ success: boolean; message: string }> {
    try {
      const validation = validateRegistration(data);
      if (!validation.isValid) {
        return { success: false, message: validation.errors[0] };
      }

      const users = StorageService.get<User[]>(this.usersKey) || [];
      if (users.some(u => u.email === data.email)) {
        return { success: false, message: 'Email already registered' };
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        role: 'user',
        isVerified: false,
        verificationToken: generateToken(),
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      StorageService.set(this.usersKey, users);

      return {
        success: true,
        message: 'Registration successful. Please verify your email.'
      };
    } catch (error) {
      handleError(error);
      return { success: false, message: 'Registration failed' };
    }
  }

  static async loginUser(email: string, password: string): Promise<User | null> {
    try {
      const users = StorageService.get<User[]>(this.usersKey) || [];
      return users.find(u => u.email === email) || null;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  static async verifyEmail(token: string): Promise<boolean> {
    try {
      const users = StorageService.get<User[]>(this.usersKey) || [];
      const userIndex = users.findIndex(u => u.verificationToken === token);
      
      if (userIndex === -1) return false;

      users[userIndex].isVerified = true;
      delete users[userIndex].verificationToken;
      
      StorageService.set(this.usersKey, users);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }
}