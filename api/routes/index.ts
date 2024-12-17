import { VercelRequest, VercelResponse } from '@vercel/node';
import { parseRouteParams } from '../utils/routeHandler';
import { API_ROUTES } from '../config/constants';
import * as authRoutes from './auth';
import * as subscriptionRoutes from './subscriptions';
import * as seatRoutes from './seats';

export async function router(req: VercelRequest, res: VercelResponse) {
  const { path } = parseRouteParams(req);
  const route = path?.[0];
  const action = path?.[1];

  const routes = {
    auth: {
      register: authRoutes.register,
      login: authRoutes.login,
      verify: authRoutes.verifyEmail
    },
    subscriptions: {
      create: subscriptionRoutes.createSubscription,
      update: subscriptionRoutes.updateSubscription,
      cancel: subscriptionRoutes.cancelSubscription
    },
    seats: {
      availability: seatRoutes.checkAvailability,
      status: seatRoutes.getSeatStatus
    }
  };

  const handler = routes[route]?.[action];
  
  if (!handler) {
    return res.status(404).json({ error: 'Route not found' });
  }

  return handler(req, res);
}