import React, { useState } from 'react';
import { 
  Zap, 
  Key, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  RefreshCw, 
  AlertCircle,
  Cpu,
  Bot
} from 'lucide-react';
import { testApiConnection } from '../utils/aiApiService';
import confetti from 'canvas-confetti';

export default function ApiOnboardingPage({
  config,
  apiConfig,
  setApiConfig,
  currentUser,
  onApiConnected,
}) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [provider, setProvider] = useState(apiConfig.provider || 'nvidia');
  const [apiKey, setApiKey] = useState(apiConfig.apiKey || '');
  const [model, setModel] = useState(apiConfig.model || 'nvidia/llama-3.1-nemotron-70b-instruct');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await testApiConnection({
      provider,
      apiKey,
      model,
    });
    setTestResult(result);
    setTesting(false);
  };

  const handleCompleteActivation = (useLocal = false) => {
    const finalConfig = {
      ...apiConfig,
      provider: useLocal ? 'local' : provider,
      apiKey: useLocal ? '' : apiKey.trim(),
      model: useLocal ? 'built-in' : model,
    };

    setApiConfig(finalConfig);
    localStorage.setItem('claude_design_api_config', JSON.stringify(finalConfig));
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.4 } });

    if (onApiConnected) {
      onApiConnected(finalConfig);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans relative">
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ backgroundColor: '#10B981' }}
      />

      <div 
        className="w-full max-w-xl p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-7 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? 'rgba(18, 22, 33, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              STEP 2 OF 2 • ONBOARDING
            </span>
            <span className="text-xs text-neutral-400 font-mono">Logged in as {currentUser?.name || 'Alex Vance'}</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-white font-serif">
            Connect AI Engine & Activate Dashboard
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono leading-relaxed">
            Connect your NVIDIA NIM, Anthropic Claude, or OpenAI API key to start autonomous project planning and generation.
          </p>
        </div>

        {/* Engine Selection */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase text-amber-400 font-bold block">
            Select AI Inference Provider
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              onClick={() => {
                setProvider('nvidia');
                setModel('nvidia/llama-3.1-nemotron-70b-instruct');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                provider === 'nvidia'
                  ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/10'
                  : 'border-white/5 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span>NVIDIA NIM</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-200 font-bold">
                  ⭐ RECOMMENDED
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Nemotron 70B • H100 Accelerated</div>
            </button>

            <button
              onClick={() => {
                setProvider('anthropic');
                setModel('claude-3-5-sonnet-20241022');
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                provider === 'anthropic'
                  ? 'border-amber-500 bg-amber-500/15 text-white shadow-sm'
                  : 'border-white/5 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">Anthropic Claude</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                  Sonnet 3.5
                </span>
              </div>
              <div className="text-[11px] text-neutral-400 mt-1">Warm Editorial & Artifacts</div>
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase text-neutral-400 font-bold block">
            {provider === 'nvidia' ? 'Paste NVIDIA NIM API Key' : 'Paste API Key'}
          </label>

          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={provider === 'nvidia' ? 'nvapi-...' : 'sk-ant-api03-...'}
            className="w-full p-3 rounded-xl border bg-black/50 text-white font-mono text-xs focus:outline-none focus:border-emerald-500 shadow-inner"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
          />

          {provider === 'nvidia' && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <span>Get free key with 1,000 credits:</span>
              <a
                href="https://build.nvidia.com"
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-white hover:text-emerald-200 flex items-center gap-1"
              >
                <span>build.nvidia.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Test Connection Button & Result */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handleTestConnection}
            disabled={testing || !apiKey.trim()}
            className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 border border-white/10 flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Verifying Key...' : 'Test Connection'}</span>
          </button>

          {testResult && (
            <span className={`text-xs font-mono flex items-center gap-1.5 ${testResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
              {testResult.success ? <Check className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{testResult.success ? 'Active & Verified' : 'Check Key Format'}</span>
            </span>
          )}
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <button
            onClick={() => handleCompleteActivation(false)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-100"
          >
            <Sparkles className="w-4 h-4" />
            <span>Connect & Launch Autonomous Planner →</span>
          </button>

          <button
            onClick={() => handleCompleteActivation(true)}
            className="w-full py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs font-mono transition-colors text-center"
          >
            Or start with Built-in Free Smart Engine (No Key Required)
          </button>
        </div>
      </div>
    </div>
  );
}
