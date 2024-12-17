import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FormData } from '../types/form';
import { submitToGoogleSheets } from '../utils/sheets';
import { validateFormData, sanitizeFormData } from '../utils/validation/form.validation';
import { logger } from '../utils/logger';

interface UseBookingFormProps {
  onSuccess?: () => void;
}

export const useBookingForm = ({ onSuccess }: UseBookingFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    slot: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      slot: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validation = validateFormData(formData);
      if (!validation.isValid) {
        validation.errors.forEach(error => toast.error(error));
        return;
      }

      // Sanitize the form data
      const sanitizedData = sanitizeFormData(formData);
      logger.info('Starting form submission', sanitizedData);
      
      await submitToGoogleSheets(sanitizedData);
      
      setIsModalOpen(true);
      resetForm();
      toast.success('Form submitted successfully!');
      onSuccess?.();
    } catch (error) {
      logger.error('Form submission error', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    formData,
    isModalOpen,
    isSubmitting,
    handleSubmit,
    handleChange,
    setIsModalOpen,
  };
};