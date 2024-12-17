import { apiClient } from './client';
import { API_CONFIG } from '../../config/api';
import { RegisterFormData, LoginFormData, User } from '../../types/auth';

export const authApi = {
  async register(data: RegisterFormData) {
    return apiClient.post<{ success: boolean; message: string }>(
      API_CONFIG.endpoints.auth.register,
      data
    );
  },

  async login(data: LoginFormData) {
    return apiClient.post<{ success: boolean; user: User }>(
      API_CONFIG.endpoints.auth.login,
      data
    );
  },

  async verifyEmail(token: string) {
    return apiClient.get<{ success: boolean; message: string }>(
      `${API_CONFIG.endpoints.auth.verify}?token=${token}`
    );
  }
};