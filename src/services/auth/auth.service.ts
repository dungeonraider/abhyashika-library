import { User, RegisterFormData } from '../../types/auth';
import { UserService } from '../database/user.service';
import { EmailService } from '../email/email.service';
import { generateToken } from '../../utils/token';
import { validateRegistration } from '../../utils/validation';
import { handleError } from '../../utils/errors/errorHandler';

export class AuthService {
  static async registerUser(data: RegisterFormData): Promise<{ success: boolean; message: string }> {
    try {
      // Validate registration data
      const validation = validateRegistration(data);
      if (!validation.isValid) {
        return {
          success: false,
          message: validation.errors[0]
        };
      }

      // Check if user already exists
      const existingUser = await UserService.getUserByEmail(data.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Email already registered'
        };
      }

      // Create verification token
      const verificationToken = generateToken();

      // Create user with unverified status
      const newUser: User = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        role: 'user',
        isVerified: false,
        verificationToken,
        createdAt: new Date().toISOString()
      };

      const user = await UserService.createUser(newUser);
      if (!user) {
        return {
          success: false,
          message: 'Failed to create user'
        };
      }

      // Send verification email
      const emailSent = await EmailService.sendVerificationEmail(
        data.email,
        verificationToken
      );

      if (!emailSent) {
        return {
          success: false,
          message: 'Failed to send verification email'
        };
      }

      return {
        success: true,
        message: 'Registration successful. Please check your email to verify your account.'
      };
    } catch (error) {
      handleError(error);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  }

  static async verifyEmail(token: string): Promise<boolean> {
    try {
      const user = await UserService.getUserByVerificationToken(token);
      if (!user) return false;

      const updated = await UserService.updateUser(user.id, {
        isVerified: true,
        verificationToken: undefined
      });

      return !!updated;
    } catch (error) {
      handleError(error);
      return false;
    }
  }
}