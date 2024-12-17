export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAIL_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAIL_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAIL_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_EMAIL_PRIVATE_KEY,
  verificationTemplate: 'template_email_verify'
} as const;