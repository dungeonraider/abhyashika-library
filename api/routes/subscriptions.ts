import { VercelRequest, VercelResponse } from '@vercel/node';
import { subscriptionService } from '../../src/services/subscriptionService';
import { handleError } from '../../src/utils/errors/errorHandler';

export async function createSubscription(req: VercelRequest, res: VercelResponse) {
  try {
    const subscription = await subscriptionService.createSubscription(req.body);
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Failed to create subscription' });
  }
}

export async function updateSubscription(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query;
    const subscription = await subscriptionService.modifySubscription(id as string, req.body);
    return res.status(200).json({ success: true, subscription });
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Failed to update subscription' });
  }
}

export async function cancelSubscription(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = req.query;
    await subscriptionService.cancelSubscription(id as string);
    return res.status(200).json({ success: true, message: 'Subscription cancelled successfully' });
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Failed to cancel subscription' });
  }
}