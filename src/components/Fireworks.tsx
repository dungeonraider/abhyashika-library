import React, { useEffect, useCallback } from 'react';
import './Fireworks.css';

const COLORS = [
  '#ff0000', '#ffd700', '#00ff00', '#00ffff', '#ff00ff',
  '#ff4500', '#7fffd4', '#ff69b4', '#00ff7f', '#4169e1'
];

export default function Fireworks() {
  const createParticles = useCallback((x: number, y: number, color: string) => {
    const particles = 50;
    const explosion = document.createElement('div');
    explosion.style.position = 'absolute';
    explosion.style.left = `${x}px`;
    explosion.style.top = `${y}px`;
    
    for (let i = 0; i < particles; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Calculate random angle and distance
      const angle = (Math.PI * 2 * i) / particles;
      const velocity = 2 + Math.random() * 2;
      const dx = Math.cos(angle) * 100 * velocity;
      const dy = Math.sin(angle) * 100 * velocity;
      
      particle.style.backgroundColor = color;
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.animation = `explosion 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`;
      
      explosion.appendChild(particle);
    }
    
    // Add sparkles
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${Math.random() * 200 - 100}px`;
      sparkle.style.top = `${Math.random() * 200 - 100}px`;
      sparkle.style.animationDelay = `${Math.random() * 0.5}s`;
      explosion.appendChild(sparkle);
    }
    
    document.getElementById('fireworks-container')?.appendChild(explosion);
    setTimeout(() => explosion.remove(), 2000);
  }, []);

  const launchFirework = useCallback(() => {
    const container = document.getElementById('fireworks-container');
    if (!container) return;
    
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // Random position horizontally
    const startX = 100 + Math.random() * (container.offsetWidth - 200);
    firework.style.left = `${startX}px`;
    
    container.appendChild(firework);
    
    // Create explosion when the firework reaches its peak
    setTimeout(() => {
      const rect = firework.getBoundingClientRect();
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      createParticles(rect.left, rect.top, color);
      firework.remove();
    }, 1000);
  }, [createParticles]);

  useEffect(() => {
    // Initial burst
    for (let i = 0; i < 3; i++) {
      setTimeout(() => launchFirework(), i * 500);
    }

    // Continuous fireworks
    const interval = setInterval(() => {
      const count = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        setTimeout(() => launchFirework(), i * 800);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [launchFirework]);

  return (
    <div 
      id="fireworks-container" 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2))' }}
    />
  );
}