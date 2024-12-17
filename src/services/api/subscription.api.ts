import { apiClient } from './client';
import { API_CONFIG } from '../../config/api';
import { UserSubscription } from '../../types/subscription';

export const subscriptionApi = {
  async create(data: Omit<UserSubscription, 'id'>) {
    return apiClient.post<{ success: boolean; subscription: UserSubscription }>(
      API_CONFIG.endpoints.subscriptions.create,
      data
    );
  },

  async update(id: string, data: Partial<UserSubscription>) {
    return apiClient.put<{ success: boolean; subscription: UserSubscription }>(
      `${API_CONFIG.endpoints.subscriptions.update}?id=${id}`,
      data
    );
  },

  async cancel(id: string) {
    return apiClient.delete<{ success: boolean; message: string }>(
      `${API_CONFIG.endpoints.subscriptions.cancel}?id=${id}`
    );
  }
};