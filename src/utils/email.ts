import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailjs';
import { FormData } from '../types/form';

export const sendEmail = async (formData: FormData) => {
  return emailjs.send(
    emailConfig.serviceId,
    emailConfig.templateId,
    {
      to_email: emailConfig.toEmail,
      from_name: formData.name,
      from_email: formData.email,
      mobile: formData.mobile,
      slot: formData.slot,
      message: `New booking request from ${formData.name}`,
    },
    emailConfig.publicKey
  );
};