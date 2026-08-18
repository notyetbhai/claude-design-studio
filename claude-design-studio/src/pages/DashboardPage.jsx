import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  ArrowUpRight, 
  CheckCircle2, 
  TrendingUp, 
  Key, 
  RefreshCw,
  Clock,
  Server,
  Database,
  Globe,
  Sliders,
  Copy,
  Check
} from 'lucide-react';

export default function DashboardPage({ config, template }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [tps, setTps] = useState(48210);
  const [latency, setLatency] = useState('1.84');
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedKey, setCopiedKey] = useState(false);

  // Live simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTps((prev) => Math.floor(46000 + Math.random() * 5000));
      setLatency((1.6 + Math.random() * 0.4).toFixed(2));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleCopyKey = () => {
    navigator.clipboard.writeText('sk-ant-api03-live_9984_kL92xZ...');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b"
        style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: config.fontHeading }}>
              Autonomous Control Matrix
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>CLUSTER LIVE</span>
            </span>
          </div>
          <p className="text-sm opacity-60 mt-1">
            Real-time inference telemetry, agent orchestration, and sub-millisecond edge routing.
          </p>
        </div>

        {/* Global Key Quick Access */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl border flex items-center gap-3 bg-neutral-900/60"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs opacity-70">sk-ant-api03-live_••••••••</span>
            <button onClick={handleCopyKey} className="text-xs opacity-60 hover:opacity-100 transition-opacity">
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button 
            className="px-4 py-2.5 rounded-xl text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
            style={{ backgroundColor: primary }}
          >
            + Deploy Agent
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl border backdrop-blur-xl"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between opacity-60 text-xs font-mono mb-3">
            <span>LIVE THROUGHPUT</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight" style={{ color: primary }}>
            {tps.toLocaleString()} <span className="text-xs font-sans text-neutral-400">TPS</span>
          </div>
          <div className="text-xs opacity-60 mt-2 flex items-center gap-1 text-emerald-400 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% from last hour</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border backdrop-blur-xl"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between opacity-60 text-xs font-mono mb-3">
            <span>P99 EDGE LATENCY</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight text-emerald-400">
            {latency} <span className="text-xs font-sans text-neutral-400">ms</span>
          </div>
          <div className="text-xs opacity-60 mt-2 font-mono">
            Direct Frankfurt & N.Virginia edge PoPs
          </div>
        </div>

        <div className="p-6 rounded-2xl border backdrop-blur-xl"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between opacity-60 text-xs font-mono mb-3">
            <span>PROMPT CACHE RATIO</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight" style={{ color: primary }}>
            94.8%
          </div>
          <div className="text-xs opacity-60 mt-2 font-mono text-emerald-400">
            Saved $14,280 in token costs
          </div>
        </div>

        <div className="p-6 rounded-2xl border backdrop-blur-xl"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between opacity-60 text-xs font-mono mb-3">
            <span>SECURITY GUARDRAIL</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight text-emerald-400">
            100%
          </div>
          <div className="text-xs opacity-60 mt-2 font-mono">
            0 injection exploits bypassed
          </div>
        </div>
      </div>

      {/* Main Grid: Active Telemetry Pipeline & Live Agent Traces */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Deployment Clusters (7 cols) */}
        <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl border backdrop-blur-xl space-y-6"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg" style={{ fontFamily: config.fontHeading }}>
                Active Production Clusters
              </h3>
              <p className="text-xs opacity-60 font-mono">Multi-region active-active failover mesh</p>
            </div>
            <span className="text-xs font-mono opacity-50">24 Nodes Active</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {[
              { name: 'us-east-virginia-cluster-01', load: '64%', latency: '1.2ms', status: 'Optimal' },
              { name: 'eu-west-frankfurt-cluster-04', load: '48%', latency: '1.8ms', status: 'Optimal' },
              { name: 'ap-northeast-tokyo-cluster-02', load: '72%', latency: '2.4ms', status: 'Optimal' },
              { name: 'us-west-oregon-gpu-cluster-09', load: '88%', latency: '1.4ms', status: 'Scaling' },
            ].map((node, idx) => (
              <div key={idx} className="p-4 rounded-xl border bg-black/30 flex items-center justify-between"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="font-semibold text-white">{node.name}</div>
                    <div className="text-[11px] text-neutral-400">Load: {node.load} • Latency: {node.latency}</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Agent Step-by-Step Thought Traces (5 cols) */}
        <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl border backdrop-blur-xl space-y-6"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-lg" style={{ fontFamily: config.fontHeading }}>
                Live Thought Traces
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-500/20 text-neutral-300">STREAMING</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl border bg-black/40 border-amber-500/30">
              <div className="flex justify-between text-amber-400 font-bold mb-1">
                <span>[AGENT_04] ContractReasoning</span>
                <span>412ms</span>
              </div>
              <p className="text-neutral-300 text-[11px] leading-relaxed">
                Deconstructing indemnification clauses across 48 jurisdictions... 100% compliance verified.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border bg-black/40" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between text-neutral-400 font-bold mb-1">
                <span>[AGENT_09] VectorDeduplication</span>
                <span>84ms</span>
              </div>
              <p className="text-neutral-400 text-[11px]">
                Pruned 1,420 redundant embeddings from active tenant memory shard.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border bg-black/40" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <div className="flex justify-between text-neutral-400 font-bold mb-1">
                <span>[AGENT_12] CodeRefactorSynthesis</span>
                <span>190ms</span>
              </div>
              <p className="text-neutral-400 text-[11px]">
                Emitted zero-copy Rust FFI binding with SIMD vectorization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
