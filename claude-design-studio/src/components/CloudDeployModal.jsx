import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Server, 
  CheckCircle2, 
  Terminal, 
  Layers 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CloudDeployModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activePlatform, setActivePlatform] = useState('vercel');
  const [copied, setCopied] = useState(false);

  const configs = {
    vercel: {
      title: 'Vercel Deployment (Serverless Edge)',
      filename: 'vercel.json',
      deployUrl: 'https://vercel.com/new/clone?repository-url=https://github.com/anthra-design/claude-design-studio',
      code: `{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/api/(.*)", "dest": "/server/server.js" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}`,
    },
    netlify: {
      title: 'Netlify Deployment Configuration',
      filename: 'netlify.toml',
      deployUrl: 'https://app.netlify.com/start/deploy?repository=https://github.com/anthra-design/claude-design-studio',
      code: `[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
    },
    docker: {
      title: 'Docker Production Container',
      filename: 'Dockerfile',
      code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

EXPOSE 3000 4000
CMD ["node", "server/server.js"]`,
    },
    compose: {
      title: 'Docker Compose Stack (Studio + MCP Gateway)',
      filename: 'docker-compose.yml',
      code: `version: '3.8'
services:
  anthra-studio:
    image: ghcr.io/anthra-design/studio:latest
    ports:
      - "3000:3000"
      - "4000:4000"
    environment:
      - NVIDIA_API_KEY=\${NVIDIA_API_KEY}
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
    restart: always`,
    },
  };

  const currentConfig = configs[activePlatform];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentConfig.code);
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentConfig.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentConfig.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0f121d] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0a0c13]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <Cloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">1-Click Cloud Deployment Assistant</h3>
              <p className="text-xs text-neutral-400 font-mono">Deploy to Vercel, Netlify, Cloudflare, or Docker in seconds</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Platform Selector */}
        <div className="px-6 py-3 border-b border-white/10 bg-[#0c0e18] flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'vercel', label: 'Vercel (Edge)' },
            { id: 'netlify', label: 'Netlify' },
            { id: 'docker', label: 'Dockerfile' },
            { id: 'compose', label: 'Docker Compose' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePlatform(p.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activePlatform === p.id
                  ? 'bg-emerald-500 text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh] bg-[#07090e]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-300 font-bold">{currentConfig.title} ({currentConfig.filename})</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white border border-white/10 flex items-center gap-1.5 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-xs font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 transition-all font-bold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed shadow-inner">
            <pre><code>{currentConfig.code}</code></pre>
          </div>

          {currentConfig.deployUrl && (
            <div className="pt-2">
              <a
                href={currentConfig.deployUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all hover:scale-[1.02]"
              >
                <span>Deploy to {activePlatform.toUpperCase()} Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0a0c13] flex items-center justify-between text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero-Config Static & Serverless Build Compliant</span>
          </div>
          <span>Production Ready</span>
        </div>
      </div>
    </div>
  );
}
