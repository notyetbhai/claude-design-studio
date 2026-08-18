import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  TrendingDown, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers 
} from 'lucide-react';

export default function PricingCalculatorPage({ config }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [monthlyTokensMillions, setMonthlyTokensMillions] = useState(50);
  const [usePromptCaching, setUsePromptCaching] = useState(true);
  const [concurrency, setConcurrency] = useState(25);

  // Price calculations
  const rawCost = monthlyTokensMillions * 3.0; // $3 per million tokens standard
  const cachedCost = usePromptCaching ? rawCost * 0.25 : rawCost; // 75% savings with caching
  const legacyCost = monthlyTokensMillions * 10.0;
  const totalSavings = Math.round(legacyCost - cachedCost);

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-6 md:p-12 font-sans space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-4"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive ROI & Volume Model</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: config.fontHeading }}>
          Predictable Token Economics
        </h1>
        <p className="text-base sm:text-lg opacity-75 leading-relaxed">
          Scale effortlessly from prototyping to billions of tokens with prompt caching and sub-second edge routing.
        </p>
      </div>

      {/* Main Interactive Calculator Card */}
      <div className="p-8 md:p-12 rounded-3xl border backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 shadow-2xl"
        style={{
          backgroundColor: isDark ? 'rgba(18, 22, 33, 0.75)' : 'rgba(255, 255, 255, 0.85)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Left: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex justify-between items-center mb-2 font-mono">
              <label className="text-xs uppercase opacity-70 font-bold">Monthly Inference Volume</label>
              <span className="text-base font-bold" style={{ color: primary }}>
                {monthlyTokensMillions} Million Tokens
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              step="5"
              value={monthlyTokensMillions}
              onChange={(e) => setMonthlyTokensMillions(Number(e.target.value))}
              className="w-full h-2 bg-neutral-500/20 rounded-lg cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] font-mono opacity-50 mt-1">
              <span>5M (Hobby)</span>
              <span>100M (Scale)</span>
              <span>500M+ (Enterprise)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2 font-mono">
              <label className="text-xs uppercase opacity-70 font-bold">Peak Concurrency (RPM)</label>
              <span className="text-base font-bold text-white">
                {concurrency * 100} RPM
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="w-full h-2 bg-neutral-500/20 rounded-lg cursor-pointer accent-amber-500"
            />
          </div>

          {/* Prompt Caching Toggle */}
          <div className="p-4 rounded-2xl border flex items-center justify-between bg-black/30"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
          >
            <div>
              <div className="font-bold text-xs text-white flex items-center gap-2">
                <span>Enable Intelligent Prompt Caching</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold">-75% OFF</span>
              </div>
              <p className="text-[11px] opacity-60 mt-0.5">Saves recurring system prompt inference cost.</p>
            </div>

            <input
              type="checkbox"
              checked={usePromptCaching}
              onChange={(e) => setUsePromptCaching(e.target.checked)}
              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Right: Real-time Cost Estimation Card (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-2xl border bg-black/40 flex flex-col justify-between"
          style={{ borderColor: `${primary}33` }}
        >
          <div>
            <span className="text-xs font-mono uppercase text-neutral-400 font-semibold block mb-1">
              Estimated Monthly Investment
            </span>
            <div className="text-4xl sm:text-5xl font-bold font-mono tracking-tight" style={{ color: primary }}>
              ${Math.round(cachedCost).toLocaleString()}
              <span className="text-xs font-sans text-neutral-400 font-normal"> / mo</span>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
              <TrendingDown className="w-4 h-4 flex-shrink-0" />
              <span>You save ~${totalSavings.toLocaleString()}/mo vs legacy providers</span>
            </div>

            <ul className="mt-6 space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-center gap-2">✓ 1,000,000 token context window</li>
              <li className="flex items-center gap-2">✓ Sub-second streaming priority</li>
              <li className="flex items-center gap-2">✓ 99.999% SLA Uptime guarantee</li>
              <li className="flex items-center gap-2">✓ Strict Zero-Data Retention SLA</li>
            </ul>
          </div>

          <button className="w-full mt-8 py-3.5 rounded-xl text-white font-medium text-xs tracking-wider uppercase shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: primary }}
          >
            <span>Activate Volume Tier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
