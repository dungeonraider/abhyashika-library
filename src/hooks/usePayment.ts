import { useState } from 'react';
import { PaymentService } from '../services/payment.service';
import { toast } from 'react-hot-toast';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (
    amount: number,
    orderId: string,
    userDetails: { name: string; email: string; contact: string },
    onSuccess: () => void
  ) => {
    setIsProcessing(true);
    
    try {
      await PaymentService.initializePayment(
        amount,
        orderId,
        userDetails,
        (response) => {
          console.log('Payment successful:', response);
          onSuccess();
          toast.success('Payment successful!');
        },
        (error) => {
          console.error('Payment failed:', error);
          toast.error(error.description || 'Payment failed');
        }
      );
    } catch (error) {
      console.error('Payment processing error:', error);
      toast.error('Failed to process payment');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    processPayment
  };
};