import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function CTASection({ cta, config }) {
  const { title, subtitle, primaryButton, secondaryButton, badge } = cta;
  const primary = config.primaryColor;
  const accent = config.accentColor;
  const isDark = config.isDark;

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto text-center" id="cta">
      <div 
        className="p-12 sm:p-20 rounded-3xl border relative overflow-hidden backdrop-blur-2xl shadow-2xl"
        style={{
          background: isDark 
            ? `radial-gradient(circle at 50% 0%, ${primary}22 0%, rgba(18, 22, 33, 0.95) 70%)` 
            : `radial-gradient(circle at 50% 0%, ${primary}18 0%, rgba(255, 255, 255, 0.95) 70%)`,
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Glow */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ backgroundColor: primary }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {badge && (
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold mb-6 border shadow-sm"
              style={{
                backgroundColor: `${primary}15`,
                borderColor: `${primary}33`,
                color: primary,
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{badge}</span>
            </div>
          )}

          <h2 
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: config.fontHeading }}
          >
            {title}
          </h2>

          <p className="text-base sm:text-xl opacity-75 max-w-2xl mx-auto mb-10 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:opacity-95 hover:scale-105 active:scale-100"
              style={{ 
                backgroundColor: primary,
                boxShadow: `0 10px 25px -5px ${primary}66`
              }}
            >
              <span>{primaryButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {secondaryButton && (
              <button 
                className="w-full sm:w-auto px-7 py-4 rounded-xl border text-sm font-medium transition-all hover:bg-neutral-500/10 backdrop-blur-md"
                style={{
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)',
                }}
              >
                {secondaryButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
