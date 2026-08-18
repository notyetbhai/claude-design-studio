import React from 'react';

export default function LogoCloudSection({ logos, config }) {
  const { title, items } = logos;
  const isDark = config.isDark;

  return (
    <section className="py-14 border-y overflow-hidden"
      style={{
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.015)' : 'rgba(0, 0, 0, 0.015)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs uppercase font-mono tracking-widest opacity-50 mb-8 font-medium">
          {title}
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 opacity-75">
          {items && items.map((brand, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 font-mono text-base sm:text-lg font-semibold tracking-wider hover:opacity-100 transition-opacity cursor-pointer group"
            >
              <span className="w-2 h-2 rounded-full group-hover:scale-150 transition-transform" style={{ backgroundColor: config.primaryColor }}></span>
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
