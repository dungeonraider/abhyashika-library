import { LocalStorageService } from '../storage/localStorage.service';
import { databaseConfig } from '../../config/database';
import { handleError } from '../../utils/errors/errorHandler';

export class DatabaseService {
  static initialize(): void {
    try {
      // Initialize collections if they don't exist
      Object.values(databaseConfig.collections).forEach(collection => {
        if (!LocalStorageService.get(collection)) {
          LocalStorageService.set(collection, []);
        }
      });

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      handleError(error);
    }
  }

  static clearDatabase(): void {
    try {
      LocalStorageService.clear();
      this.initialize();
      console.log('Database cleared successfully');
    } catch (error) {
      console.error('Failed to clear database:', error);
      handleError(error);
    }
  }
}