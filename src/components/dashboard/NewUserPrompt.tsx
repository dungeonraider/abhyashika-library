import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function NewUserPrompt() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Welcome to Abhyashika Library!</h3>
      <p className="text-gray-600 mb-6">
        It looks like you haven't booked a study space yet. Get started by selecting your preferred seat and time slot.
      </p>
      <Link
        to="/seat-management"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        Book Your Seat <ChevronRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}