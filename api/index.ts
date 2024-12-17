import { VercelRequest, VercelResponse } from '@vercel/node';
import { setupCors } from './middleware/cors';
import { rateLimit } from '../src/utils/rateLimit';
import { RATE_LIMIT } from './config/constants';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';

const limiter = rateLimit(RATE_LIMIT.MAX_REQUESTS, RATE_LIMIT.TIME_WINDOW);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Handle CORS
    if (setupCors(req, res)) return;

    // Rate limiting
    if (!limiter.tryRequest()) {
      return res.status(429).json({ 
        error: 'Too many requests. Please try again later.' 
      });
    }

    // Route handling
    await router(req, res);
  } catch (error) {
    errorHandler(error, res);
  }
}