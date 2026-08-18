import React, { useState } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, TrendingDown } from 'lucide-react';
import PricingSection from '../components/sections/PricingSection';
import FAQSection from '../components/sections/FAQSection';
import PricingCalculatorPage from './PricingCalculatorPage';

export default function PricingPage({ config, template }) {
  const { content } = template;
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  return (
    <div className="py-8 space-y-16">
      {/* 1. Main Tier Pricing Cards */}
      {content.pricing && <PricingSection pricing={content.pricing} config={config} />}

      {/* 2. Interactive ROI & Volume Calculator */}
      <PricingCalculatorPage config={config} />

      {/* 3. Frequently Asked Questions */}
      {content.faq && <FAQSection faq={content.faq} config={config} />}
    </div>
  );
}
