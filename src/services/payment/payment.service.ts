import { toast } from 'react-hot-toast';
import { paymentConfig } from '../../config/payment';
import { handleError } from '../../utils/errors/errorHandler';

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

export class PaymentService {
  private static async loadScript(): Promise<boolean> {
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
  }

  static async initializePayment(
    amount: number,
    orderId: string,
    userDetails: { name: string; email: string; contact: string },
    onSuccess: (response: any) => void,
    onFailure: (error: any) => void
  ): Promise<void> {
    try {
      const scriptLoaded = await this.loadScript();
      if (!scriptLoaded) return;

      const options: PaymentOptions = {
        amount: amount * 100,
        currency: paymentConfig.currency,
        name: paymentConfig.name,
        description: paymentConfig.description,
        orderId: orderId,
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
      };

      const razorpay = new window.Razorpay({
        ...options,
        key: paymentConfig.keyId,
        handler: (response: any) => {
          onSuccess(response);
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          }
        },
        theme: paymentConfig.theme
      });

      razorpay.on('payment.failed', (response: any) => {
        onFailure(response.error);
      });

      razorpay.open();
    } catch (error) {
      handleError(error);
    }
  }
}