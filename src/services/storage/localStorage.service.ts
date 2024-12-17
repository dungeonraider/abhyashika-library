import { databaseConfig } from '../../config/database';

export class LocalStorageService {
  private static getKey(key: string): string {
    return `${databaseConfig.storage.prefix}${key}`;
  }

  static get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
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