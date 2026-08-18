import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection({ testimonials, config }) {
  const { tag, title, subtitle, items } = testimonials;
  const primary = config.primaryColor;
  const isDark = config.isDark;

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto" id="safety">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4 border"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <span>{tag}</span>
        </div>
        
        <h2 
          className="text-3xl sm:text-5xl font-bold tracking-tight mb-4"
          style={{ fontFamily: config.fontHeading }}
        >
          {title}
        </h2>
        
        <p className="text-base sm:text-lg opacity-75">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items && items.map((item, idx) => (
          <div 
            key={idx}
            className="p-8 sm:p-10 rounded-3xl border backdrop-blur-xl flex flex-col justify-between relative group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div>
              {/* Stars & Highlight */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {item.highlight && (
                  <span 
                    className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${primary}14`,
                      borderColor: `${primary}26`,
                      color: primary,
                    }}
                  >
                    {item.highlight}
                  </span>
                )}
              </div>

              {/* Quote */}
              <p className="text-base sm:text-lg leading-relaxed opacity-85 mb-8 italic">
                "{item.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <img 
                src={item.avatar} 
                alt={item.author} 
                className="w-12 h-12 rounded-full object-cover border-2"
                style={{ borderColor: primary }}
              />
              <div>
                <div className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                  <span>{item.author}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                </div>
                <div className="text-xs opacity-60">
                  {item.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
