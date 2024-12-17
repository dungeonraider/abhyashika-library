import { databaseConfig } from '../config/database.config';

export class StorageService {
  private static getKey(key: string): string {
    return `${databaseConfig.storage.prefix}${key}`;
  }

  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from storage:`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to storage:`, error);
      return false;
    }
  }

  static remove(key: string): void {
    localStorage.removeItem(this.getKey(key));
  }

  static clear(): void {
    Object.values(databaseConfig.storage.keys).forEach(key => {
      this.remove(key);
    });
  }
}