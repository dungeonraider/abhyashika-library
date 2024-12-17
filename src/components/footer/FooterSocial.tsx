import React from 'react';
import { Instagram } from 'lucide-react';

export default function FooterSocial() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Connect With Us</h3>
      <div className="flex space-x-4">
        <a
          href="https://www.instagram.com/abhyashikalibrary/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-500 transition-colors"
          aria-label="Follow us on Instagram"
        >
          <Instagram className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}