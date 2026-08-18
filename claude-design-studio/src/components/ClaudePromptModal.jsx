import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, BookOpen, Layers, Lightbulb, Terminal, ArrowRight } from 'lucide-react';
import { CLAUDE_DESIGN_SYSTEM_PROMPT } from '../data/claudeSystemPrompt';
import confetti from 'canvas-confetti';

export default function ClaudePromptModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CLAUDE_DESIGN_SYSTEM_PROMPT.trim());
    setCopied(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0c13]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Claude Web Design System Master Prompt</h3>
              <p className="text-xs text-neutral-400 font-mono">Use this prompt in Claude / ChatGPT to generate 10/10 stunning website code</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-[#0c0e18] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
            <span>✨ Complete Anthropic Aesthetic Blueprint & Code Rules</span>
          </div>

          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Master Prompt!' : 'Copy Master Prompt to Clipboard'}</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#07090e] font-mono text-xs text-neutral-300 leading-relaxed">
          <pre className="whitespace-pre-wrap font-mono">
            {CLAUDE_DESIGN_SYSTEM_PROMPT.trim()}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0a0c13] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Pro tip: Paste this prompt into Claude Artifacts for instant live rendering.</span>
          <button onClick={handleCopy} className="text-amber-400 hover:underline">
            1-Click Copy
          </button>
        </div>
      </div>
    </div>
  );
}
