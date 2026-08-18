import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

export default function PricingSection({ pricing, config }) {
  const { tag, title, subtitle, discountBadge, plans } = pricing;
  const primary = config.primaryColor;
  const accent = config.accentColor;
  const isDark = config.isDark;

  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto" id="pricing">
      <div className="text-center max-w-2xl mx-auto mb-14">
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
        
        <p className="text-base sm:text-lg opacity-75 mb-8">
          {subtitle}
        </p>

        {/* Monthly / Yearly Toggle */}
        <div className="inline-flex items-center p-1.5 rounded-2xl border backdrop-blur-md"
          style={{
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              !isYearly 
                ? 'bg-white text-black shadow-md' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            Monthly Billing
          </button>

          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              isYearly 
                ? 'bg-white text-black shadow-md' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <span>Annual Billing</span>
            <span 
              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-white uppercase"
              style={{ backgroundColor: primary }}
            >
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {plans && plans.map((plan, idx) => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;

          return (
            <div
              key={idx}
              className={`rounded-3xl p-8 sm:p-10 border backdrop-blur-xl flex flex-col justify-between relative transition-all duration-300 ${
                plan.isPopular 
                  ? 'shadow-2xl scale-105 z-10' 
                  : 'hover:shadow-xl hover:-translate-y-1'
              }`}
              style={{
                backgroundColor: isDark ? 'rgba(18, 22, 33, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                borderColor: plan.isPopular ? primary : (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
                boxShadow: plan.isPopular ? `0 20px 40px -15px ${primary}33` : undefined,
              }}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div 
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-mono font-bold text-white uppercase tracking-wider shadow-lg flex items-center gap-1.5"
                  style={{ backgroundColor: primary }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest opacity-60">
                    {plan.badge}
                  </span>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-2"
                  style={{ fontFamily: config.fontHeading }}
                >
                  {plan.name}
                </h3>
                
                <p className="text-xs sm:text-sm opacity-70 mb-8 leading-relaxed">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                  <span 
                    className="text-4xl sm:text-5xl font-bold font-mono tracking-tight"
                    style={{ color: plan.isPopular ? primary : undefined }}
                  >
                    {price}
                  </span>
                  <span className="text-xs opacity-60 font-mono">
                    {plan.period}
                  </span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-3.5 mb-10 text-sm">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          backgroundColor: `${primary}1a`,
                          color: primary,
                        }}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="opacity-80 text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                className={`w-full py-4 rounded-xl font-medium text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-sm ${
                  plan.isPopular
                    ? 'text-white hover:opacity-95 shadow-md hover:scale-[1.02] active:scale-100'
                    : 'border hover:bg-neutral-500/10'
                }`}
                style={{
                  backgroundColor: plan.isPopular ? primary : 'transparent',
                  borderColor: plan.isPopular ? primary : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'),
                }}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
