'use client';

export default function Header() {
  return (
    <header 
      className="relative w-full h-[120px] sm:h-[140px] md:h-[160px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image with blur */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/PA-img.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(4px)',
          transform: 'scale(1.1)',
        }}
      ></div>
      
      {/* Sepia and dark overlay */}
      <div className="absolute inset-0 bg-[#8B4513]/80"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-3 sm:px-4 md:px-6 max-w-4xl mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
          Be part of the transformation by supporting{' '}
          <span className="text-[#FFA500]">PA</span> ministry
        </h1>
      </div>
    </header>
  );
}

