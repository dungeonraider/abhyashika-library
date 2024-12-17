import React from 'react';
import { Edit2, XCircle } from 'lucide-react';

interface SubscriptionActionsProps {
  onEdit: () => void;
  onCancel: () => void;
}

export default function SubscriptionActions({ onEdit, onCancel }: SubscriptionActionsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="text-blue-600 hover:text-blue-700"
        title="Edit subscription"
      >
        <Edit2 className="w-5 h-5" />
      </button>
      <button
        onClick={onCancel}
        className="text-red-600 hover:text-red-700"
        title="Cancel subscription"
      >
        <XCircle className="w-5 h-5" />
      </button>
    </div>
  );
}