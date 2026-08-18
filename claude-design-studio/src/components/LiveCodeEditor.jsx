import React, { useState, useEffect } from 'react';
import { Copy, Check, Download, RefreshCw, FileCode, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveCodeEditor({ 
  code, 
  onChange, 
  language = 'html',
  onApplyChanges,
  config 
}) {
  const [copied, setCopied] = useState(false);
  const [internalCode, setInternalCode] = useState(code);

  useEffect(() => {
    setInternalCode(code);
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(internalCode);
    setCopied(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([internalCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = language === 'jsx' ? 'LandingPage.jsx' : 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalCode(val);
    if (onChange) onChange(val);
  };

  const lineCount = (internalCode.match(/\n/g) || []).length + 1;

  return (
    <div className="flex flex-col h-full bg-[#07090e] border border-white/10 rounded-2xl overflow-hidden font-mono text-xs shadow-2xl">
      {/* Editor Chrome Top Bar */}
      <div className="px-4 py-2.5 bg-[#0a0c13] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          <div className="flex items-center gap-1.5 ml-2 text-neutral-400 font-mono text-xs">
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white font-medium">{language === 'jsx' ? 'LandingPage.jsx' : 'index.html'}</span>
            <span className="text-[10px] text-neutral-500">({lineCount} lines)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white flex items-center gap-1 text-[11px] transition-all"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-[11px] transition-all"
          >
            <Download className="w-3 h-3" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Editor Body with line numbers */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Line Numbers */}
        <div className="py-4 px-3 bg-[#05060a] border-r border-white/5 text-neutral-600 select-none text-right font-mono text-[11px] leading-relaxed hidden sm:block">
          {Array.from({ length: Math.min(lineCount, 300) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={internalCode}
          onChange={handleChange}
          spellCheck={false}
          className="flex-1 p-4 bg-transparent text-neutral-200 font-mono text-xs leading-relaxed focus:outline-none resize-none overflow-y-auto selection:bg-amber-500/30 selection:text-amber-200"
        />
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-[#0a0c13] border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
        <span className="text-emerald-400">● Live Two-Way Sync Active</span>
        <span>Tailwind CSS CDN • Google Fonts • SVG Icons</span>
      </div>
    </div>
  );
}
