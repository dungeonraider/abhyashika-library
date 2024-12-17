import { VercelResponse } from '@vercel/node';
import { AppError } from '../../src/utils/errors/AppError';
import { handleError } from '../../src/utils/errors/errorHandler';

export function errorHandler(error: unknown, res: VercelResponse) {
  handleError(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message
    });
  }

  return res.status(500).json({
    error: 'Internal server error'
  });
}