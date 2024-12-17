import { toast } from 'react-hot-toast';
import { AppError, ValidationError, AuthenticationError, AuthorizationError } from './AppError';

export const handleError = (error: unknown): void => {
  if (error instanceof ValidationError) {
    toast.error(error.message);
  } else if (error instanceof AuthenticationError) {
    toast.error('Please log in to continue');
  } else if (error instanceof AuthorizationError) {
    toast.error('You are not authorized to perform this action');
  } else if (error instanceof AppError) {
    toast.error(error.message);
  } else if (error instanceof Error) {
    toast.error('An unexpected error occurred. Please try again.');
    console.error('Unhandled error:', error);
  } else {
    toast.error('Something went wrong. Please try again.');
    console.error('Unknown error:', error);
  }
};