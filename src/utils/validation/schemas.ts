import { z } from 'zod';
import { emailSchema, passwordSchema, mobileSchema, nameSchema } from './validators';

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  mobile: mobileSchema
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export const subscriptionSchema = z.object({
  planType: z.string(),
  duration: z.number().min(1).max(12),
  seatNumber: z.number().min(1),
  timeSlot: z.object({
    start: z.string(),
    end: z.string()
  })
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SubscriptionInput = z.infer<typeof subscriptionSchema>;