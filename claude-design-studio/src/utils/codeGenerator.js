// Generates pristine standalone HTML, React JSX, and Tailwind configurations

export function generateFullHTML(template, config) {
  const { style, content } = template;
  const isDark = config.isDark;
  const primary = config.primaryColor || style.primaryColor;
  const accent = config.accentColor || style.accentColor;
  const bg = isDark ? (config.bgColor || '#0c0d12') : '#FAF8F5';
  const cardBg = isDark ? '#141721' : '#FFFFFF';
  const text = isDark ? '#F3F4F6' : '#1F1D1A';
  const subtext = isDark ? '#9CA3AF' : '#6E675F';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  return `<!DOCTYPE html>
<html lang="en" class="${isDark ? 'dark' : ''}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.nav.brandName} — ${content.hero.titleHighlight}</title>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brandPrimary: '${primary}',
            brandAccent: '${accent}',
          },
          fontFamily: {
            heading: [${config.fontHeading ? config.fontHeading.split(',')[0] : "'Instrument Serif'"}, 'serif'],
            body: [${config.fontBody ? config.fontBody.split(',')[0] : "'Inter'"}, 'sans-serif'],
            mono: ["'JetBrains Mono'", 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: ${config.fontBody || "'Inter', sans-serif"};
      background-color: ${bg};
      color: ${text};
    }
    h1, h2, h3, .font-heading {
      font-family: ${config.fontHeading || "'Instrument Serif', serif"};
    }
    .glass-card {
      background: ${isDark ? 'rgba(20, 23, 33, 0.7)' : 'rgba(255, 255, 255, 0.85)'};
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid ${border};
    }
  </style>
</head>
<body class="min-h-screen selection:bg-[${accent}] selection:text-white transition-colors duration-300">

  <!-- Ambient Glow Background -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[${primary}]/15 to-[${accent}]/15 blur-[140px] rounded-full"></div>
  </div>

  <!-- Navigation -->
  <header class="sticky top-0 z-50 backdrop-blur-md bg-[${bg}]/80 border-b border-[${border}]">
    <div class="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-[${primary}] flex items-center justify-center text-white font-bold text-sm shadow-md">
          ${content.nav.brandName.charAt(0)}
        </div>
        <div class="flex items-baseline gap-2">
          <span class="font-semibold text-lg tracking-tight">${content.nav.brandName}</span>
          <span class="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[${primary}]/10 text-[${primary}] tracking-widest font-semibold">${content.nav.brandTag || 'AI'}</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[${subtext}]">
        ${content.nav.links.map(link => `<a href="#${link.toLowerCase()}" class="hover:text-[${text}] transition-colors">${link}</a>`).join('\n        ')}
      </nav>

      <div class="flex items-center gap-4">
        <a href="#pricing" class="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[${primary}] hover:opacity-90 rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95">
          ${content.nav.ctaText}
        </a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="relative pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
    <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[${primary}]/10 text-[${primary}] border border-[${primary}]/25 mb-8 animate-pulse">
      <span>✨</span>
      <span>${content.hero.badge}</span>
    </div>

    <h1 class="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
      ${content.hero.titlePrefix} <span class="italic font-normal text-[${primary}] underline decoration-[${accent}]/30 decoration-wavy decoration-2">${content.hero.titleHighlight}</span> ${content.hero.titleSuffix}
    </h1>

    <p class="text-lg md:text-xl text-[${subtext}] max-w-3xl mx-auto leading-relaxed mb-10">
      ${content.hero.subtitle}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
      <a href="#cta" class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[${primary}] text-white font-medium text-sm shadow-lg shadow-[${primary}]/25 hover:opacity-90 transition-all hover:-translate-y-0.5">
        ${content.hero.primaryCta} →
      </a>
      <a href="#demo" class="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[${cardBg}] border border-[${border}] text-[${text}] font-medium text-sm hover:bg-neutral-500/10 transition-all">
        ${content.hero.secondaryCta}
      </a>
    </div>

    <!-- Live Telemetry Stats -->
    <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto p-6 rounded-2xl glass-card">
      ${content.hero.stats.map(s => `
        <div class="text-center">
          <div class="text-2xl md:text-3xl font-bold text-[${primary}] font-mono">${s.value}</div>
          <div class="text-xs text-[${subtext}] uppercase tracking-wider mt-1">${s.label}</div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Logo Cloud -->
  <section class="py-12 border-y border-[${border}] bg-neutral-500/5">
    <div class="max-w-6xl mx-auto px-6 text-center">
      <p class="text-xs uppercase tracking-widest text-[${subtext}] font-mono mb-6">${content.logos.title}</p>
      <div class="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-70">
        ${content.logos.items.map(logo => `<span class="text-lg font-semibold tracking-wider font-mono">${logo}</span>`).join('')}
      </div>
    </div>
  </section>

  <!-- Bento Grid -->
  <section class="py-24 px-6 max-w-6xl mx-auto">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <span class="text-xs font-mono font-semibold uppercase tracking-widest text-[${primary}]">${content.bento.tag}</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">${content.bento.title}</h2>
      <p class="text-[${subtext}] text-base">${content.bento.subtitle}</p>
    </div>

    <div class="grid grid-cols-12 gap-6">
      ${content.bento.cards.map(card => `
        <div class="${card.colSpan} p-8 rounded-2xl glass-card relative group hover:border-[${primary}]/40 transition-all duration-300">
          <div class="inline-flex px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold bg-[${primary}]/10 text-[${primary}] mb-4">
            ${card.badge}
          </div>
          <h3 class="text-xl font-bold mb-2 text-[${text}]">${card.title}</h3>
          <p class="text-sm text-[${subtext}] leading-relaxed">${card.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Interactive Pricing -->
  <section id="pricing" class="py-24 px-6 max-w-6xl mx-auto">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <span class="text-xs font-mono font-semibold uppercase tracking-widest text-[${primary}]">${content.pricing.tag}</span>
      <h2 class="text-3xl md:text-4xl font-bold mt-2 mb-4">${content.pricing.title}</h2>
      <p class="text-[${subtext}] text-base">${content.pricing.subtitle}</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      ${content.pricing.plans.map(plan => `
        <div class="p-8 rounded-2xl glass-card flex flex-col justify-between relative ${plan.isPopular ? `ring-2 ring-[${primary}] shadow-xl shadow-[${primary}]/10` : ''}">
          ${plan.isPopular ? `<div class="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[${primary}] text-white tracking-widest uppercase">Popular</div>` : ''}
          <div>
            <div class="text-xs font-mono text-[${subtext}] uppercase tracking-wider">${plan.badge}</div>
            <h3 class="text-2xl font-bold mt-1 mb-2">${plan.name}</h3>
            <p class="text-xs text-[${subtext}] mb-6">${plan.description}</p>
            <div class="flex items-baseline gap-1 mb-6">
              <span class="text-4xl font-bold font-mono text-[${primary}]">${plan.priceMonthly}</span>
              <span class="text-xs text-[${subtext}]">${plan.period}</span>
            </div>
            <ul class="space-y-3 text-sm text-[${subtext}] mb-8">
              ${plan.features.map(f => `<li class="flex items-center gap-2"><span>✓</span> <span>${f}</span></li>`).join('')}
            </ul>
          </div>
          <button class="w-full py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-all ${plan.isPopular ? `bg-[${primary}] text-white hover:opacity-90` : `border border-[${border}] hover:bg-neutral-500/10`}">
            ${plan.cta}
          </button>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- CTA Banner -->
  <section id="cta" class="py-20 px-6 max-w-5xl mx-auto text-center">
    <div class="p-12 md:p-16 rounded-3xl bg-gradient-to-b from-[${primary}]/10 to-transparent border border-[${primary}]/20 glass-card">
      <div class="inline-flex px-3 py-1 rounded-full text-xs font-mono bg-[${primary}]/15 text-[${primary}] mb-6">
        ${content.cta.badge}
      </div>
      <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-4">${content.cta.title}</h2>
      <p class="text-[${subtext}] text-base md:text-lg max-w-2xl mx-auto mb-8">${content.cta.subtitle}</p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <button class="px-8 py-3.5 rounded-xl bg-[${primary}] text-white font-medium text-sm shadow-md hover:opacity-90 transition-all">
          ${content.cta.primaryButton}
        </button>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-[${border}] py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[${subtext}]">
    <div>${content.footer.copyright}</div>
    <div class="flex gap-6 font-mono">
      <a href="#" class="hover:text-[${text}]">Documentation</a>
      <a href="#" class="hover:text-[${text}]">GitHub</a>
      <a href="#" class="hover:text-[${text}]">Privacy</a>
    </div>
  </footer>

</body>
</html>`;
}

export function generateReactCode(template, config) {
  const { content } = template;
  const isDark = config.isDark;
  const primary = config.primaryColor || '#CC6B49';

  return `// Generated by ClaudeDesign Studio — Ready to use in React / Next.js
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, ShieldCheck, Zap, Globe, Code2 } from 'lucide-react';

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="${isDark ? 'dark bg-[#090D16] text-[#F8FAFC]' : 'bg-[#FAF8F5] text-[#1F1D1A]'} min-h-screen font-sans antialiased selection:bg-[${primary}] selection:text-white">
      
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 border-b border-neutral-200/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[${primary}] flex items-center justify-center text-white font-bold">
              ${content.nav.brandName.charAt(0)}
            </div>
            <span className="font-semibold text-lg tracking-tight">${content.nav.brandName}</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            ${content.nav.links.map(link => `<a href="#${link.toLowerCase()}" className="hover:text-white transition-colors">${link}</a>`).join('\n            ')}
          </nav>

          <button className="px-4 py-2 text-xs font-semibold text-white bg-[${primary}] rounded-lg hover:opacity-90 transition-all">
            ${content.nav.ctaText}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[${primary}]/10 text-[${primary}] border border-[${primary}]/20 mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>${content.hero.badge}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 leading-[1.1]">
          ${content.hero.titlePrefix} <span className="italic font-normal text-[${primary}]">${content.hero.titleHighlight}</span> ${content.hero.titleSuffix}
        </h1>

        <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed mb-10">
          ${content.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="px-8 py-3.5 rounded-xl bg-[${primary}] text-white font-medium text-sm shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
            <span>${content.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 font-medium text-sm hover:bg-white/10 transition-all">
            ${content.hero.secondaryCta}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10">
          ${content.hero.stats.map(s => `
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[${primary}] font-mono">${s.value}</div>
              <div className="text-xs text-neutral-400 uppercase tracking-wider mt-1">${s.label}</div>
            </div>
          `).join('')}
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[${primary}]">${content.bento.tag}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 font-serif">${content.bento.title}</h2>
          <p className="text-neutral-400 text-base">${content.bento.subtitle}</p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          ${content.bento.cards.map(card => `
            <div className="${card.colSpan} p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[${primary}]/40 transition-all">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[${primary}]/10 text-[${primary}] font-semibold">
                ${card.badge}
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2">${card.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">${card.description}</p>
            </div>
          `).join('')}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-neutral-500 font-mono">
        ${content.footer.copyright}
      </footer>
    </div>
  );
}
`;
}
