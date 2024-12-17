import { toast } from 'react-hot-toast';
import { paymentConfig } from '../config/payment';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentMetadata {
  name: string;
  email: string;
  contact: string;
  planType: string;
  duration: number;
}

export const initializePayment = async (
  amount: number,
  onSuccess: () => Promise<void>,
  metadata: PaymentMetadata
): Promise<void> => {
  try {
    // Load Razorpay script
    await loadRazorpayScript();

    const options = {
      key: paymentConfig.keyId,
      amount: amount * 100, // Amount in paise
      currency: paymentConfig.currency,
      name: paymentConfig.companyName,
      description: `${metadata.planType} - ${metadata.duration} month(s)`,
      image: paymentConfig.companyLogo,
      handler: async function (response: any) {
        try {
          console.log('Payment successful:', response);
          await onSuccess();
          toast.success('Payment successful! Your booking is confirmed.');
        } catch (error) {
          console.error('Error processing payment:', error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: metadata.name,
        email: metadata.email,
        contact: metadata.contact,
      },
      notes: {
        planType: metadata.planType,
        duration: metadata.duration.toString(),
      },
      theme: paymentConfig.theme,
      modal: {
        ondismiss: function() {
          toast.error('Payment cancelled');
        },
        escape: false,
        animation: true
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', function (response: any) {
      console.error('Payment failed:', response.error);
      toast.error(response.error.description || 'Payment failed');
    });

    razorpay.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    toast.error('Failed to initialize payment. Please try again.');
    throw error;
  }
};

const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));

    document.body.appendChild(script);
  });
};