import React from 'react';

export default function MetricsSection({ metrics, config }) {
  const { tag, title, items } = metrics;
  const primary = config.primaryColor;
  const isDark = config.isDark;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-y"
      style={{
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)',
      }}
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono font-semibold uppercase tracking-widest" style={{ color: primary }}>
          {tag}
        </span>
        <h2 
          className="text-3xl sm:text-4xl font-bold mt-2 tracking-tight"
          style={{ fontFamily: config.fontHeading }}
        >
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items && items.map((item, idx) => (
          <div 
            key={idx}
            className="p-8 rounded-2xl border backdrop-blur-md text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              backgroundColor: isDark ? 'rgba(18, 22, 33, 0.6)' : 'rgba(255, 255, 255, 0.7)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div 
              className="text-4xl sm:text-5xl font-bold font-mono tracking-tight mb-2"
              style={{ color: primary }}
            >
              {item.number}
            </div>
            <div className="font-semibold text-sm sm:text-base mb-1">
              {item.label}
            </div>
            <div className="text-xs opacity-60 font-mono">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
