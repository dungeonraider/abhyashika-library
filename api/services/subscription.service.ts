import { UserSubscription } from '../../src/types/subscription';
import { StorageService } from './storage.service';
import { databaseConfig } from '../config/database.config';
import { handleError } from '../../src/utils/errors/errorHandler';

export class SubscriptionService {
  private static readonly storageKey = databaseConfig.storage.keys.subscriptions;

  static async getAllSubscriptions(): Promise<UserSubscription[]> {
    try {
      return StorageService.get<UserSubscription[]>(this.storageKey) || [];
    } catch (error) {
      handleError(error);
      return [];
    }
  }

  static async createSubscription(subscription: Omit<UserSubscription, 'id'>): Promise<UserSubscription> {
    try {
      const subscriptions = await this.getAllSubscriptions();
      const newSubscription: UserSubscription = {
        id: crypto.randomUUID(),
        ...subscription
      };
      
      subscriptions.push(newSubscription);
      StorageService.set(this.storageKey, subscriptions);
      return newSubscription;
    } catch (error) {
      handleError(error);
      throw new Error('Failed to create subscription');
    }
  }

  static async updateSubscription(id: string, updates: Partial<UserSubscription>): Promise<UserSubscription | null> {
    try {
      const subscriptions = await this.getAllSubscriptions();
      const index = subscriptions.findIndex(sub => sub.id === id);
      
      if (index === -1) return null;
      
      subscriptions[index] = { ...subscriptions[index], ...updates };
      StorageService.set(this.storageKey, subscriptions);
      return subscriptions[index];
    } catch (error) {
      handleError(error);
      return null;
    }
  }
}