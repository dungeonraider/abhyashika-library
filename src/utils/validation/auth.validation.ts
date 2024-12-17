import { RegisterFormData } from '../../types/auth';

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRegistration = (data: RegisterFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Name validation
  if (!/^[a-zA-Z\s]{2,50}$/.test(data.name.trim())) {
    errors.push('Name should only contain letters and spaces (2-50 characters)');
  }

  // Email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.push('Please enter a valid email address');
  }

  // Mobile validation
  if (!/^[0-9]{10}$/.test(data.mobile.trim())) {
    errors.push('Mobile number should be 10 digits');
  }

  // Password validation
  const passwordValidation = validatePassword(data.password);
  errors.push(...passwordValidation.errors);

  // Confirm password validation
  if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};