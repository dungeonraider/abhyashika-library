import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-hot-toast';

export default function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        toast.error('Invalid verification link');
        navigate('/login');
        return;
      }

      try {
        const success = await AuthService.verifyEmail(token);
        if (success) {
          toast.success('Email verified successfully! You can now log in.');
        } else {
          toast.error('Email verification failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification error:', error);
        toast.error('Email verification failed');
      } finally {
        setIsVerifying(false);
        navigate('/login');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Verifying your email...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return null;
}