import { useState, useCallback } from 'react';
import { User, RegisterFormData } from '../types/auth';
import { UserService } from '../services/database/user.service';
import { AuthService } from '../services/auth/auth.service';
import { toast } from 'react-hot-toast';
import { handleError } from '../utils/errors/errorHandler';
import { encryption } from '../utils/security/encryption';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    try {
      return storedUser ? JSON.parse(encryption.decrypt(storedUser)) : null;
    } catch {
      localStorage.removeItem('currentUser');
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (userData: User) => {
    try {
      // Encrypt user data before storing
      localStorage.setItem('currentUser', encryption.encrypt(JSON.stringify(userData)));
      setUser(userData);
      toast.success('Login successful');
    } catch (error) {
      handleError(error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('currentUser');
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
};