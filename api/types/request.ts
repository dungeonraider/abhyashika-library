import { VercelRequest } from '@vercel/node';

export interface AuthenticatedRequest extends VercelRequest {
  user?: {
    id: string;
    role: string;
  };
}

export interface RouteParams {
  path?: string[];
  [key: string]: unknown;
}