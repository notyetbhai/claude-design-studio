import React, { useState } from 'react';
import { 
  Layers, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Terminal, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sliders,
  Filter,
  Eye
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ComponentsPage({ config, template }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Components' },
    { id: 'heroes', label: 'Hero Sections' },
    { id: 'bento', label: 'Bento Grids' },
    { id: 'interactive', label: 'Live Widgets & Telemetry' },
    { id: 'pricing', label: 'Pricing Tables' },
    { id: 'cards', label: 'Glass Cards & Pills' },
  ];

  const components = [
    {
      id: 'hero-editorial',
      name: 'Claude Editorial Hero with Pill Badge',
      category: 'heroes',
      description: 'Signature Instrument Serif display headline with italic keyword underline, animated pill badge, and dual conversion CTAs.',
      code: `<section className="pt-24 pb-16 px-6 max-w-5xl mx-auto text-center">
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-[#CC6B49]/10 text-[#CC6B49] border border-[#CC6B49]/30 mb-8 animate-pulse">
    ✨ Introducing Next-Gen Reasoning Engine
  </div>
  <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 font-serif">
    Intelligence crafted for <span className="italic font-normal text-[#CC6B49] underline decoration-[#D97706]/30 decoration-wavy">human discovery</span>.
  </h1>
  <p className="text-lg text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-10">
    A foundational reasoning system designed with unprecedented nuance, constitutional alignment, and mathematical rigor.
  </p>
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    <button className="px-8 py-4 rounded-xl bg-[#CC6B49] text-white font-semibold text-xs uppercase tracking-wider shadow-xl shadow-[#CC6B49]/25 hover:opacity-90 transition-all">
      Start Free Trial →
    </button>
  </div>
</section>`,
    },
    {
      id: 'bento-asymmetrical',
      name: '12-Column Asymmetrical Bento Grid',
      category: 'bento',
      description: '8-col and 4-col asymmetrical card splits with interactive sliders and recall percentage gauges.',
      code: `<div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto">
  <div className="col-span-12 md:col-span-8 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#CC6B49]/40 transition-all">
    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#CC6B49]/10 text-[#CC6B49]">Safe Alignment v4</span>
    <h3 className="text-2xl font-bold font-serif mt-4 mb-2">Constitutional Nuance & Alignment</h3>
    <p className="text-sm text-neutral-400">Self-improving safety loops refusing harmful actions while maintaining maximum helpfulness.</p>
  </div>
  <div className="col-span-12 md:col-span-4 p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#CC6B49]/10 text-[#CC6B49]">Long Context</span>
    <h3 className="text-2xl font-bold font-serif mt-4 mb-2">1M+ Token Recall</h3>
    <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold text-center">
      99.98% Accuracy Score
    </div>
  </div>
</div>`,
    },
    {
      id: 'telemetry-tracer',
      name: 'Interactive Thought-Trace Terminal Widget',
      category: 'interactive',
      description: 'Simulates transparent multi-step reasoning with sub-millisecond execution duration tokens.',
      code: `<div className="rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl font-mono text-xs">
  <div className="px-5 py-3 border-b border-white/10 flex items-center justify-between bg-neutral-900/80">
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
      <span className="ml-2 text-neutral-400">reasoning-trace • v3.5</span>
    </div>
    <span className="text-emerald-400 font-bold">100% Deterministic</span>
  </div>
  <div className="p-6 space-y-3">
    <div className="p-3 rounded-xl bg-white/5 flex justify-between">
      <span>✓ 1. Ingest context & verify schemas</span>
      <span className="text-[#CC6B49] font-bold">1.2ms</span>
    </div>
    <div className="p-3 rounded-xl bg-white/5 flex justify-between">
      <span>✓ 2. Execute HNSW vector similarity traversal</span>
      <span className="text-[#CC6B49] font-bold">2.4ms</span>
    </div>
  </div>
</div>`,
    },
    {
      id: 'pricing-card-pro',
      name: 'Pro Tier Pricing Card with Floating Badge',
      category: 'pricing',
      description: 'Highlighted pricing card with popular pill badge, feature checkmarks, and high-conversion CTA button.',
      code: `<div className="p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl ring-2 ring-[#CC6B49] shadow-2xl shadow-[#CC6B49]/20 flex flex-col justify-between relative scale-105">
  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#CC6B49] text-white uppercase tracking-widest">
    Most Popular
  </div>
  <div>
    <span className="text-xs font-mono uppercase text-[#CC6B49] font-bold">Pro Organization</span>
    <h3 className="text-3xl font-bold font-serif mt-1 mb-2">Unlimited Capacity</h3>
    <div className="text-4xl font-bold font-mono text-[#CC6B49] my-4">$49<span className="text-xs text-neutral-400 font-sans"> / seat / mo</span></div>
    <ul className="space-y-3 text-sm text-neutral-200 mb-8">
      <li>✓ 1,000,000 token context window</li>
      <li>✓ Sub-second streaming priority</li>
      <li>✓ Zero-data-retention guarantee</li>
      <li>✓ 24/7 dedicated engineering support</li>
    </ul>
  </div>
  <button className="w-full py-3.5 rounded-xl bg-[#CC6B49] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#CC6B49]/30 hover:opacity-90 transition-all">
    Unlock Pro Organization →
  </button>
</div>`,
    },
  ];

  const filtered = activeCategory === 'all' 
    ? components 
    : components.filter((c) => c.category === activeCategory);

  const handleCopyCode = (id, code) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 md:p-10 font-sans space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider border"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Open-Source UI Component Gallery</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif">
          Curated Claude-Aesthetic Component Library
        </h1>
        <p className="text-base text-neutral-400 leading-relaxed">
          Copy-paste production-ready React & Tailwind CSS component blocks engineered for high conversion, hairline precision, and editorial warmth.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-white shadow-md font-bold'
                : 'bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            style={{
              backgroundColor: activeCategory === cat.id ? primary : undefined,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Components Grid */}
      <div className="space-y-10">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="p-6 md:p-8 rounded-3xl border backdrop-blur-2xl bg-black/40 space-y-6 shadow-2xl"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold font-serif text-white">{comp.name}</h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl">{comp.description}</p>
              </div>

              <button
                onClick={() => handleCopyCode(comp.id, comp.code)}
                className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-mono text-xs font-semibold flex items-center gap-2 border border-white/10 transition-all hover:scale-105 flex-shrink-0"
              >
                {copiedId === comp.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === comp.id ? 'Copied JSX!' : 'Copy Component'}</span>
              </button>
            </div>

            {/* Code Box */}
            <div className="rounded-2xl bg-[#05070c] border border-white/10 p-5 overflow-x-auto font-mono text-xs text-neutral-300 leading-relaxed shadow-inner">
              <pre>
                <code>{comp.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
