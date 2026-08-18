import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Layers, 
  Play, 
  CheckCircle2, 
  Server, 
  ExternalLink, 
  Code2, 
  Wrench, 
  ShieldCheck, 
  FileJson,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function McpStudioModal({
  isOpen,
  onClose,
  onApplyMcpDesign,
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('desktop-setup');
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [copiedToolJson, setCopiedToolJson] = useState(false);

  // Playground state
  const [selectedTool, setSelectedTool] = useState('generate_claude_website');
  const [toolPrompt, setToolPrompt] = useState('Real-time Autonomous AI Agent Swarm Platform');
  const [toolPalette, setToolPalette] = useState('clay');
  const [toolFormat, setToolFormat] = useState('json');
  const [isExecuting, setIsExecuting] = useState(false);
  const [mcpResponse, setMcpResponse] = useState(null);

  const desktopConfigJson = `{
  "mcpServers": {
    "claude-design-studio": {
      "command": "node",
      "args": [
        "/home/user/claude-design-mcp-server.js"
      ],
      "env": {
        "ANTHROPIC_API_KEY": "your-api-key-here"
      }
    }
  }
}`;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(desktopConfigJson);
    setCopiedConfig(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopiedConfig(false), 2000);
  };

  const handleExecuteTool = () => {
    setIsExecuting(true);
    setMcpResponse(null);

    setTimeout(() => {
      let result = {};

      if (selectedTool === 'generate_claude_website') {
        result = {
          jsonrpc: '2.0',
          id: 1,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    status: 'success',
                    protocol: 'mcp-1.0.0',
                    tool: 'generate_claude_website',
                    generated_design: {
                      title: `${toolPrompt} — Official Claude Design`,
                      palette: toolPalette,
                      typography: {
                        heading: 'Instrument Serif',
                        body: 'Inter',
                        mono: 'JetBrains Mono',
                      },
                      layout: {
                        type: '12-column-asymmetrical-bento',
                        cards_count: 4,
                        hero_interactive: true,
                        pricing_discount: '20% Annual',
                      },
                    },
                  },
                  null,
                  2
                ),
              },
            ],
          },
        };
      } else if (selectedTool === 'audit_design_aesthetic') {
        result = {
          jsonrpc: '2.0',
          id: 2,
          result: {
            content: [
              {
                type: 'text',
                text: JSON.stringify(
                  {
                    overall_score: '99.6/100 (Grade A+)',
                    wcag_contrast: '100% Pass (WCAG AAA Compliant)',
                    typography_scale: '1.25 Major Third Harmonic Ratio',
                    bento_balance: 'Optimal Asymmetry (8-col + 4-col split)',
                    micro_interactions: '12 Active Tactile Touchpoints',
                  },
                  null,
                  2
                ),
              },
            ],
          },
        };
      } else if (selectedTool === 'get_claude_design_system_prompt') {
        result = {
          jsonrpc: '2.0',
          id: 3,
          result: {
            content: [
              {
                type: 'text',
                text: `[MCP PROMPT]: The signature Claude / Anthropic aesthetic prioritizes warm terracotta neutrals (#CC6B49, #FAF8F5), Instrument Serif editorial headings with italicized highlight tokens, 1px hairline borders, and asymmetrical bento grids.`,
              },
            ],
          },
        };
      } else if (selectedTool === 'export_component_code') {
        result = {
          jsonrpc: '2.0',
          id: 4,
          result: {
            content: [
              {
                type: 'text',
                text: `<section className="py-20 px-6 max-w-5xl mx-auto text-center">
  <div className="inline-flex px-3 py-1 rounded-full text-xs font-mono bg-[#CC6B49]/10 text-[#CC6B49] border border-[#CC6B49]/30 mb-6">
    ✨ MCP Component
  </div>
  <h2 className="text-5xl font-serif font-bold">Engineered for Velocity</h2>
</section>`,
              },
            ],
          },
        };
      }

      setMcpResponse(result);
      setIsExecuting(false);
    }, 450);
  };

  const handleApplyToCanvas = () => {
    if (onApplyMcpDesign) {
      onApplyMcpDesign(toolPrompt);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.4 } });
      onClose();
    }
  };

  const handleDownloadServer = () => {
    const a = document.createElement('a');
    a.href = '/claude-design-mcp-server.js';
    a.download = 'claude-design-mcp-server.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0c13]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Model Context Protocol (MCP) Studio</h3>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PROTOCOL v1.0
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-mono">Connect Claude Desktop, Claude Code, & Agentic LLMs via MCP</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-white/10 bg-[#0c0e18] flex items-center gap-2">
          {[
            { id: 'desktop-setup', label: 'Claude Desktop Integration', icon: Terminal },
            { id: 'tools-playground', label: 'MCP Tools Playground (JSON-RPC)', icon: Wrench },
            { id: 'mcp-architecture', label: 'Protocol Specs & Architecture', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm bg-[#080a10]">
          {/* TAB 1: CLAUDE DESKTOP INTEGRATION */}
          {activeTab === 'desktop-setup' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-neutral-300">
                  <span className="font-bold text-white">Give Claude Desktop direct access to ClaudeDesign Studio tools!</span>
                  <p className="mt-1 text-neutral-400">
                    With MCP, you can type in Claude Desktop: <em className="text-amber-300">"Generate a modern dark-mode vector database landing page using claude-design-studio"</em> and Claude will invoke the MCP tools to build and return the design!
                  </p>
                </div>
              </div>

              {/* Config File Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider font-semibold">
                    1. Add to <code className="text-amber-300">claude_desktop_config.json</code>
                  </label>
                  <button
                    onClick={handleCopyConfig}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white border border-white/10 transition-all"
                  >
                    {copiedConfig ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedConfig ? 'Copied Config!' : 'Copy Config'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#04060a] border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto shadow-inner">
                  <pre>{desktopConfigJson}</pre>
                </div>
              </div>

              {/* Config Paths Guide */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                  <span className="text-amber-400 font-bold block mb-1">macOS Config Path:</span>
                  <span className="text-neutral-400 text-[11px]">~/Library/Application Support/Claude/claude_desktop_config.json</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                  <span className="text-amber-400 font-bold block mb-1">Windows Config Path:</span>
                  <span className="text-neutral-400 text-[11px]">%APPDATA%\Claude\claude_desktop_config.json</span>
                </div>
              </div>

              {/* Download Server Script */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900 border border-white/10">
                <div>
                  <div className="font-bold text-xs text-white">Standalone MCP Server Script</div>
                  <div className="text-[11px] text-neutral-400 font-mono mt-0.5">claude-design-mcp-server.js (Node.js STDIO transport)</div>
                </div>

                <button
                  onClick={handleDownloadServer}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md hover:opacity-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MCP Server File</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TOOLS PLAYGROUND */}
          {activeTab === 'tools-playground' && (
            <div className="space-y-6">
              {/* Tool Selector */}
              <div>
                <label className="text-xs font-mono uppercase text-amber-400 tracking-wider block mb-2 font-semibold">
                  Select MCP Tool to Simulate:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'generate_claude_website', name: 'generate_claude_website', desc: 'Synthesizes full Claude-grade design spec' },
                    { id: 'audit_design_aesthetic', name: 'audit_design_aesthetic', desc: 'Audits WCAG contrast, typography & rhythm' },
                    { id: 'get_claude_design_system_prompt', name: 'get_claude_design_system_prompt', desc: 'Returns master Anthropic design guidelines' },
                    { id: 'export_component_code', name: 'export_component_code', desc: 'Exports standalone UI component snippet' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTool(t.id)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        selectedTool === t.id
                          ? 'border-amber-500 bg-amber-500/10 text-white shadow-sm'
                          : 'border-white/5 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                      }`}
                    >
                      <div className="font-mono font-bold text-white flex items-center gap-1.5">
                        <Wrench className="w-3 h-3 text-amber-400" />
                        <span>{t.name}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tool Arguments Form */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 space-y-4 font-mono text-xs">
                <span className="text-xs font-bold uppercase text-neutral-400 block">
                  Tool Arguments (JSON-RPC Payload)
                </span>

                {selectedTool === 'generate_claude_website' && (
                  <>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">prompt (string)</label>
                      <input
                        type="text"
                        value={toolPrompt}
                        onChange={(e) => setToolPrompt(e.target.value)}
                        className="w-full bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">palette (enum)</label>
                        <select
                          value={toolPalette}
                          onChange={(e) => setToolPalette(e.target.value)}
                          className="w-full bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                        >
                          <option value="clay">clay (Anthropic Terracotta)</option>
                          <option value="indigo">indigo (Obsidian Glow)</option>
                          <option value="emerald">emerald (Matrix Neon)</option>
                          <option value="monochrome">monochrome (Atelier)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">format (enum)</label>
                        <select
                          value={toolFormat}
                          onChange={(e) => setToolFormat(e.target.value)}
                          className="w-full bg-neutral-800 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-amber-500"
                        >
                          <option value="json">json (Design Spec)</option>
                          <option value="html">html (Single-File Code)</option>
                          <option value="react">react (JSX Component)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <button
                  onClick={handleExecuteTool}
                  disabled={isExecuting}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
                  <span>{isExecuting ? 'Executing JSON-RPC Call...' : 'Execute MCP Tool'}</span>
                </button>
              </div>

              {/* JSON-RPC Output Box */}
              {mcpResponse && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>MCP Tool Execution Output (JSON-RPC 2.0 Response)</span>
                    </span>

                    {selectedTool === 'generate_claude_website' && (
                      <button
                        onClick={handleApplyToCanvas}
                        className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Apply Generated Design to Canvas</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-[#04060a] border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto max-h-60 shadow-inner">
                    <pre>{JSON.stringify(mcpResponse, null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MCP PROTOCOL ARCHITECTURE */}
          {activeTab === 'mcp-architecture' && (
            <div className="space-y-4 text-xs font-mono leading-relaxed text-neutral-300">
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-3">
                <div className="font-bold text-sm text-white">Anthropic Model Context Protocol (MCP) Overview</div>
                <p className="text-neutral-400">
                  Model Context Protocol is an open standard created by Anthropic that provides standardized communication between LLM clients and context providers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                  <div className="text-amber-400 font-bold mb-1">1. Tools (`tools/call`)</div>
                  <div className="text-[11px] text-neutral-400">Exposes executable functions like website generation, code export, and aesthetic audits.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                  <div className="text-amber-400 font-bold mb-1">2. Prompts (`prompts/get`)</div>
                  <div className="text-[11px] text-neutral-400">Provides pre-engineered system prompts for the Claude aesthetic to client models.</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5">
                  <div className="text-amber-400 font-bold mb-1">3. Resources (`resources/read`)</div>
                  <div className="text-[11px] text-neutral-400">Exposes design token palettes, font pairings, and bento grid schemas as read-only streams.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0a0c13] flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Compliant with Anthropic MCP Specification v1.0</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold transition-all"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
}
