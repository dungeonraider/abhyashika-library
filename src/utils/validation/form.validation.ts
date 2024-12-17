import { FormData } from '../../types/form';

export const validateFormData = (data: FormData): { isValid: boolean; errors: string[] } => {
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

  // Slot validation
  if (!data.slot) {
    errors.push('Please select a valid slot');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeFormData = (data: FormData): FormData => ({
  name: data.name.trim(),
  email: data.email.trim().toLowerCase(),
  mobile: data.mobile.trim(),
  slot: data.slot.trim()
});