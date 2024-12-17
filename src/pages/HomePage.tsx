import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Gallery from '../components/Gallery';
import Pricing from '../components/Pricing';
import BookingForm from '../components/BookingForm';
import PopupForm from '../components/PopupForm';

const HomePage = () => {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Features />
      <Gallery />
      <Pricing />
      <BookingForm />
      <PopupForm />
    </main>
  );
};

export default HomePage;