import React from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Main Study Area'
  },
  {
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Discussion Room'
  },
  {
    url: 'https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Reading Zone'
  },
  {
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Computer Area'
  },
  {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Silent Zone'
  },
  {
    url: 'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    title: 'Relaxation Area'
  }
];

export default function Gallery() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Facilities
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Take a virtual tour of Abhyashika Library
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <div key={image.title} className="relative group">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src={image.url}
                  alt={image.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <span className="absolute inset-0" />
                {image.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}