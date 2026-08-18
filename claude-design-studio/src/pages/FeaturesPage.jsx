import React, { useState } from 'react';
import { Layers, Sparkles, Shield, Cpu, Network, ArrowUpRight, Sliders, Check } from 'lucide-react';
import BentoGridSection from '../components/sections/BentoGridSection';
import FeatureTabsSection from '../components/sections/FeatureTabsSection';
import MetricsSection from '../components/sections/MetricsSection';

export default function FeaturesPage({ config, template }) {
  const { content } = template;
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto space-y-20 font-sans">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4 border"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Dedicated Capabilities Page</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: config.fontHeading }}>
          Engineered for Extreme Nuance & Depth
        </h1>
        <p className="text-base sm:text-lg opacity-75 leading-relaxed">
          Explore our foundational reasoning architecture, multi-modal chain-of-thought verification, and sub-millisecond edge dispatch.
        </p>
      </div>

      {/* Bento Grid Section */}
      {content.bento && <BentoGridSection bento={content.bento} config={config} />}

      {/* Feature Tabs & Code Section */}
      {content.featuresTab && <FeatureTabsSection featuresTab={content.featuresTab} config={config} />}

      {/* Metrics Section */}
      {content.metrics && <MetricsSection metrics={content.metrics} config={config} />}
    </div>
  );
}
