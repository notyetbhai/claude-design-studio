import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection({ faq, config }) {
  const { tag, title, items } = faq;
  const primary = config.primaryColor;
  const isDark = config.isDark;

  const [openIdx, setOpenIdx] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="docs">
      <div className="text-center mb-16">
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

      <div className="space-y-4">
        {items && items.map((item, idx) => {
          const isOpen = openIdx === idx;

          return (
            <div 
              key={idx}
              className="rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: isDark ? 'rgba(18, 22, 33, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                borderColor: isOpen ? primary : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
              }}
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg cursor-pointer"
              >
                <span>{item.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  style={{ color: isOpen ? primary : 'inherit' }}
                />
              </button>

              {isOpen && (
                <div 
                  className="px-6 pb-6 text-sm sm:text-base opacity-75 leading-relaxed pt-2 border-t"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
                >
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
