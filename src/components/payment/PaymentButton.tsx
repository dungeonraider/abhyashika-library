import React from 'react';
import { usePayment } from '../../hooks/usePayment';
import { User } from '../../types/auth';

interface PaymentButtonProps {
  amount: number;
  orderId: string;
  user: User;
  onSuccess: () => void;
  disabled?: boolean;
}

export default function PaymentButton({
  amount,
  orderId,
  user,
  onSuccess,
  disabled = false
}: PaymentButtonProps) {
  const { isProcessing, processPayment } = usePayment();

  const handlePayment = async () => {
    await processPayment(
      amount,
      orderId,
      {
        name: user.name,
        email: user.email,
        contact: user.mobile
      },
      onSuccess
    );
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {isProcessing ? 'Processing...' : 'Pay Now'}
    </button>
  );
}