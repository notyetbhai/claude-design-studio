import React, { useState } from 'react';
import { Terminal, Play, CheckCircle, Clock, Zap, Cpu, Sparkles, Copy, Check, RotateCcw } from 'lucide-react';
import InteractivePlaygroundSection from '../components/sections/InteractivePlaygroundSection';

export default function PlaygroundPage({ config, template }) {
  const { content } = template;
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto space-y-12 font-sans">
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
          <Zap className="w-3.5 h-3.5" />
          <span>Interactive Sandbox Portal</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: config.fontHeading }}>
          Live Cognitive Inference Playground
        </h1>
        <p className="text-base sm:text-lg opacity-75 leading-relaxed">
          Test multi-turn reasoning, view internal constitutional verification step traces, and benchmark latency in real-time.
        </p>
      </div>

      {/* Main Interactive Playground Component */}
      {content.interactiveDemo && (
        <InteractivePlaygroundSection demo={content.interactiveDemo} config={config} />
      )}
    </div>
  );
}
