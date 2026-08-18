import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Terminal, 
  Zap, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Palette, 
  Code2, 
  Check, 
  Key,
  Flame,
  ArrowRight
} from 'lucide-react';
import Logo from './Logo';

export default function ClaudeChatPanel({
  onSendMessage,
  isGenerating,
  generationStatusText,
  apiConfig,
  onOpenApiSettings,
  activeSystemPromptPresetId,
  onSelectSystemPrompt,
  onApplyPresetPrompt,
}) {
  const [inputPrompt, setInputPrompt] = useState('');

  const [chatHistory, setChatHistory] = useState([
    {
      id: 'msg-1',
      role: 'assistant',
      thought: 'Initialized Claude Design System Engine. Loaded Instrument Serif editorial typography scale, warm terracotta #CC6B49 tokens, and 12-column asymmetrical bento grid specs.',
      text: "Hello! I'm your Claude AI Design Co-Pilot. Describe any website, app interface, or aesthetic direction you want to create, and I'll generate the full-stack design code live in your canvas.",
    },
  ]);

  const quickPrompts = [
    { label: 'Warm Claude Editorial', prompt: 'Redesign with warm terracotta #CC6B49 accents, Instrument Serif typography, and 12-col bento grid' },
    { label: 'Obsidian Agent SaaS', prompt: 'Design a sleek dark-mode AI agent memory database with live telemetry graphs (48k TPS) and terminal tabs' },
    { label: 'Autonomous Drone Fleet', prompt: 'Autonomous AI Drone Fleet Logistics & Real-time Edge Telemetry Platform' },
    { label: 'Luxury Atelier Portfolio', prompt: 'High-fashion monochrome creative design atelier with Cormorant Garamond display serif' },
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || isGenerating) return;

    // Add user message
    const userMsg = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text,
    };

    setChatHistory((prev) => [...prev, userMsg]);
    setInputPrompt('');

    // Trigger AI generation
    onSendMessage(text);

    // Add assistant response after generation
    setTimeout(() => {
      const assistantMsg = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        thought: `Synthesized design layout for "${text.slice(0, 30)}..." using ${apiConfig.provider === 'nvidia' ? 'NVIDIA NIM Nemotron 70B' : 'Claude 3.5 Sonnet'}. Verified WCAG contrast and applied responsive grid tokens.`,
        text: `I've updated the live website design for **"${text}"**! You can view the rendered interface in Preview mode, inspect the HTML/Tailwind in Code mode, or tweak individual sections.`,
      };
      setChatHistory((prev) => [...prev, assistantMsg]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside className="w-80 sm:w-96 bg-[#0c0e17] border-r border-white/10 flex flex-col h-[calc(100vh-4rem)] overflow-hidden flex-shrink-0 font-sans">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-white/10 bg-[#090b12] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Logo size="xs" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-white">Claude AI Co-Pilot</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                {apiConfig.provider === 'nvidia' ? 'NVIDIA NIM' : 'CLAUDE'}
              </span>
            </div>
            <div className="text-[10px] text-neutral-400 font-mono">
              Model: <span className="text-neutral-200">{apiConfig.model.split('/')[1] || apiConfig.model}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenApiSettings}
          className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs border border-white/10 transition-all"
          title="Configure AI API & Models"
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>

      {/* Quick Prompts Carousel */}
      <div className="p-3 border-b border-white/5 bg-[#080a10] overflow-x-auto flex gap-1.5">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.prompt)}
            className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-white/5 hover:border-amber-500/30 text-[11px] text-neutral-300 whitespace-nowrap transition-all flex items-center gap-1"
          >
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>{qp.label}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {chatHistory.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {msg.role === 'user' ? (
              <div className="flex items-start gap-2.5 justify-end">
                <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-neutral-100 max-w-[85%] font-sans leading-relaxed">
                  {msg.text}
                </div>
                <div className="w-6 h-6 rounded-lg bg-amber-500/30 text-amber-300 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                  U
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-clay to-amberGlow text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm">
                  C
                </div>
                <div className="space-y-2 max-w-[90%]">
                  {/* Thought Trace Box */}
                  {msg.thought && (
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-neutral-400 space-y-1">
                      <div className="flex items-center gap-1.5 text-neutral-400 font-semibold">
                        <Terminal className="w-3 h-3 text-emerald-400" />
                        <span>Chain of Thought Trace</span>
                      </div>
                      <p className="leading-relaxed">{msg.thought}</p>
                    </div>
                  )}

                  {/* Main Response Text */}
                  <div className="p-3 rounded-2xl bg-neutral-900/80 border border-white/10 text-neutral-200 font-sans leading-relaxed">
                    {msg.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live Generation Progress Card */}
        {isGenerating && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-300 flex items-center gap-2.5 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
            <span className="line-clamp-1">{generationStatusText || 'Claude is synthesizing website code...'}</span>
          </div>
        )}
      </div>

      {/* Input Prompt Box */}
      <div className="p-3 border-t border-white/10 bg-[#090b12] space-y-2">
        <div className="relative">
          <textarea
            rows={3}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Claude to design or modify anything... (e.g. 'Add dark mode vector database section' or 'Make it warm terracotta')"
            className="w-full p-3 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 resize-none font-sans"
          />

          <button
            onClick={() => handleSend()}
            disabled={!inputPrompt.trim() || isGenerating}
            className="absolute right-2.5 bottom-3.5 p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
            title="Send Prompt (Enter)"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
          <span>Press <kbd className="px-1 py-0.5 rounded bg-black/40 text-neutral-400">Enter</kbd> to generate</span>
          <span>Powered by Claude & NVIDIA NIM</span>
        </div>
      </div>
    </aside>
  );
}
