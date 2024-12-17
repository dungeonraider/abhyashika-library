import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { FormData } from '../types/form';
import { slots } from '../constants/slots';
import { useBookingForm } from '../hooks/useBookingForm';
import { validateFormData, sanitizeFormData } from '../utils/validation/form.validation';
import FormInput from './ui/FormInput';
import Modal from './ui/Modal';

const BookingForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const {
    formData,
    isModalOpen,
    isSubmitting,
    handleSubmit: onSubmit,
    handleChange,
    setIsModalOpen
  } = useBookingForm({ onSuccess });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      validation.errors.forEach(error => toast.error(error));
      return;
    }

    // Sanitize form data
    const sanitizedData = sanitizeFormData(formData);
    
    // Submit form with sanitized data
    await onSubmit(e);
  };

  return (
    <div id="book" className="bg-white py-24">
      <Toaster position="bottom-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
            Pre-book Your Spot at Abhyashika Library
          </h2>
          <p className="mt-4 text-lg text-center text-gray-500">
            Limited seats available. Book now to avail 30% launch discount.
          </p>
          <div className="mt-12 max-w-md mx-auto">
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
                <label htmlFor="slot" className="block text-sm font-medium text-gray-700">
                  Preferred Slot
                </label>
                <select
                  name="slot"
                  id="slot"
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
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Booking Request Received!"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Thank you for your interest in Abhyashika Library! We have received your booking request
            and will contact you shortly to confirm your slot.
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookingForm;