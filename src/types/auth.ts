export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'admin' | 'user';
  isVerified: boolean;
  verificationToken?: string;
  profileImage?: string;
  createdAt: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}