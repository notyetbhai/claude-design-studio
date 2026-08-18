import React from 'react';
import { ArrowRight, Sparkles, Command, Server, LayoutGrid, User, Bot } from 'lucide-react';
import Logo from '../Logo';

export default function NavbarSection({ 
  nav, 
  config, 
  onNavigate, 
  currentPage,
  currentUser,
  isAuthenticated
}) {
  const { brandName, brandTag, ctaText } = nav;
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'planner', label: 'AI Planner', badge: 'NEW' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'playground', label: 'Playground' },
    { id: 'docs', label: 'Docs & API' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'research', label: 'Research' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl transition-colors duration-200 border-b"
      style={{
        backgroundColor: isDark ? 'rgba(12, 13, 18, 0.85)' : 'rgba(250, 248, 245, 0.85)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Brand with Custom Iconic Logo */}
        <div 
          onClick={() => onNavigate && onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <Logo size="md" />
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-lg tracking-tight">{brandName}</span>
            {brandTag && (
              <span 
                className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full font-bold tracking-widest"
                style={{
                  backgroundColor: `${primary}18`,
                  color: primary,
                }}
              >
                {brandTag}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Multi-Page Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`py-1 px-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'font-bold underline underline-offset-8 decoration-2'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  color: isActive ? primary : undefined,
                  textDecorationColor: isActive ? primary : undefined,
                }}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Badge or Login / Signup Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <div 
              onClick={() => onNavigate && onNavigate('settings')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-black/30 cursor-pointer hover:border-amber-500/40 transition-all text-xs font-mono"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                {currentUser?.name ? currentUser.name.charAt(0) : 'A'}
              </div>
              <span className="text-white font-medium hidden sm:inline">{currentUser?.name || 'Alex Vance'}</span>
            </div>
          ) : (
            <>
              <button 
                onClick={() => onNavigate && onNavigate('auth')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono opacity-80 border hover:opacity-100 hover:bg-neutral-500/10 transition-all"
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                }}
              >
                <span>Sign In</span>
              </button>

              <button 
                onClick={() => onNavigate && onNavigate('signup')}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-300 border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 transition-all font-semibold"
              >
                <span>Sign Up Free</span>
              </button>
            </>
          )}

          <button 
            onClick={() => onNavigate && onNavigate(isAuthenticated ? 'planner' : 'signup')}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition-all hover:opacity-95 hover:shadow-md hover:scale-105 active:scale-100"
            style={{ backgroundColor: primary }}
          >
            <span>{isAuthenticated ? 'Auto-Planner' : (ctaText || 'Get Started')}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
