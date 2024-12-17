import React from 'react';
import { 
  Wifi, Fingerprint, Wind, Zap, Sun, Moon, Droplets, Leaf,
  Coffee, Newspaper, MessageSquare, Camera, Armchair, Layout,
  Shield
} from 'lucide-react';
import FeatureCard from './ui/FeatureCard';

const features = [
  { name: 'WiFi', icon: Wifi, description: 'High-speed internet connectivity' },
  { name: 'Fingerprint Access', icon: Fingerprint, description: 'Secure entry system' },
  { name: 'AC', icon: Wind, description: 'Climate controlled environment' },
  { name: 'Inverter Backup', icon: Zap, description: 'Uninterrupted power supply' },
  { name: 'Light Room', icon: Sun, description: 'Well-lit study areas' },
  { name: 'Dark Room', icon: Moon, description: 'Focused study environment' },
  { name: 'Water Cooler', icon: Droplets, description: 'Clean drinking water' },
  { name: 'Peaceful Environment', icon: Leaf, description: 'Distraction-free zone' },
  { name: 'Tea & Coffee', icon: Coffee, description: 'Vending machine available' },
  { name: 'Newspapers', icon: Newspaper, description: 'Daily English & Hindi newspapers' },
  { name: 'Discussion Area', icon: MessageSquare, description: 'Dedicated group study space' },
  { name: 'Security Cameras', icon: Camera, description: '24/7 surveillance for safety' },
  { name: 'Comfortable Seating', icon: Armchair, description: 'Ergonomic chairs for long study sessions' },
  { name: 'Wider Desks', icon: Layout, description: '20% wider desks for comfort' },
  { name: 'Lunch Area', icon: Coffee, description: 'Dedicated space for meals' },
  { name: 'Secured Storage', icon: Shield, description: 'Lockers for personal belongings' }
];

export default function Features() {
  return (
    <div id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            World-Class Facilities
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Everything you need for a productive study session at Abhyashika Library
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.name}
              name={feature.name}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}