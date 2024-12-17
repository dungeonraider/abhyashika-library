import React from 'react';

interface StatusIndicatorProps {
  status: string;
  color: string;
}

export default function StatusIndicator({ status, color }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${color} rounded`}></div>
      <span className="text-sm">{status}</span>
    </div>
  );
}