import { VercelRequest, VercelResponse } from '@vercel/node';
import { AuthService } from '../../src/services/auth/auth.service';
import { validateRegistration } from '../../src/utils/validation';
import { handleError } from '../../src/utils/errors/errorHandler';

export async function register(req: VercelRequest, res: VercelResponse) {
  try {
    const result = await AuthService.registerUser(req.body);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Registration failed' });
  }
}

export async function login(req: VercelRequest, res: VercelResponse) {
  try {
    const { email, password } = req.body;
    const user = await AuthService.loginUser(email, password);
    return res.status(200).json({ success: true, user });
  } catch (error) {
    handleError(error);
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}

export async function verifyEmail(req: VercelRequest, res: VercelResponse) {
  try {
    const { token } = req.query;
    const verified = await AuthService.verifyEmail(token as string);
    return res.status(verified ? 200 : 400).json({
      success: verified,
      message: verified ? 'Email verified successfully' : 'Invalid verification token'
    });
  } catch (error) {
    handleError(error);
    return res.status(500).json({ success: false, message: 'Verification failed' });
  }
}