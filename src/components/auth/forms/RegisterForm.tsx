import React from 'react';
import FormInput from '../../ui/FormInput';
import { RegisterFormData } from '../../../types/auth';

interface RegisterFormProps {
  formData: RegisterFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

export default function RegisterForm({ formData, onChange, onSubmit, isSubmitting }: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
      />
      
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
      />
      
      <FormInput
        label="Mobile Number"
        type="tel"
        name="mobile"
        value={formData.mobile}
        onChange={onChange}
        required
        pattern="[0-9]{10}"
      />
      
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        required
      />
      
      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
}