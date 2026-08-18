import React, { useState } from 'react';
import { Terminal, Play, CheckCircle, Clock, Zap, Cpu, Sparkles, Copy, Check } from 'lucide-react';

export default function InteractivePlaygroundSection({ demo, config }) {
  const { tag, title, subtitle, demoPrompt, thoughtSteps, outputPreview } = demo;
  const primary = config.primaryColor;
  const isDark = config.isDark;

  const [promptInput, setPromptInput] = useState(demoPrompt || '');
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(thoughtSteps ? thoughtSteps.length : 3);
  const [hasCopied, setHasCopied] = useState(false);

  const runSimulation = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= (thoughtSteps ? thoughtSteps.length : 3)) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 450);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputPreview || '');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto" id="demo">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div 
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-4 border"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
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

      {/* Interactive Sandbox Card */}
      <div 
        className="rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden"
        style={{
          backgroundColor: isDark ? 'rgba(15, 20, 31, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Sandbox Header */}
        <div className="p-6 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            <span className="ml-3 font-mono text-xs opacity-60">claude-runtime-kernel • v3.5-sonnet</span>
          </div>

          <button 
            onClick={runSimulation}
            disabled={isRunning}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 transition-all hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: primary }}
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Synthesizing...' : 'Run Live Inference'}</span>
          </button>
        </div>

        {/* Prompt Input Box */}
        <div className="p-6 border-b bg-neutral-500/5" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
          <label className="block text-xs font-mono opacity-60 uppercase mb-2">Prompt Directive</label>
          <div className="relative">
            <input 
              type="text" 
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 bg-transparent"
              style={{
                borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
              }}
            />
          </div>
        </div>

        {/* Thought Steps Output */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Trace */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider opacity-60 mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              <span>Cognitive Step Telemetry</span>
            </h4>
            
            <div className="space-y-3 font-mono text-xs">
              {thoughtSteps && thoughtSteps.map((step, idx) => {
                const isVisible = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex - 1;

                return (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all duration-300 ${
                      isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-20 -translate-x-2'
                    }`}
                    style={{
                      backgroundColor: isCurrent ? `${primary}15` : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                      borderColor: isCurrent ? primary : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{step.step}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-500/20" style={{ color: primary }}>{step.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Verified Output */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-mono uppercase tracking-wider opacity-60 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Synthesized Output</span>
                </h4>
                
                <button 
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 text-xs font-mono opacity-60 hover:opacity-100 transition-opacity"
                >
                  {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{hasCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div 
                className="p-5 rounded-2xl border text-sm sm:text-base leading-relaxed font-sans relative"
                style={{
                  backgroundColor: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                  borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                }}
              >
                {outputPreview}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono opacity-60" style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
              <span>Verification status: 100% Deterministic</span>
              <span className="text-emerald-400 font-bold">● ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
