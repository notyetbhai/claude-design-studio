import React, { useState } from 'react';
import { X, Key, Cpu, ShieldCheck, Check, AlertCircle, RefreshCw, ExternalLink, Sparkles, Lock, Zap } from 'lucide-react';
import { testApiConnection } from '../utils/aiApiService';

export default function ApiSettingsModal({
  isOpen,
  onClose,
  apiConfig,
  setApiConfig,
}) {
  if (!isOpen) return null;

  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await testApiConnection(apiConfig);
    setTestResult(result);
    setTesting(false);
  };

  const handleSave = () => {
    localStorage.setItem('claude_design_api_config', JSON.stringify(apiConfig));
    onClose();
  };

  const modelsByProvider = {
    nvidia: [
      { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'NVIDIA Nemotron 70B (Recommended — Best for Web Design & Code)' },
      { id: 'deepseek-ai/deepseek-r1', name: 'DeepSeek R1 on NVIDIA NIM (Deep Reasoning & UI Architecture)' },
      { id: 'meta/llama-3.3-70b-instruct', name: 'Meta Llama 3.3 70B (Ultra-Fast 200+ tok/s)' },
      { id: 'meta/llama-3.1-405b-instruct', name: 'Meta Llama 3.1 405B (Frontier Scale Giant)' },
      { id: 'qwen/qwen2.5-72b-instruct', name: 'Qwen 2.5 72B (Frontend & UI Specialist)' },
      { id: 'mistralai/mistral-large-2-instruct', name: 'Mistral Large 2 (High Precision)' },
    ],
    anthropic: [
      { id: 'claude-3-7-sonnet-20250219', name: 'Claude 3.7 Sonnet (Latest Reasoning Hybrid)' },
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet v2 (Recommended for Design)' },
      { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku (Ultra-Fast)' },
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus (Deep Nuance)' },
    ],
    openai: [
      { id: 'gpt-4o', name: 'GPT-4o (Omni High Quality)' },
      { id: 'gpt-4o-mini', name: 'GPT-4o Mini (Fast & Cheap)' },
      { id: 'o3-mini', name: 'o3-mini (Reasoning Model)' },
    ],
    openrouter: [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Anthropic Claude 3.5 Sonnet' },
      { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (Reasoning)' },
      { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Meta Llama 3.3 70B' },
    ],
    custom: [
      { id: 'custom-model', name: 'Custom Endpoint Model' },
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-white/10 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0c13]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">AI Engine & API Keys</h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  NVIDIA NIM READY
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">Connect NVIDIA NIM, Anthropic Claude, or OpenAI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1 text-sm">
          {/* Provider Selection */}
          <div>
            <label className="text-xs font-mono uppercase text-amber-400 tracking-wider block mb-2 font-semibold">
              Select AI Engine
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'nvidia', name: 'NVIDIA NIM', badge: '⚡ Best Design', highlight: true },
                { id: 'anthropic', name: 'Anthropic Claude', badge: 'Official' },
                { id: 'openai', name: 'OpenAI GPT-4o' },
                { id: 'openrouter', name: 'OpenRouter' },
              ].map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => {
                    const defaultModel = modelsByProvider[prov.id][0]?.id;
                    setApiConfig((prev) => ({
                      ...prev,
                      provider: prov.id,
                      model: defaultModel,
                    }));
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                    apiConfig.provider === prov.id
                      ? prov.id === 'nvidia'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-lg shadow-emerald-500/10'
                        : 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                      : 'border-white/5 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  <span>{prov.name}</span>
                  {prov.badge && (
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      prov.id === 'nvidia' ? 'bg-emerald-500/30 text-emerald-200 font-bold' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {prov.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider block mb-2 font-semibold">
              Select Model
            </label>
            <select
              value={apiConfig.model}
              onChange={(e) => setApiConfig((prev) => ({ ...prev, model: e.target.value }))}
              className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-sans cursor-pointer"
            >
              {(modelsByProvider[apiConfig.provider] || []).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* API Key Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider font-semibold">
                {apiConfig.provider === 'nvidia' ? 'NVIDIA NIM API Key' : `${apiConfig.provider.toUpperCase()} API Key`}
              </label>
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="text-[11px] text-amber-400 hover:underline"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiConfig.apiKey || ''}
                onChange={(e) => setApiConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
                placeholder={
                  apiConfig.provider === 'nvidia'
                    ? 'nvapi-...'
                    : apiConfig.provider === 'anthropic'
                    ? 'sk-ant-api03-...'
                    : apiConfig.provider === 'openai'
                    ? 'sk-proj-...'
                    : 'sk-or-v1-...'
                }
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white font-mono placeholder:text-neutral-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            {apiConfig.provider === 'nvidia' && (
              <div className="mt-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-mono flex items-center justify-between">
                <span>Get free NVIDIA NIM keys with 1000 free inference credits:</span>
                <a
                  href="https://build.nvidia.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white font-bold underline flex items-center gap-1 hover:text-emerald-200"
                >
                  <span>build.nvidia.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-neutral-500">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Keys are stored strictly in your local browser sandbox and never shared.</span>
            </div>
          </div>

          {/* Test Connection Button & Result */}
          <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Connection Verification:</span>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing || !apiConfig.apiKey}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${testing ? 'animate-spin' : ''}`} />
                <span>{testing ? 'Testing...' : 'Test Connection'}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-2.5 rounded-lg text-xs font-mono flex items-center gap-2 ${
                  testResult.success
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-300 border border-red-500/20'
                }`}
              >
                {testResult.success ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0a0c13] flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setApiConfig((prev) => ({ ...prev, apiKey: '' }));
              setTestResult(null);
            }}
            className="text-xs text-neutral-400 hover:text-white"
          >
            Clear Key (Use Built-in Engine)
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-95 text-white font-semibold text-xs shadow-md transition-all hover:scale-105"
          >
            Save & Connect
          </button>
        </div>
      </div>
    </div>
  );
}
