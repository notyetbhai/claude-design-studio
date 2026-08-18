import React from 'react';
import { BookOpen, ShieldCheck, Download, ArrowUpRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

export default function ResearchPage({ config }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const papers = [
    {
      title: 'Constitutional AI: Harmlessness from AI Feedback with Mathematical Bounds',
      authors: 'Anthra Safety Research Team',
      date: 'August 2026',
      abstract: 'We present a self-correcting alignment framework that prevents adversarial jailbreaks without diminishing intellectual neutrality or nuanced coding performance.',
      citations: '4,280 citations',
      tag: 'Alignment & Safety',
    },
    {
      title: 'Dictionary Learning for Monosemantic Latent Feature Interpretability',
      authors: 'Mechanistic Interpretability Lab',
      date: 'June 2026',
      abstract: 'Isolating millions of interpretable features inside neural transformer weights to map chain-of-thought activations directly to human concepts.',
      citations: '1,890 citations',
      tag: 'Interpretability',
    },
    {
      title: 'Sub-Millisecond Multi-Agent Orchestration with Deterministic Checkpointing',
      authors: 'Systems Architecture Group',
      date: 'April 2026',
      abstract: 'An asynchronous consensus engine enabling zero-copy agent handoffs with sub-2ms global synchronization over distributed edge nodes.',
      citations: '920 citations',
      tag: 'Systems & Compute',
    },
  ];

  return (
    <div className="min-h-screen max-w-6xl mx-auto p-6 md:p-12 font-sans space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-4"
          style={{
            backgroundColor: `${primary}14`,
            borderColor: `${primary}26`,
            color: primary,
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Research & Constitutional Manifesto</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4" style={{ fontFamily: config.fontHeading }}>
          Foundational Research in Human-Centric AI
        </h1>
        <p className="text-base sm:text-lg opacity-75 leading-relaxed">
          We publish our safety evaluations, mechanistic interpretability findings, and architectural breakthroughs openly to advance reliable software intelligence.
        </p>
      </div>

      {/* Research Papers Grid */}
      <div className="space-y-6">
        {papers.map((paper, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col md:flex-row justify-between gap-6"
            style={{
              backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            }}
          >
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold"
                  style={{
                    backgroundColor: `${primary}1a`,
                    color: primary,
                  }}
                >
                  {paper.tag}
                </span>
                <span className="text-xs opacity-50 font-mono">{paper.date}</span>
                <span className="text-xs opacity-50 font-mono">• {paper.citations}</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white font-serif">
                {paper.title}
              </h3>

              <p className="text-sm opacity-70 leading-relaxed">
                {paper.abstract}
              </p>

              <div className="text-xs font-mono opacity-50 pt-2">
                By {paper.authors}
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-start md:items-end justify-between gap-4 flex-shrink-0">
              <button className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-white hover:bg-white/10 flex items-center gap-2 transition-all">
                <Download className="w-3.5 h-3.5" />
                <span>Read PDF (18p)</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
