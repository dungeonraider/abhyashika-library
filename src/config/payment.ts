export const paymentConfig = {
  keyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
  currency: 'INR',
  companyName: 'Abhyashika Library',
  companyLogo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=200&fit=crop',
  theme: {
    color: '#2563eb'
  }
} as const;