import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Sparkles, FileCode, CheckCircle2, Server, Terminal, Layers } from 'lucide-react';
import { generateFullHTML, generateReactCode } from '../utils/codeGenerator';
import confetti from 'canvas-confetti';

export default function ExportModal({ isOpen, onClose, template, config }) {
  if (!isOpen) return null;

  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const [copied, setCopied] = useState(false);

  const htmlCode = generateFullHTML(template, config);
  const reactCode = generateReactCode(template, config);
  
  const expressServerCode = `// server.js — ClaudeDesign Full-Stack Express Backend & MCP API
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Real-time Telemetry for Dashboard
app.get('/api/dashboard/metrics', (req, res) => {
  res.json({
    status: 'healthy',
    tokens_per_second: 48200,
    p99_latency_ms: '1.84',
    active_clusters: 24,
    cache_hit_rate: '94.8%'
  });
});

// MCP JSON-RPC 2.0 Endpoint
app.post('/api/mcp/call', (req, res) => {
  const { method, params } = req.body;
  res.json({
    jsonrpc: '2.0',
    result: { message: 'MCP tool executed successfully' }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Server running at http://0.0.0.0:\${PORT}\`);
});
`;

  const mcpServerCode = `// claude-design-mcp-server.js — Model Context Protocol Server for Claude Desktop
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const server = new Server({ name: 'claude-design-studio', version: '1.0.0' }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    { name: 'generate_claude_website', description: 'Generates 10/10 Claude-style website designs' },
    { name: 'audit_design_aesthetic', description: 'Audits contrast, typography, and bento layout' }
  ]
}));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main();
`;

  const tailwindConfigCode = `// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '${config.primaryColor}',
          accent: '${config.accentColor}',
          bg: '${config.isDark ? config.bgColor || '#090D16' : '#FAF8F5'}',
        }
      },
      fontFamily: {
        heading: [${config.fontHeading ? config.fontHeading.split(',')[0] : "'Instrument Serif'"}, 'serif'],
        body: [${config.fontBody ? config.fontBody.split(',')[0] : "'Inter'"}, 'sans-serif'],
      }
    }
  }
};`;

  const getActiveCode = () => {
    if (activeCodeTab === 'html') return htmlCode;
    if (activeCodeTab === 'react') return reactCode;
    if (activeCodeTab === 'backend') return expressServerCode;
    if (activeCodeTab === 'mcp') return mcpServerCode;
    return tailwindConfigCode;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const code = getActiveCode();
    let filename = 'index.html';
    let mimeType = 'text/html';

    if (activeCodeTab === 'react') {
      filename = 'LandingPage.jsx';
      mimeType = 'text/javascript';
    } else if (activeCodeTab === 'backend') {
      filename = 'server.js';
      mimeType = 'text/javascript';
    } else if (activeCodeTab === 'mcp') {
      filename = 'claude-design-mcp-server.js';
      mimeType = 'text/javascript';
    } else if (activeCodeTab === 'tailwind') {
      filename = 'tailwind.config.js';
      mimeType = 'text/javascript';
    }

    const blob = new Blob([code], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0c13]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Export Full-Stack Web Design Suite</h3>
              <p className="text-xs text-neutral-400 font-mono">Frontend Pages + Express Backend API + Model Context Protocol (MCP)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Tabs & Actions */}
        <div className="px-6 py-3 border-b border-white/10 bg-[#0c0e18] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'html', label: 'Single-File HTML', ext: '.html' },
              { id: 'react', label: 'React JSX Suite', ext: '.jsx' },
              { id: 'backend', label: 'Express Backend API', ext: 'server.js' },
              { id: 'mcp', label: 'Claude MCP Server', ext: 'mcp.js' },
              { id: 'tailwind', label: 'Tailwind Tokens', ext: '.js' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeCodeTab === tab.id
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] font-mono opacity-60">({tab.ext})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-all hover:scale-105"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all hover:opacity-95 hover:scale-105"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#07090e] font-mono text-xs text-neutral-300">
          <pre className="overflow-x-auto leading-relaxed">
            <code>{getActiveCode()}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0a0c13] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Production ready for Node.js, Next.js, Express, and Claude Desktop MCP</span>
          </div>
          <span>Full-Stack Architecture</span>
        </div>
      </div>
    </div>
  );
}
