import { toast } from 'react-hot-toast';
import { ApiError, NetworkError, ValidationError } from './types';

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    toast.error(error.message);
    return;
  }

  if (error instanceof NetworkError) {
    toast.error('Network error. Please check your connection.');
    return;
  }

  if (error instanceof ValidationError) {
    error.errors.forEach(err => toast.error(err));
    return;
  }

  toast.error('An unexpected error occurred');
  console.error('Unhandled error:', error);
}