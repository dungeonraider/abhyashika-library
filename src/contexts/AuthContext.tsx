import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ isNewUser: boolean }>;
  register: (userData: { name: string; email: string; password: string; mobile: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Database keys
const DB_KEYS = {
  USERS: 'abhyashika_users',
  CURRENT_USER: 'currentUser',
};

// Admin credentials
const ADMIN_EMAIL = 'admin@abhyashika.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize admin user if not exists
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    if (!users.some((u: User) => u.email === ADMIN_EMAIL)) {
      const adminUser: User = {
        id: crypto.randomUUID(),
        name: 'Admin',
        email: ADMIN_EMAIL,
        mobile: '0000000000',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      users.push(adminUser);
      localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    }

    // Check for stored user data
    const storedUser = localStorage.getItem(DB_KEYS.CURRENT_USER);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    const user = users.find((u: User) => u.email === email);

    if (!user) {
      throw new Error('User not found');
    }

    // Special admin password check
    if (user.role === 'admin' && password !== ADMIN_PASSWORD) {
      throw new Error('Invalid credentials');
    }

    setUser(user);
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));

    return { isNewUser: false };
  };

  const register = async (userData: { name: string; email: string; password: string; mobile: string }) => {
    const users = JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]');
    
    if (users.some((u: User) => u.email === userData.email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));

    setUser(newUser);
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}