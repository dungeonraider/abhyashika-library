import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  name: string;
  description: string;
  Icon: LucideIcon;
}

export default function FeatureCard({ name, description, Icon }: FeatureCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
      <div className="relative p-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
        <Icon className="w-8 h-8 text-blue-600" />
        <div className="space-y-2">
          <p className="text-slate-800 font-medium">{name}</p>
          <p className="text-slate-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}