import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

export function validateBody(schema: z.ZodSchema) {
  return async (req: VercelRequest, res: VercelResponse, next: () => Promise<void>) => {
    try {
      schema.parse(req.body);
      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors
        });
      }
      return res.status(400).json({ error: 'Invalid request body' });
    }
  };
}