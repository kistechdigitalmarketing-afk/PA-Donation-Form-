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
    const iconClass = "w-6 h-6 text-[#FFA500] flex-shrink-0";
    
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
      case 'bank':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      case 'book':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'training':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'farming':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'education':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  const donationImpacts = [
    { text: 'Financial support for table banking projects', icon: 'bank' },
    { text: 'Bibles and spiritual books to aid spiritual development', icon: 'book' },
    { text: 'Ongoing training of pastors and community members', icon: 'training' },
    { text: 'Irrigation equipment to enhance farming projects', icon: 'farming' },
    { text: 'Educational support for training Sunday School and Early Childhood Development (ECD) teachers, along with learning materials', icon: 'education' },
  ];

  const [currentImpact, setCurrentImpact] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImpact((prev) => (prev + 1) % donationImpacts.length);
        setFade(true);
      }, 300);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [donationImpacts.length]);

  return (
    <div className="w-full space-y-6 sm:space-y-8 md:space-y-10">
      <div>
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 leading-tight">
          Your support bolstered our holistic transformation work in rural Africa supporting;
        </h2>
        <ul className="space-y-4 sm:space-y-5 md:space-y-6">
          {points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 sm:gap-4 md:gap-5 group">
              <div className="mt-0.5 sm:mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {getIcon(point.icon)}
              </div>
              <span className="text-white text-base sm:text-lg md:text-xl leading-relaxed">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 md:pt-10 border-t-2 border-white/30">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
          Your donation helps support:
        </h3>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-white/20 shadow-lg min-h-[120px] sm:min-h-[140px] md:min-h-[160px] flex items-center hover:bg-white/15 transition-colors duration-300">
          <div className="flex items-start gap-3 sm:gap-4 md:gap-6 w-full">
            <div className="mt-0.5 flex-shrink-0">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#FFA500] flex items-center">
                {getIcon(donationImpacts[currentImpact].icon)}
              </div>
            </div>
            <p className={`text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
              {donationImpacts[currentImpact].text}
            </p>
          </div>
        </div>
        <p className="text-white/90 text-xs sm:text-sm mt-4 sm:mt-5 md:mt-6 text-center font-medium">
          All amounts in Kenyan Shillings (KES)
        </p>
      </div>
    </div>
  );
}

