import React from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function FooterContact() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Contact & Location</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <div>
            <p className="text-gray-300">
              2nd Floor, VR Plaza, beside Mahendra's, Narayan Plaza,
              Link Road, Bilaspur, Chhattisgarh 495001
            </p>
            <a
              href="https://maps.app.goo.gl/gU2uF42qWRFFu4HW7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-block"
            >
              View on Google Maps →
            </a>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <a
            href="mailto:support@abhyashika.com"
            className="text-gray-300 hover:text-white transition-colors"
          >
            support@abhyashika.com
          </a>
        </div>
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <div className="text-gray-300">
            <p>Mon - Sun</p>
            <p>07:00 AM - 11:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}