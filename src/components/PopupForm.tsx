import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FormData } from '../types/form';
import { slots } from '../constants/slots';
import { submitToGoogleSheets } from '../utils/sheets';
import FormInput from './ui/FormInput';
import Modal from './ui/Modal';

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    slot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
      await submitToGoogleSheets(formData);
      resetForm();
      setIsOpen(false);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Pre-book Your Study Space">
        <div className="p-4">
          <p className="text-gray-600 mb-6">
            Limited seats available at 30% off regular prices. Fill out the form below to reserve your preferred study slot.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Mobile Number"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div>
              <label htmlFor="popup-slot" className="block text-sm font-medium text-gray-700">
                Preferred Slot
              </label>
              <select
                name="slot"
                id="popup-slot"
                required
                value={formData.slot}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a slot</option>
                {slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Pre-book Now'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}