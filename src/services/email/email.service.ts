import emailjs from '@emailjs/browser';
import { emailConfig } from '../../config/email';
import { handleError } from '../../utils/errors/errorHandler';

export class EmailService {
  static async sendVerificationEmail(email: string, verificationToken: string): Promise<boolean> {
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
      handleError(error);
      return false;
    }
  }
}