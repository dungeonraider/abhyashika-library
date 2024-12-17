import { VercelRequest, VercelResponse } from '@vercel/node';
import { RouteParams } from '../types/request';
import { errorHandler } from '../middleware/errorHandler';

type RouteHandler = (req: VercelRequest, res: VercelResponse) => Promise<void>;

export function createRouteHandler(handler: RouteHandler) {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
}

export function parseRouteParams(req: VercelRequest): RouteParams {
  const { path, ...rest } = req.query;
  return {
    path: Array.isArray(path) ? path : path?.split('/').filter(Boolean),
    ...rest
  };
}