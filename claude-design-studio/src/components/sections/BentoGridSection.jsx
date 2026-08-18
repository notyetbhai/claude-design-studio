import React, { useState } from 'react';
import { Sparkles, Shield, Cpu, Network, Check, Sliders, Layers, ArrowUpRight } from 'lucide-react';

export default function BentoGridSection({ bento, config }) {
  const { tag, title, subtitle, cards } = bento;
  const primary = config.primaryColor;
  const accent = config.accentColor;
  const isDark = config.isDark;

  // Interactive slider state for Bento Card 1
  const [alignmentLevel, setAlignmentLevel] = useState(96);
  // Interactive active node for Bento Card 4
  const [activeNode, setActiveNode] = useState(2);

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto" id="capabilities">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
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
          className="text-3xl sm:text-5xl font-bold tracking-tight mb-5"
          style={{ fontFamily: config.fontHeading }}
        >
          {title}
        </h2>
        
        <p className="text-base sm:text-lg opacity-75 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-12 gap-6 lg:gap-8">
        {cards && cards.map((card, idx) => {
          const isWide = card.colSpan.includes('md:col-span-8');

          return (
            <div
              key={card.id || idx}
              className={`${card.colSpan} rounded-3xl p-8 sm:p-10 border relative overflow-hidden backdrop-blur-xl group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between`}
              style={{
                backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
              }}
            >
              {/* Subtle ambient corner gradient on hover */}
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: primary }}
              />

              {/* Top Row: Badge & Action icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span 
                    className="px-3 py-1 rounded-lg text-xs font-mono font-semibold border tracking-wide"
                    style={{
                      backgroundColor: `${primary}12`,
                      borderColor: `${primary}26`,
                      color: primary,
                    }}
                  >
                    {card.badge}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:bg-neutral-500/10 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 
                  className="text-2xl sm:text-3xl font-bold tracking-tight mb-3"
                  style={{ fontFamily: config.fontHeading }}
                >
                  {card.title}
                </h3>
                
                <p className="text-sm sm:text-base opacity-70 leading-relaxed max-w-xl">
                  {card.description}
                </p>
              </div>

              {/* Bottom Interactive Component based on type */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                {card.interactiveType === 'alignment-slider' && (
                  <div className="p-4 rounded-xl bg-neutral-500/10 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="opacity-70">Alignment Rigor Index</span>
                      <span className="font-bold text-sm" style={{ color: primary }}>{alignmentLevel}% Verified</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" 
                      max="100" 
                      value={alignmentLevel} 
                      onChange={(e) => setAlignmentLevel(Number(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-neutral-500/20 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] opacity-50">
                      <span>Strict Neutrality</span>
                      <span>Zero Hallucination</span>
                      <span>Maximum Rigor</span>
                    </div>
                  </div>
                )}

                {card.interactiveType === 'needle-graph' && (
                  <div className="p-4 rounded-xl bg-neutral-500/10 font-mono text-xs space-y-2">
                    <div className="flex justify-between opacity-70">
                      <span>1M Token Density</span>
                      <span className="text-emerald-400 font-bold">99.98% Recall</span>
                    </div>
                    <div className="h-4 w-full bg-neutral-500/20 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '99.9%' }}></div>
                    </div>
                    <div className="text-[10px] opacity-50 text-right">0 loss in deep attention weights</div>
                  </div>
                )}

                {card.interactiveType === 'math-pill' && (
                  <div className="p-4 rounded-xl bg-neutral-500/10 font-mono text-xs space-y-2">
                    <div className="text-opacity-60 text-[11px] opacity-60">Symbolic Proof Tree:</div>
                    <div className="text-emerald-400 font-semibold bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                      ∀x ∈ Context: Verify(FormalLogic(x)) ≡ True
                    </div>
                  </div>
                )}

                {card.interactiveType === 'agent-flow' && (
                  <div className="p-4 rounded-xl bg-neutral-500/10 font-mono text-xs">
                    <div className="text-[11px] opacity-60 mb-2">Multi-Agent Checkpoints:</div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {['Ingress', 'Deconstruct', 'Execute Tool', 'Verify', 'Emit Output'].map((step, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => setActiveNode(sIdx)}
                          className={`px-3 py-1.5 rounded-lg text-[11px] whitespace-nowrap transition-all ${
                            activeNode === sIdx
                              ? 'bg-amber-500 text-white font-bold shadow-md'
                              : 'bg-neutral-500/20 opacity-70 hover:opacity-100'
                          }`}
                          style={{
                            backgroundColor: activeNode === sIdx ? primary : undefined,
                          }}
                        >
                          {step}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(!card.interactiveType || (card.interactiveType !== 'alignment-slider' && card.interactiveType !== 'needle-graph' && card.interactiveType !== 'math-pill' && card.interactiveType !== 'agent-flow')) && (
                  <div className="flex items-center justify-between text-xs font-mono opacity-70">
                    <span>Precision Engine v4</span>
                    <span className="font-semibold" style={{ color: primary }}>Active & Protected</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
