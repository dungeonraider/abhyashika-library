import React from 'react';
import FooterContact from './FooterContact';
import FooterSocial from './FooterSocial';
import FooterLinks from './FooterLinks';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FooterContact />
          <FooterLinks />
          <FooterSocial />
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Abhyashika Library by <a href="https://www.analogdigitalsolution.com">ADS</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}