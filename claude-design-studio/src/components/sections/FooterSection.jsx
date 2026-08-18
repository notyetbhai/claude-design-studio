import React from 'react';
import { ArrowUp, Globe, Shield, Code2 } from 'lucide-react';

export default function FooterSection({ footer, config, onNavigate }) {
  const { brandName, description, copyright } = footer;
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navColumns = [
    {
      title: 'Platform Pages',
      links: [
        { label: 'Homepage', id: 'home' },
        { label: 'Capabilities & Bento', id: 'features' },
        { label: 'Live Sandbox', id: 'playground' },
        { label: 'Agent Dashboard', id: 'dashboard' },
      ],
    },
    {
      title: 'Developer & API',
      links: [
        { label: 'Documentation', id: 'docs' },
        { label: 'Pricing Calculator', id: 'pricing' },
        { label: 'Model Context Protocol', id: 'docs' },
      ],
    },
    {
      title: 'Research & Security',
      links: [
        { label: 'Constitutional Safety', id: 'research' },
        { label: 'Settings & VPC', id: 'settings' },
        { label: 'Auth Sign In', id: 'auth' },
      ],
    },
  ];

  return (
    <footer 
      className="border-t py-16 px-6 transition-colors duration-200"
      style={{
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        backgroundColor: isDark ? 'rgba(8, 10, 15, 0.95)' : 'rgba(245, 243, 240, 0.95)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <div 
              onClick={() => onNavigate && onNavigate('home')}
              className="flex items-center gap-3 mb-4 cursor-pointer"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md"
                style={{ backgroundColor: primary }}
              >
                {brandName ? brandName.charAt(0) : 'C'}
              </div>
              <span className="font-bold text-lg tracking-tight">{brandName}</span>
            </div>

            <p className="text-sm opacity-70 leading-relaxed mb-6 max-w-sm">
              {description}
            </p>

            <div className="flex items-center gap-3 opacity-60">
              <button className="p-2 rounded-lg hover:bg-neutral-500/10 transition-colors" title="Developer Code">
                <Code2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-neutral-500/10 transition-colors" title="Global Network">
                <Globe className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-neutral-500/10 transition-colors" title="Security Compliance">
                <Shield className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navColumns.map((col, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider mb-4 opacity-50">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm opacity-75">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <button
                        onClick={() => onNavigate && onNavigate(link.id)}
                        className="hover:opacity-100 transition-opacity hover:underline underline-offset-4 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60 font-mono"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <div>{copyright}</div>

          <div className="flex items-center gap-6">
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-1.5 hover:opacity-100 transition-opacity"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
