import { User } from '../../types/auth';
import { LocalStorageService } from '../storage/localStorage.service';
import { databaseConfig } from '../../config/database';
import { handleError } from '../../utils/errors/errorHandler';

export class UserService {
  private static readonly storageKey = databaseConfig.storage.keys.users;

  static async getAllUsers(): Promise<User[]> {
    try {
      return LocalStorageService.get<User[]>(this.storageKey) || [];
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.id === id) || null;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.email === email) || null;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  static async getUserByVerificationToken(token: string): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      return users.find(user => user.verificationToken === token) || null;
    } catch (error) {
      handleError(error);
      return null;
    }
  }

  static async createUser(user: User): Promise<User> {
    try {
      const users = await this.getAllUsers();
      users.push(user);
      LocalStorageService.set(this.storageKey, users);
      return user;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  static async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    try {
      const users = await this.getAllUsers();
      const index = users.findIndex(user => user.id === id);
      
      if (index === -1) return null;
      
      users[index] = { ...users[index], ...updates };
      LocalStorageService.set(this.storageKey, users);
      return users[index];
    } catch (error) {
      handleError(error);
      return null;
    }
  }
}