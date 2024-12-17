import React from 'react';
import { databaseUtils } from '../../utils/database';

export default function AdminControls() {
  const handleClearDatabase = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      databaseUtils.clearDatabase();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
      <div className="space-y-4">
        <button
          onClick={handleClearDatabase}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
}