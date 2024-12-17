import { VercelResponse } from '@vercel/node';
import { AuthenticatedRequest } from '../types/request';
import { handleError } from '../../src/utils/errors/errorHandler';

export async function authenticateRequest(
  req: AuthenticatedRequest,
  res: VercelResponse,
  next: () => Promise<void>
) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    // Add user data to request
    const token = authHeader.split(' ')[1];
    // Implement token verification logic here
    req.user = { id: 'user-id', role: 'user' }; // Placeholder

    await next();
  } catch (error) {
    handleError(error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

export function requireRole(role: string) {
  return async (req: AuthenticatedRequest, res: VercelResponse, next: () => Promise<void>) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    await next();
  };
}