'use client';

import { useState, useEffect } from 'react';

export default function SupportPoints() {
  const points = [
    { text: 'Developing Transformational Leaders.', icon: 'star' },
    { text: 'Growing Disciples.', icon: 'users' },
    { text: 'Mentoring the Next Generation.', icon: 'academic' },
    { text: 'Strengthening Livelihoods.', icon: 'handshake' },
    { text: 'Building Responsible Citizens.', icon: 'building' },
  ];

  const getIcon = (iconType: string) => {
    const iconClass = "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#FFA500] flex-shrink-0";
    
    switch (iconType) {
      case 'star':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      case 'users':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'academic':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'handshake':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'building':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % points.length);
    }, 2000); // Change selection every 2 seconds

    return () => clearInterval(interval);
  }, [points.length]);

  return (
    <div className="w-full space-y-6 sm:space-y-8 md:space-y-10">
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 leading-tight text-center">
          Your support bolster our holistic transformation<br />
          work in rural Africa by ;
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {points.map((point, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={index}
                className={`relative backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 border-2 shadow-lg transition-all duration-500 flex flex-col items-center text-center group ${
                  isSelected
                    ? 'bg-white/25 border-[#FFA500] shadow-2xl scale-105 transform'
                    : 'bg-white/10 border-white/20 hover:bg-white/15'
                }`}
              >
                <div
                  className={`mb-3 sm:mb-4 flex-shrink-0 transition-all duration-500 ${
                    isSelected ? 'scale-125' : 'group-hover:scale-110'
                  }`}
                >
                  {getIcon(point.icon)}
                </div>
                <span
                  className={`text-sm sm:text-base md:text-lg leading-relaxed font-medium transition-all duration-500 ${
                    isSelected ? 'text-white font-bold' : 'text-white'
                  }`}
                >
                  {point.text}
                </span>
                {isSelected && (
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl border-2 border-[#FFA500] animate-pulse pointer-events-none"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

