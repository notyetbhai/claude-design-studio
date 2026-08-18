import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Play, 
  Terminal, 
  Zap, 
  Check, 
  Server, 
  Database, 
  Code2, 
  ShieldCheck, 
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AutonomousPlannerPage({
  config,
  template,
  apiConfig,
  currentUser,
  onApplyPlannedSystem,
  onNavigate,
}) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [projectGoal, setProjectGoal] = useState('Autonomous AI Drone Fleet Logistics & Real-time Edge Telemetry Platform');
  const [isPlanning, setIsPlanning] = useState(false);
  const [currentStep, setCurrentStep] = useState(4);
  const [planGenerated, setPlanGenerated] = useState(true);

  const plannerTemplates = [
    'Autonomous AI Drone Fleet Logistics & Real-time Edge Telemetry Platform',
    'Quantum Crypto Ledger with Automated Yield Balancing & Audit Matrix',
    'BioTech Longevity Trial Intelligence & Cellular Health Dashboard',
    'Developer-first Distributed Vector Cloud with Multi-tenant Edge Indexing',
  ];

  const handleGeneratePlan = (goalToUse) => {
    const goal = goalToUse || projectGoal;
    if (!goal.trim()) return;
    setIsPlanning(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsPlanning(false);
          setPlanGenerated(true);
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
          return 4;
        }
        return prev + 1;
      });
    }, 450);
  };

  const handleApplyPlanToCanvas = () => {
    if (onApplyPlannedSystem) {
      onApplyPlannedSystem(projectGoal);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.3 } });
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 md:p-10 font-sans space-y-10">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-black font-bold shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white font-serif">
              Autonomous AI System Architect & Planner
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              AGENT v4.0
            </span>
          </div>
          <p className="text-sm opacity-60 mt-1">
            Specify any high-level product goal. The agent automatically plans the architecture, multi-page layout, schemas, and styling.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Engine: {apiConfig.provider === 'nvidia' ? 'NVIDIA NIM Nemotron' : 'Claude 3.5 Sonnet'}</span>
        </div>
      </div>

      {/* Goal Input & Planner Triggers */}
      <div className="p-6 md:p-8 rounded-3xl border backdrop-blur-2xl space-y-5"
        style={{
          backgroundColor: isDark ? 'rgba(18, 22, 33, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Autonomous Goal Specification Directive</span>
          </label>
          <span className="text-[11px] font-mono text-neutral-400">Plan & Synthesize by Own</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={projectGoal}
            onChange={(e) => setProjectGoal(e.target.value)}
            placeholder="e.g. AI Autonomous Drone Fleet Logistics & Real-time Telemetry..."
            className="flex-1 p-3.5 rounded-2xl border bg-black/50 text-white font-sans text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-inner"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          />

          <button
            onClick={() => handleGeneratePlan(projectGoal)}
            disabled={isPlanning || !projectGoal.trim()}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isPlanning ? 'animate-spin' : ''}`} />
            <span>{isPlanning ? 'Autonomous Agent Planning...' : 'Auto-Plan Full Architecture'}</span>
          </button>
        </div>

        {/* Quick Goal Presets */}
        <div className="flex flex-wrap gap-2 pt-2">
          {plannerTemplates.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setProjectGoal(preset);
                handleGeneratePlan(preset);
              }}
              className="px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/5 hover:border-amber-500/30 text-[11px] font-mono text-neutral-300 transition-all flex items-center gap-1"
            >
              <span>+ {preset.slice(0, 36)}...</span>
            </button>
          ))}
        </div>
      </div>

      {/* Autonomous Plan Breakdown (4 Distinct Phases) */}
      {planGenerated && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold font-serif text-white">
                Autonomous System Architecture Blueprint
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">
                4-Phase Complete Specification for: <span className="text-emerald-400 font-bold">"{projectGoal}"</span>
              </p>
            </div>

            <button
              onClick={handleApplyPlanToCanvas}
              className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Plan to Multi-Page Live Canvas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phase 1: Tech Stack */}
            <div className="p-6 rounded-3xl border backdrop-blur-xl bg-black/40 space-y-4"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                <Server className="w-4 h-4" />
                <span>PHASE 1: TECH STACK</span>
              </div>
              <h3 className="font-bold text-lg font-serif">Inference & Engine</h3>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">✓ NVIDIA NIM Nemotron 70B</li>
                <li className="flex items-center gap-2">✓ HNSW Edge Vector DB</li>
                <li className="flex items-center gap-2">✓ Express REST & MCP Gateway</li>
                <li className="flex items-center gap-2">✓ Sub-2ms WebSocket Bus</li>
              </ul>
            </div>

            {/* Phase 2: Design Tokens */}
            <div className="p-6 rounded-3xl border backdrop-blur-xl bg-black/40 space-y-4"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <Layers className="w-4 h-4" />
                <span>PHASE 2: DESIGN SYSTEM</span>
              </div>
              <h3 className="font-bold text-lg font-serif">Claude Styling Tokens</h3>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">✓ Warm Clay `#CC6B49` Accent</li>
                <li className="flex items-center gap-2">✓ Obsidian `#090D16` Neutral</li>
                <li className="flex items-center gap-2">✓ Instrument Serif + Inter</li>
                <li className="flex items-center gap-2">✓ 1px Hairline Frosted Borders</li>
              </ul>
            </div>

            {/* Phase 3: Multi-Page Suite */}
            <div className="p-6 rounded-3xl border backdrop-blur-xl bg-black/40 space-y-4"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                <Code2 className="w-4 h-4" />
                <span>PHASE 3: MULTI-PAGE SUITE</span>
              </div>
              <h3 className="font-bold text-lg font-serif">Dedicated Pages</h3>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">✓ 1. Home / Landing Page</li>
                <li className="flex items-center gap-2">✓ 2. Features & 12-Col Bento</li>
                <li className="flex items-center gap-2">✓ 3. Agent Dashboard (48k TPS)</li>
                <li className="flex items-center gap-2">✓ 4. Docs, Pricing, & Research</li>
              </ul>
            </div>

            {/* Phase 4: Protocol & Security */}
            <div className="p-6 rounded-3xl border backdrop-blur-xl bg-black/40 space-y-4"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
            >
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-rose-400">
                <ShieldCheck className="w-4 h-4" />
                <span>PHASE 4: PROTOCOL & MCP</span>
              </div>
              <h3 className="font-bold text-lg font-serif">Security & MCP Gateway</h3>
              <ul className="space-y-2 text-xs text-neutral-300 font-mono">
                <li className="flex items-center gap-2">✓ Claude Desktop MCP Server</li>
                <li className="flex items-center gap-2">✓ Zero-Data Retention SLA</li>
                <li className="flex items-center gap-2">✓ Automated Red-Team Defense</li>
                <li className="flex items-center gap-2">✓ SOC2 Type II Certified</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
