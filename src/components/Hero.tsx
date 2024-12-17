import React from 'react';
import CountdownTimer from './CountdownTimer';
import Fireworks from './Fireworks';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-blue-900 to-blue-800 min-h-[80vh] flex items-center justify-center overflow-hidden">
      <Fireworks />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 animate-fade-in">
          Opening Soon
        </h1>
        <div className="mb-12">
          <CountdownTimer />
        </div>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in-up">
          Get ready for a revolutionary study experience at Abhyashika Library.
          Pre-book now to secure your spot with exclusive launch offers!
        </p>
        <div className="mt-10">
          <a
            href="#book"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors duration-300"
          >
            Pre-book Now
          </a>
        </div>
      </div>
    </div>
  );
}