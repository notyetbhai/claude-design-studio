import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Check, 
  Key, 
  Mail, 
  User, 
  Zap, 
  Bot,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuthPage({ config, template, onLoginSuccess, onNavigate }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('alex.vance@enterprise.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Alex Vance');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
      if (onLoginSuccess) {
        onLoginSuccess({
          name: isLogin ? 'Alex Vance' : name,
          email,
          role: 'Lead AI Architect',
          org: 'Anthra Autonomous Systems',
        });
      }
    }, 600);
  };

  const handleQuickDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.4 } });
      if (onLoginSuccess) {
        onLoginSuccess({
          name: 'Alex Vance',
          email: 'alex.vance@enterprise.com',
          role: 'Lead Architect (Enterprise Demo)',
          org: 'Anthra Systems',
        });
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans relative">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{ backgroundColor: primary }}
      />

      <div 
        className="w-full max-w-md p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-7 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? 'rgba(18, 22, 33, 0.85)' : 'rgba(255, 255, 255, 0.9)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Top Brand Banner */}
        <div className="text-center">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-3"
            style={{ backgroundColor: primary }}
          >
            {template.content.nav.brandName ? template.content.nav.brandName.charAt(0) : 'A'}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-serif">
            {isLogin ? 'Welcome Back' : 'Create Enterprise Account'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            {isLogin ? 'Step 1: Sign in to access your autonomous design dashboard' : 'Step 1: Join the next-gen AI web design platform'}
          </p>
        </div>

        {/* 1-Click Quick Demo Login Button */}
        <button
          onClick={handleQuickDemoLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>⚡ 1-Click Instant Demo Login (Lead Architect)</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[11px] font-mono text-neutral-500 uppercase">Or continue with credentials</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Vance"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-black/40 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                />
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Work Email</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@enterprise.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-black/40 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              />
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-black/40 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              />
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50"
            style={{ backgroundColor: primary }}
          >
            <span>{loading ? 'Authenticating...' : isLogin ? 'Sign In & Connect API →' : 'Create Account & Continue →'}</span>
            {!loading && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </form>

        {/* Switch Login / Signup */}
        <div className="text-xs font-mono text-neutral-400 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-400 font-bold hover:underline"
          >
            {isLogin ? 'Sign up free' : 'Sign in'}
          </button>
        </div>

        {/* Security Footer */}
        <div 
          className="pt-4 border-t flex items-center justify-between text-[11px] text-neutral-500 font-mono"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SOC2 Type II Verified</span>
          </div>
          <span>Zero-Data Retention</span>
        </div>
      </div>
    </div>
  );
}
