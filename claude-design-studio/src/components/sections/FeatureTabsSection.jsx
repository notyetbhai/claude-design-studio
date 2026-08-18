import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Layers } from 'lucide-react';

export default function FeatureTabsSection({ featuresTab, config }) {
  const { tag, title, subtitle, tabs } = featuresTab;
  const primary = config.primaryColor;
  const isDark = config.isDark;

  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeTab = tabs && tabs[activeTabIdx] ? tabs[activeTabIdx] : null;

  const handleCopyCode = () => {
    if (activeTab && activeTab.codeSnippet) {
      navigator.clipboard.writeText(activeTab.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="architecture">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4 border"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{tag}</span>
        </div>
        
        <h2 
          className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          style={{ fontFamily: config.fontHeading }}
        >
          {title}
        </h2>
        
        <p className="text-base opacity-75">
          {subtitle}
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs && tabs.map((tab, idx) => (
          <button
            key={tab.id || idx}
            onClick={() => setActiveTabIdx(idx)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
              activeTabIdx === idx
                ? 'shadow-lg text-white font-semibold'
                : 'opacity-70 hover:opacity-100 hover:bg-neutral-500/10'
            }`}
            style={{
              backgroundColor: activeTabIdx === idx ? primary : 'transparent',
              borderColor: activeTabIdx === idx ? primary : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Active Tab Showcase Box */}
      {activeTab && (
        <div 
          className="rounded-3xl border backdrop-blur-xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12"
          style={{
            backgroundColor: isDark ? 'rgba(15, 20, 31, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Left: Explanations */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
          >
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider" style={{ color: primary }}>
                MODULE {String(activeTabIdx + 1).padStart(2, '0')}
              </span>
              <h3 
                className="text-2xl sm:text-3xl font-bold mt-2 mb-4 tracking-tight"
                style={{ fontFamily: config.fontHeading }}
              >
                {activeTab.heading}
              </h3>
              <p className="text-sm sm:text-base opacity-75 leading-relaxed">
                {activeTab.description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t flex items-center gap-3 text-xs opacity-60 font-mono" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <span>✓ Production Ready</span>
              <span>•</span>
              <span>✓ Zero External Dependencies</span>
            </div>
          </div>

          {/* Right: Code Snippet */}
          <div className="lg:col-span-7 p-6 sm:p-8 bg-black/40 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono opacity-60">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span>source.ts</span>
              </div>
              <button 
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="text-xs sm:text-sm font-mono overflow-x-auto text-neutral-200 leading-relaxed p-2">
              <code>{activeTab.codeSnippet}</code>
            </pre>

            <div className="mt-6 text-[11px] font-mono text-neutral-500">
              // Native TypeScript & JSON Schema compliant
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
