import { VercelRequest, VercelResponse } from '@vercel/node';
import { apiConfig } from '../config/api.config';

export function setupCors(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  
  if (origin && apiConfig.cors.allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Credentials', String(apiConfig.cors.credentials));
  res.setHeader('Access-Control-Allow-Methods', apiConfig.cors.allowedMethods.join(','));
  res.setHeader('Access-Control-Allow-Headers', apiConfig.cors.allowedHeaders.join(','));

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}