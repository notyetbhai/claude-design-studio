import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Search, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  Layers, 
  Zap, 
  Shield, 
  Server,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function DocsPage({ config }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [activeLang, setActiveLang] = useState('typescript');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedSection, setSelectedSection] = useState('quickstart');

  const codeSnippets = {
    typescript: `import { AnthraClient } from '@anthra/sdk';

const client = new AnthraClient({
  apiKey: process.env.ANTHRA_API_KEY,
  environment: 'production'
});

// Stream reasoning tokens with sub-millisecond TTFT
const response = await client.messages.stream({
  model: 'anthra-3.5-sonnet',
  max_tokens: 4096,
  system: 'You are an elite reasoning assistant.',
  messages: [
    { role: 'user', content: 'Synthesize optimal microservice latency bounds.' }
  ]
});

for await (const chunk of response) {
  process.stdout.write(chunk.delta?.text || '');
}`,
    python: `import anthra

client = anthra.AnthraClient(
    api_key="sk-ant-api03-...",
)

response = client.messages.create(
    model="anthra-3.5-sonnet",
    max_tokens=4096,
    system="You are an elite reasoning assistant.",
    messages=[
        {"role": "user", "content": "Synthesize optimal microservice latency bounds."}
    ]
)

print(response.content[0].text)`,
    curl: `curl https://api.anthra.ai/v1/messages \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $ANTHRA_API_KEY" \\
  -H "anthropic-version: 2023-06-01" \\
  -d '{
    "model": "anthra-3.5-sonnet",
    "max_tokens": 4096,
    "messages": [
      {"role": "user", "content": "Synthesize optimal microservice latency bounds."}
    ]
  }'`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const docSections = [
    {
      id: 'quickstart',
      title: 'Quickstart & Installation',
      desc: 'Initialize the SDK and make your first cognitive API call in under 60 seconds.',
    },
    {
      id: 'authentication',
      title: 'Authentication & Security Keys',
      desc: 'Learn about role-based API keys, zero-data retention policies, and SOC2 compliance.',
    },
    {
      id: 'mcp',
      title: 'Model Context Protocol (MCP)',
      desc: 'Connect Claude Desktop, Claude Code, and agentic workflows via official MCP standard.',
    },
    {
      id: 'streaming',
      title: 'Sub-Second Token Streaming',
      desc: 'WebSocket and SSE pipelines optimized for 8ms first-token latency.',
    },
    {
      id: 'artifacts',
      title: 'Interactive UI Artifacts',
      desc: 'Render live React components and data charts side-by-side with text output.',
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-6 md:p-10 font-sans grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Navigation Sidebar (3 cols) */}
      <aside className="lg:col-span-3 space-y-6">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search API docs & endpoints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs bg-neutral-900/80 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 font-sans"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
          />
        </div>

        <div className="space-y-1 font-mono text-xs">
          <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-bold px-3 py-1">
            Documentation Index
          </div>
          {docSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setSelectedSection(sec.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl font-medium transition-all ${
                selectedSection === sec.id
                  ? 'bg-amber-500/15 font-bold'
                  : 'opacity-70 hover:opacity-100 hover:bg-neutral-500/10'
              }`}
              style={{
                color: selectedSection === sec.id ? primary : undefined,
              }}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Documentation Body (9 cols) */}
      <main className="lg:col-span-9 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-4"
            style={{
              backgroundColor: `${primary}14`,
              borderColor: `${primary}26`,
              color: primary,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Reference v3.5</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: config.fontHeading }}>
            Quickstart Guide & Developer SDK
          </h1>
          <p className="text-base sm:text-lg opacity-75 leading-relaxed max-w-3xl">
            Integrate foundational reasoning, streaming inference, and deterministic tool verification into your applications with zero boilerplate.
          </p>
        </div>

        {/* Code Showcase Box */}
        <div className="rounded-3xl border backdrop-blur-xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: isDark ? 'rgba(15, 20, 31, 0.9)' : 'rgba(255, 255, 255, 0.9)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Code Header */}
          <div className="px-6 py-3.5 border-b flex items-center justify-between bg-black/40"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
          >
            <div className="flex items-center gap-2">
              {['typescript', 'python', 'curl'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase font-bold transition-all ${
                    activeLang === lang
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: activeLang === lang ? primary : undefined,
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono transition-all text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Code Box */}
          <div className="p-6 overflow-x-auto font-mono text-xs sm:text-sm text-neutral-200 leading-relaxed bg-[#06080e]">
            <pre>
              <code>{codeSnippets[activeLang]}</code>
            </pre>
          </div>
        </div>

        {/* Core Endpoints Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-sans" style={{ fontFamily: config.fontHeading }}>
            Standard REST & MCP Endpoints
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {[
              { method: 'POST', path: '/v1/messages', desc: 'Create message or stream reasoning tokens', status: '200 OK' },
              { method: 'POST', path: '/v1/mcp/call', desc: 'Model Context Protocol (MCP) JSON-RPC tool dispatch', status: '200 OK' },
              { method: 'GET', path: '/v1/models', desc: 'List active reasoning models and context limits', status: '200 OK' },
            ].map((ep, idx) => (
              <div key={idx} className="p-4 rounded-2xl border flex items-center justify-between bg-black/20"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300">
                    {ep.method}
                  </span>
                  <span className="font-semibold text-white">{ep.path}</span>
                  <span className="text-neutral-400 hidden sm:inline">— {ep.desc}</span>
                </div>
                <span className="text-emerald-400 font-bold">{ep.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
