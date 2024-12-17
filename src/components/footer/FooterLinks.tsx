import React from 'react';

export default function FooterLinks() {
  const links = [
    { name: 'Features', href: '#features' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Plans', href: '#plans' },
    { name: 'Pre-book', href: '#book' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Quick Links</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}