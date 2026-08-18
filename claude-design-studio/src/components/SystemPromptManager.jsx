import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check, RotateCcw, Save, BookOpen, Layers, Shield, Zap } from 'lucide-react';
import { SYSTEM_PROMPT_PRESETS } from '../data/systemPromptPresets';
import confetti from 'canvas-confetti';

export default function SystemPromptManager({
  activePresetId,
  setActivePresetId,
  currentSystemPrompt,
  setCurrentSystemPrompt,
  onApplyPrompt,
}) {
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedPreset = SYSTEM_PROMPT_PRESETS.find((p) => p.id === activePresetId) || SYSTEM_PROMPT_PRESETS[0];

  const handleSelectPreset = (presetId) => {
    setActivePresetId(presetId);
    const found = SYSTEM_PROMPT_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setCurrentSystemPrompt(found.prompt);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSystemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetToPreset = () => {
    if (selectedPreset) {
      setCurrentSystemPrompt(selectedPreset.prompt);
    }
  };

  const handleInsertTag = (tag) => {
    setCurrentSystemPrompt((prev) => prev + `\n\n[INJECTED_RULE]: ${tag}`);
  };

  const tokenCount = Math.round(currentSystemPrompt.length / 4);

  return (
    <div className="space-y-5">
      {/* Preset Selector */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>System Prompt Presets</span>
          </label>
          <span className="text-[10px] font-mono text-neutral-400">~{tokenCount} Tokens</span>
        </div>

        <div className="space-y-2">
          {SYSTEM_PROMPT_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;

            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                    : 'border-white/5 bg-neutral-900/60 hover:bg-neutral-800/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-white">{preset.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">
                    {preset.category}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{preset.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor with variable helpers */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-mono font-bold uppercase text-neutral-400 tracking-wider">
            Live System Prompt Editor
          </label>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetToPreset}
              title="Reset prompt to preset default"
              className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="text-[10px]">Reset</span>
            </button>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors text-xs flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Prompt Textarea */}
        <textarea
          rows={10}
          value={currentSystemPrompt}
          onChange={(e) => setCurrentSystemPrompt(e.target.value)}
          className="w-full bg-[#07090e] border border-white/10 rounded-xl p-3.5 text-xs text-neutral-200 font-mono leading-relaxed focus:outline-none focus:border-amber-500 resize-none shadow-inner"
        />

        {/* Helper Directive Chips */}
        <div className="mt-3">
          <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1.5 font-semibold">
            Quick Inject Directives:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Enforce Instrument Serif & Warm Clay',
              'Include 3D WebGL Shader Accents',
              'Strict WCAG AAA Contrast Guardrail',
              'Include Monthly / Annual 20% Discount Toggle',
              'Generate 4-Tier Interactive Bento Grid',
            ].map((directive, idx) => (
              <button
                key={idx}
                onClick={() => handleInsertTag(directive)}
                className="px-2 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/5 hover:border-amber-500/30 text-[10px] font-mono text-neutral-400 hover:text-amber-300 transition-all"
              >
                + {directive}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
