import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  LayoutGrid, 
  Terminal, 
  Zap, 
  Code2, 
  Server, 
  Calculator, 
  BookOpen, 
  Settings, 
  Key, 
  Sun, 
  Moon, 
  ArrowRight
} from 'lucide-react';

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigate,
  onOpenApiSettings,
  onOpenMcpStudio,
  onOpenExport,
  isDark,
  setIsDark,
  onShuffleAesthetic,
}) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const commands = [
    { id: 'home', label: 'Go to Home / Overview', category: 'Navigation', icon: LayoutGrid, action: () => onNavigate('home') },
    { id: 'features', label: 'Go to Features & Bento Architecture', category: 'Navigation', icon: LayoutGrid, action: () => onNavigate('features') },
    { id: 'planner', label: 'Open Autonomous AI System Architect', category: 'AI Tools', icon: Sparkles, action: () => onNavigate('planner') },
    { id: 'dashboard', label: 'Open Agent Telemetry Dashboard', category: 'Monitoring', icon: Zap, action: () => onNavigate('dashboard') },
    { id: 'playground', label: 'Open Live Inference Playground', category: 'Interactive', icon: Terminal, action: () => onNavigate('playground') },
    { id: 'docs', label: 'Open Developer Docs & SDKs', category: 'Developers', icon: BookOpen, action: () => onNavigate('docs') },
    { id: 'pricing', label: 'Open Volume ROI Calculator', category: 'Economics', icon: Calculator, action: () => onNavigate('pricing') },
    { id: 'research', label: 'Read Constitutional AI Research Papers', category: 'Research', icon: BookOpen, action: () => onNavigate('research') },
    { id: 'settings', label: 'Open Security & VPC Settings', category: 'Settings', icon: Settings, action: () => onNavigate('settings') },
    { id: 'api', label: 'Connect NVIDIA NIM or Claude API Keys', category: 'AI Setup', icon: Key, action: onOpenApiSettings },
    { id: 'mcp', label: 'Open Model Context Protocol (MCP) Studio', category: 'Protocol', icon: Server, action: onOpenMcpStudio },
    { id: 'export', label: 'Export Code (HTML, React JSX, Express Server)', category: 'Export', icon: Code2, action: onOpenExport },
    { id: 'theme', label: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`, category: 'Appearance', icon: isDark ? Sun : Moon, action: () => setIsDark(!isDark) },
    { id: 'shuffle', label: 'Magic Aesthetic Style Shuffle', category: 'Creative', icon: Sparkles, action: onShuffleAesthetic },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd) => {
    cmd.action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-white/15 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#0a0c13]">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page... (e.g. Dashboard, NVIDIA, MCP, Docs)"
            className="flex-1 bg-transparent text-white placeholder:text-neutral-500 text-sm font-sans focus:outline-none"
          />
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-neutral-400">ESC</span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-neutral-500">
              No matching commands found.
            </div>
          ) : (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  className="w-full p-2.5 rounded-xl hover:bg-neutral-800/90 text-left flex items-center justify-between group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-amber-300 group-hover:bg-amber-500/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-neutral-200 group-hover:text-white">
                      {cmd.label}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {cmd.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-[#0a0c13] flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Open-Source Command Bus</span>
          <span>Press Enter to select</span>
        </div>
      </div>
    </div>
  );
}
