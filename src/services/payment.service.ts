import { razorpayConfig } from '../config/razorpay';
import { toast } from 'react-hot-toast';

interface PaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  orderId: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const PaymentService = {
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => {
        toast.error('Failed to load payment gateway');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  },

  async initializePayment(
    amount: number,
    orderId: string,
    userDetails: { name: string; email: string; contact: string },
    onSuccess: (response: any) => void,
    onFailure: (error: any) => void
  ) {
    const scriptLoaded = await this.loadRazorpayScript();
    if (!scriptLoaded) return;

    const options: PaymentOptions = {
      amount: amount * 100, // Convert to paise
      currency: razorpayConfig.currency,
      name: razorpayConfig.name,
      description: razorpayConfig.description,
      orderId: orderId,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contact,
      },
    };

    const razorpayInstance = new window.Razorpay({
      ...options,
      key: razorpayConfig.keyId,
      handler: (response: any) => {
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          toast.error('Payment cancelled');
        }
      },
      theme: razorpayConfig.theme
    });

    razorpayInstance.on('payment.failed', (response: any) => {
      onFailure(response.error);
    });

    razorpayInstance.open();
  }
};