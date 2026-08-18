import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Shield, 
  Zap, 
  RefreshCw, 
  Star, 
  Terminal, 
  Copy, 
  Check, 
  Server, 
  Cpu, 
  Users, 
  Download 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HomePage({ config, template, onNavigate }) {
  const { content } = template;
  const { hero, logos } = content;
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [activeCliTab, setActiveCliTab] = useState('npx');
  const [copiedCli, setCopiedCli] = useState(false);

  const cliCommands = {
    npx: 'npx @anthra/studio init my-app',
    pnpm: 'pnpm create @anthra/app',
    docker: 'docker run -d -p 3000:3000 ghcr.io/anthra-design/studio:latest',
    git: 'git clone https://github.com/anthra-design/claude-design-studio.git',
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommands[activeCliTab]);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 max-w-5xl mx-auto text-center relative">
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium border mb-8 backdrop-blur-md shadow-sm transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}33`,
            color: primary,
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Open-Source v2.4.0 • Apache-2.0 • NVIDIA NIM Accelerated</span>
        </div>

        <h1 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.08]"
          style={{ fontFamily: config.fontHeading }}
        >
          {hero.titlePrefix}{' '}
          <span 
            className="italic font-normal relative inline-block px-1"
            style={{ color: primary }}
          >
            {hero.titleHighlight}
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-current opacity-30" viewBox="0 0 100 12" preserveAspectRatio="none">
              <path d="M0,8 Q50,0 100,8" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </span>{' '}
          {hero.titleSuffix}
        </h1>

        <p className="text-lg sm:text-xl opacity-75 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          {hero.subtitle}
        </p>

        {/* Quick Action Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button 
            onClick={() => onNavigate('planner')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-medium text-sm shadow-xl flex items-center justify-center gap-2 transition-all hover:opacity-95 hover:scale-105 active:scale-100"
            style={{ backgroundColor: primary, boxShadow: `0 12px 30px -8px ${primary}55` }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Autonomous Planner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-7 py-4 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 transition-all hover:bg-neutral-500/10 backdrop-blur-md"
            style={{
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <span>Live Control Dashboard</span>
          </button>
        </div>

        {/* Open-Source Interactive CLI Quickstart Widget */}
        <div className="max-w-2xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-black/60 shadow-2xl font-mono text-xs text-left">
          <div className="px-4 py-2.5 border-b border-white/10 bg-neutral-900/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
              <div className="ml-2 flex gap-2">
                {['npx', 'pnpm', 'docker', 'git'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCliTab(tab)}
                    className={`px-2 py-0.5 rounded transition-colors text-[11px] ${
                      activeCliTab === tab ? 'bg-white/10 text-white font-bold' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopyCli}
              className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
            >
              {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCli ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="p-4 text-emerald-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 select-none">$</span>
              <span className="text-neutral-100">{cliCommands[activeCliTab]}</span>
            </div>
            <span className="text-[10px] text-neutral-500 hidden sm:inline font-mono">zero-config setup</span>
          </div>
        </div>
      </section>

      {/* Open-Source Telemetry Grid */}
      <section className="py-12 border-y border-white/10 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono">
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">14.8k ★</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase">GitHub Stars</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-emerald-400 tracking-tight">100%</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase">Free & Open Source</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-white tracking-tight">&lt; 2ms</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase">NVIDIA NIM TTFT</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-400 tracking-tight">Apache 2.0</div>
            <div className="text-xs text-neutral-400 mt-1 uppercase">Commercial Friendly</div>
          </div>
        </div>
      </section>

      {/* Separate Pages Showcase */}
      <section className="max-w-6xl mx-auto px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-clay">
            MODULAR APPLICATION SUITE
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-2 mb-4 tracking-tight" style={{ fontFamily: config.fontHeading }}>
            Separate Dedicated Modules
          </h2>
          <p className="text-base opacity-75">
            Click into any standalone application page to explore deep features, live telemetries, and developer documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            onClick={() => onNavigate('features')}
            className="p-8 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl cursor-pointer group hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-clay">MODULE 01</span>
              <h3 className="text-2xl font-bold mt-2 mb-3 font-serif">Capabilities & Bento Grid</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Full 12-column asymmetrical bento layout, alignment invariants, and formal mathematical logic proofs.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Open Features Page →</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('planner')}
            className="p-8 rounded-3xl border border-emerald-500/30 bg-emerald-950/20 backdrop-blur-xl cursor-pointer group hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">MODULE 02</span>
              <h3 className="text-2xl font-bold mt-2 mb-3 font-serif">Autonomous System Architect</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Plan anything on your own in natural language. Generates complete multi-page roadmaps and schemas.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Launch Auto-Planner →</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('dashboard')}
            className="p-8 rounded-3xl border border-white/10 bg-neutral-900/60 backdrop-blur-xl cursor-pointer group hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-2xl transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-clay">MODULE 03</span>
              <h3 className="text-2xl font-bold mt-2 mb-3 font-serif">Agent Control Dashboard</h3>
              <p className="text-sm opacity-70 leading-relaxed">
                Live inference telemetry (48,210 TPS), p99 latency (1.84ms), and streaming agent thought traces.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Open Dashboard →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Contributors Banner */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <div className="p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs font-mono text-neutral-400">
            <Users className="w-4 h-4 text-amber-400" />
            <span>COMMUNITY-DRIVEN OPEN SOURCE PROJECT</span>
          </div>
          <h3 className="text-3xl font-bold font-serif mb-3">Crafted with Precision by Open-Source Builders</h3>
          <p className="text-sm opacity-70 max-w-xl mx-auto mb-6">
            Join over 14,000 developers, architects, and designers contributing to the next benchmark in software interfaces.
          </p>
          <div className="flex items-center justify-center gap-3 font-mono text-xs">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-2 transition-all">
              <span>GitHub Repository (Apache-2.0)</span>
            </a>
            <button onClick={() => onNavigate('docs')} className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-neutral-800 text-neutral-300 transition-all">
              Read Contributor Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
