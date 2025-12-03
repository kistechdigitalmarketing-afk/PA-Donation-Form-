'use client';

export default function Header() {
  return (
    <header 
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden"
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
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Be part of the transformation by supporting{' '}
          <span className="text-[#FFA500]">PA</span> ministry
        </h1>
      </div>
    </header>
  );
}

