import { UserService } from '../database/user.service';
import { handleError } from '../../utils/errors/errorHandler';
import { toast } from 'react-hot-toast';
import { User } from '../../types/auth';
import { googleConfig } from '../../config/google';
import { encryption } from '../../utils/security/encryption';

export class GoogleAuthService {
  static async handleGoogleLogin(tokenResponse: any): Promise<User | null> {
    try {
      if (!tokenResponse?.access_token) {
        throw new Error('No access token received');
      }

      // Validate origin
      const currentOrigin = window.location.origin;
      if (!googleConfig.allowedOrigins.some(origin => currentOrigin.includes(origin))) {
        throw new Error('Invalid origin');
      }

      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to get user info from Google');
      }

      const data = await response.json();

      if (!data.email) {
        throw new Error('No email received from Google');
      }

      // Check if user exists
      let user = await UserService.getUserByEmail(data.email);

      if (user) {
        // Store encrypted user data
        localStorage.setItem('currentUser', encryption.encrypt(JSON.stringify(user)));
        return user;
      }

      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        mobile: '',
        role: 'user',
        isVerified: true,
        profileImage: data.picture,
        createdAt: new Date().toISOString()
      };

      const createdUser = await UserService.createUser(newUser);
      
      // Store encrypted user data
      localStorage.setItem('currentUser', encryption.encrypt(JSON.stringify(createdUser)));
      return createdUser;
    } catch (error) {
      handleError(error);
      toast.error('Google authentication failed. Please try again.');
      return null;
    }
  }
}