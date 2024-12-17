import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email';

export const EmailService = {
  async sendVerificationEmail(email: string, verificationToken: string): Promise<boolean> {
    try {
      const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
      
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.verificationTemplate,
        {
          to_email: email,
          verification_link: verificationLink
        },
        emailConfig.publicKey
      );
      
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return false;
    }
  }
};