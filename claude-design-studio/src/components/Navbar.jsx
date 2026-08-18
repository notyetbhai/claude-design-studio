import React, { useState } from 'react';
import Logo from './Logo';
import { 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Sun, 
  Moon, 
  Code, 
  BookOpen, 
  Download, 
  Share2, 
  Dices, 
  Sliders, 
  Maximize2,
  CheckCircle2,
  Key,
  Terminal,
  Server,
  Star,
  Search,
  Cloud
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StudioNavbar({
  templates,
  currentTemplateId,
  onSelectTemplate,
  viewport,
  setViewport,
  isDark,
  setIsDark,
  onOpenExport,
  onOpenPromptGuide,
  onOpenApiSettings,
  onOpenMcpStudio,
  onOpenCommandPalette,
  onOpenDeploy,
  onShuffleAesthetic,
  activeSidebarTab,
  setActiveSidebarTab,
  apiConfig,
}) {
  const [stars, setStars] = useState(14820);
  const [starred, setStarred] = useState(false);

  const hasApiKey = Boolean(apiConfig.apiKey && apiConfig.apiKey.trim().length > 0);
  const isNvidiaActive = apiConfig.provider === 'nvidia' && hasApiKey;

  const handleStar = () => {
    if (!starred) {
      setStars((prev) => prev + 1);
      setStarred(true);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.2 }, colors: ['#EAB308', '#F59E0B', '#FBBF24'] });
    }
  };

  return (
    <header className="h-16 border-b border-white/10 bg-[#0d0f17]/95 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between z-50 sticky top-0">
      {/* Brand & Open-Source Badges */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveSidebarTab('generator')}>
          <Logo size="sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white font-sans">
                Anthra Studio
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                v2.4.0
              </span>
            </div>
          </div>
        </div>

        {/* GitHub Stars Live Button */}
        <button
          onClick={handleStar}
          title="Star on GitHub"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono transition-all hover:scale-105"
        >
          <Star className={`w-3.5 h-3.5 ${starred ? 'text-amber-400 fill-current' : 'text-neutral-400'}`} />
          <span className="text-white font-semibold">{starred ? 'Starred' : 'Star'}</span>
          <span className="text-[10px] text-neutral-400 bg-black/40 px-1.5 py-0.2 rounded">{stars.toLocaleString()}</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-xl bg-neutral-900 border border-white/10 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <Search className="w-3 h-3" />
          <span>Quick Find</span>
          <kbd className="text-[10px] font-mono bg-black/40 px-1 rounded text-neutral-400">⌘K</kbd>
        </button>
      </div>

      {/* Viewport Switcher */}
      <div className="flex items-center gap-1 sm:gap-1.5 bg-neutral-900/90 p-1 rounded-xl border border-white/10">
        <button
          onClick={() => setViewport('desktop')}
          title="Desktop (100%)"
          className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            viewport === 'desktop'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Desktop</span>
        </button>

        <button
          onClick={() => setViewport('tablet')}
          title="Tablet (768px)"
          className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            viewport === 'tablet'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Tablet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Tablet</span>
        </button>

        <button
          onClick={() => setViewport('mobile')}
          title="Mobile (375px)"
          className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            viewport === 'mobile'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[11px]">Mobile</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* NVIDIA NIM / API Button */}
        <button
          onClick={onOpenApiSettings}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all hover:scale-105 active:scale-95 ${
            isNvidiaActive
              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              : hasApiKey
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-neutral-800/80 border-white/10 text-neutral-300 hover:bg-neutral-700/80'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isNvidiaActive ? 'NVIDIA NIM' : hasApiKey ? apiConfig.provider.toUpperCase() : 'AI Keys'}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${hasApiKey ? 'bg-emerald-400' : 'bg-neutral-500'}`} />
        </button>

        {/* MCP Protocol Modal */}
        <button
          onClick={onOpenMcpStudio}
          title="Model Context Protocol (MCP) Studio"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 border border-white/10 text-xs text-neutral-200 font-medium transition-all hover:scale-105"
        >
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>MCP</span>
        </button>

        {/* Cloud Deploy Button */}
        <button
          onClick={onOpenDeploy}
          title="1-Click Cloud Deployment (Vercel, Netlify, Docker)"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 border border-white/10 text-xs text-neutral-200 font-medium transition-all hover:scale-105"
        >
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>Deploy</span>
        </button>

        {/* Light / Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          title={isDark ? 'Switch canvas to Light Mode' : 'Switch canvas to Dark Mode'}
          className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700/80 border border-white/10 text-neutral-300 transition-all hover:scale-105"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
        </button>

        {/* Export Code Modal */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white text-xs font-semibold shadow-lg shadow-amber-600/25 transition-all hover:scale-105 active:scale-95"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </header>
  );
}
