import { DatabaseService } from './database.service';
import { EmailService } from './email.service';
import { User, RegisterFormData } from '../types/auth';
import { validateRegistration } from '../utils/validation';
import { generateToken } from '../utils/token';

export const AuthService = {
  async registerUser(data: RegisterFormData): Promise<{ success: boolean; message: string }> {
    // Validate registration data
    const validation = validateRegistration(data);
    if (!validation.isValid) {
      return {
        success: false,
        message: validation.errors[0]
      };
    }

    try {
      // Check if user already exists
      const existingUser = await DatabaseService.getUserByEmail(data.email);
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

      const user = await DatabaseService.createUser(newUser);
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
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      };
    }
  },

  async verifyEmail(token: string): Promise<boolean> {
    try {
      const user = await DatabaseService.getUserByVerificationToken(token);
      if (!user) return false;

      const updated = await DatabaseService.updateUser(user.id, {
        isVerified: true,
        verificationToken: undefined
      });

      return updated;
    } catch (error) {
      console.error('Email verification failed:', error);
      return false;
    }
  }
};