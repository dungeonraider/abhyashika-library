import { UserSubscription } from '../../types/subscription';
import { LocalStorageService } from '../storage/localStorage.service';
import { databaseConfig } from '../../config/database';

export class SubscriptionService {
  private static readonly storageKey = databaseConfig.storage.keys.subscriptions;

  static async getAllSubscriptions(): Promise<UserSubscription[]> {
    return LocalStorageService.get<UserSubscription[]>(this.storageKey) || [];
  }

  static async getUserSubscriptions(userId: string): Promise<UserSubscription[]> {
    const subscriptions = await this.getAllSubscriptions();
    return subscriptions.filter(sub => sub.userId === userId);
  }

  static async createSubscription(subscription: UserSubscription): Promise<UserSubscription> {
    const subscriptions = await this.getAllSubscriptions();
    subscriptions.push(subscription);
    LocalStorageService.set(this.storageKey, subscriptions);
    return subscription;
  }

  static async updateSubscription(id: string, updates: Partial<UserSubscription>): Promise<UserSubscription | null> {
    const subscriptions = await this.getAllSubscriptions();
    const index = subscriptions.findIndex(sub => sub.id === id);
    
    if (index === -1) return null;
    
    subscriptions[index] = { ...subscriptions[index], ...updates };
    LocalStorageService.set(this.storageKey, subscriptions);
    return subscriptions[index];
  }
}