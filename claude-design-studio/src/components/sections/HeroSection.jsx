import React, { useState } from 'react';
import { Sparkles, ArrowRight, Play, Terminal, CheckCircle2, Shield, Zap, RefreshCw } from 'lucide-react';

export default function HeroSection({ hero, config, brandName }) {
  const { badge, titlePrefix, titleHighlight, titleSuffix, subtitle, primaryCta, secondaryCta, announcement, stats } = hero;
  const primary = config.primaryColor;
  const accent = config.accentColor;
  const isDark = config.isDark;
  
  // Interactive live playground state in hero preview
  const [activePromptTab, setActivePromptTab] = useState('thought');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(99.4);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSimulatedScore((99.1 + Math.random() * 0.8).toFixed(2));
      setIsSimulating(false);
    }, 600);
  };

  return (
    <section className="relative pt-20 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[400px] pointer-events-none -z-10 opacity-30 blur-[130px] rounded-full"
        style={{ background: `radial-gradient(circle, ${primary} 0%, ${accent} 70%)` }}
      />

      <div className="max-w-4xl mx-auto text-center">
        {/* Pill Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border mb-8 backdrop-blur-md shadow-sm transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}33`,
            color: primary,
          }}
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{badge}</span>
        </div>

        {/* Main Headline with Editorial Serif / Highlight */}
        <h1 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.08]"
          style={{ fontFamily: config.fontHeading }}
        >
          {titlePrefix}{' '}
          <span 
            className="italic font-normal relative inline-block px-1"
            style={{ color: primary }}
          >
            {titleHighlight}
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-current opacity-30" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </span>{' '}
          {titleSuffix}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl opacity-75 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button 
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-medium text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:opacity-95 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 group"
            style={{ backgroundColor: primary, boxShadow: `0 12px 30px -8px ${primary}55` }}
          >
            <span>{primaryCta}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={triggerSimulation}
            className="w-full sm:w-auto px-7 py-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all hover:bg-neutral-500/10 backdrop-blur-md"
            style={{
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <Play className="w-3.5 h-3.5 fill-current opacity-70" />
            <span>{secondaryCta}</span>
          </button>
        </div>

        {/* Announcement sub-badge */}
        {announcement && (
          <div className="text-xs opacity-60 font-mono flex items-center justify-center gap-2 mb-14">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span>{announcement}</span>
          </div>
        )}
      </div>

      {/* Interactive Hero Preview Frame (Claude Artifacts / Telemetry Window) */}
      <div 
        className="max-w-4xl mx-auto rounded-2xl border backdrop-blur-2xl overflow-hidden shadow-2xl transition-all"
        style={{
          backgroundColor: isDark ? 'rgba(17, 23, 38, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
          boxShadow: isDark 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Window Chrome */}
        <div className="px-5 py-3.5 border-b flex items-center justify-between"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="ml-2 text-xs font-mono opacity-50 font-medium">artifact: cognitive-kernel.ts</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <button 
              onClick={() => setActivePromptTab('thought')}
              className={`px-2.5 py-1 rounded-md transition-colors ${activePromptTab === 'thought' ? 'bg-neutral-500/20 font-semibold text-current' : 'opacity-50 hover:opacity-80'}`}
            >
              Chain of Thought
            </button>
            <button 
              onClick={() => setActivePromptTab('telemetry')}
              className={`px-2.5 py-1 rounded-md transition-colors ${activePromptTab === 'telemetry' ? 'bg-neutral-500/20 font-semibold text-current' : 'opacity-50 hover:opacity-80'}`}
            >
              Live Telemetry
            </button>
            <button 
              onClick={triggerSimulation} 
              title="Re-run Simulation"
              className="p-1 hover:bg-neutral-500/20 rounded text-xs opacity-60 hover:opacity-100 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 font-mono text-xs sm:text-sm text-left">
          {activePromptTab === 'thought' ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs opacity-60 font-semibold">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>[REASONING_TRACE] Step-by-step verification pipeline:</span>
              </div>
              
              <div className="space-y-2 pl-4 border-l-2 border-dashed" style={{ borderColor: `${primary}66` }}>
                <div className="flex items-center justify-between text-xs opacity-80 py-1">
                  <span>✓ 1. Ingest multi-tenant request buffer & tokenize context</span>
                  <span className="font-semibold" style={{ color: primary }}>1.2ms</span>
                </div>
                <div className="flex items-center justify-between text-xs opacity-80 py-1">
                  <span>✓ 2. Apply constitutional safety & alignment bounds</span>
                  <span className="font-semibold" style={{ color: primary }}>0.8ms</span>
                </div>
                <div className="flex items-center justify-between text-xs opacity-80 py-1">
                  <span>✓ 3. Execute deterministic vector similarity traversal</span>
                  <span className="font-semibold" style={{ color: primary }}>2.4ms</span>
                </div>
                <div className="flex items-center justify-between text-xs opacity-80 py-1">
                  <span>✓ 4. Synthesize verified high-entropy response</span>
                  <span className="font-semibold" style={{ color: primary }}>3.1ms</span>
                </div>
              </div>

              <div 
                className="mt-4 p-4 rounded-xl border flex items-start gap-3"
                style={{
                  backgroundColor: `${primary}0d`,
                  borderColor: `${primary}26`,
                }}
              >
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: primary }} />
                <div className="leading-relaxed">
                  <span className="font-semibold">Verdict:</span> System confidence rated at <span className="font-bold underline">{simulatedScore}%</span>. Zero security anomalies detected across all active edge shards.
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
              <div className="p-3 rounded-lg bg-neutral-500/10">
                <div className="text-xs opacity-50 uppercase">Active TPS</div>
                <div className="text-lg font-bold mt-1 font-mono text-emerald-400">42,890</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-500/10">
                <div className="text-xs opacity-50 uppercase">p99 Latency</div>
                <div className="text-lg font-bold mt-1 font-mono" style={{ color: primary }}>1.84ms</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-500/10">
                <div className="text-xs opacity-50 uppercase">Memory Footprint</div>
                <div className="text-lg font-bold mt-1 font-mono">18.2 MB</div>
              </div>
              <div className="p-3 rounded-lg bg-neutral-500/10">
                <div className="text-xs opacity-50 uppercase">Cluster Status</div>
                <div className="text-lg font-bold mt-1 font-mono text-emerald-400">NOMINAL</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-14">
          {stats.map((s, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl border text-center backdrop-blur-md transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.6)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.07)',
              }}
            >
              <div 
                className="text-3xl sm:text-4xl font-bold font-mono tracking-tight"
                style={{ color: primary }}
              >
                {s.value}
              </div>
              <div className="text-xs opacity-60 uppercase font-mono tracking-wider mt-2 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
