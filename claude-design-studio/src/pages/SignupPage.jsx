import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Check, 
  Mail, 
  User, 
  Building2, 
  Bot, 
  Layers, 
  Zap,
  CheckCircle2
} from 'lucide-react';
import Logo from '../components/Logo';
import confetti from 'canvas-confetti';

export default function SignupPage({ config, template, onSignupSuccess, onNavigate }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [name, setName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@enterprise.com');
  const [password, setPassword] = useState('••••••••••••');
  const [org, setOrg] = useState('Anthra Autonomous Systems');
  const [useCase, setUseCase] = useState('agents');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
      if (onSignupSuccess) {
        onSignupSuccess({
          name: name.trim() || 'Alex Vance',
          email: email.trim(),
          org: org.trim() || 'Anthra Systems',
          useCase,
          role: 'Lead AI Architect',
        });
      }
    }, 550);
  };

  const handleInstantDemoSignup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.4 } });
      if (onSignupSuccess) {
        onSignupSuccess({
          name: 'Alex Vance',
          email: 'alex.vance@enterprise.com',
          org: 'Anthra Autonomous Systems',
          useCase: 'agents',
          role: 'Lead Architect (Demo)',
        });
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 font-sans relative">
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[150px] opacity-20 pointer-events-none"
        style={{ backgroundColor: primary }}
      />

      <div 
        className="w-full max-w-lg p-8 sm:p-10 rounded-3xl border backdrop-blur-2xl shadow-2xl space-y-7 relative overflow-hidden"
        style={{
          backgroundColor: isDark ? 'rgba(18, 22, 33, 0.9)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Header with Custom Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Logo size="lg" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-serif">
            Create Enterprise Research Account
          </h2>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            Step 1 of 3: Open-source access with NVIDIA NIM & Claude acceleration
          </p>
        </div>

        {/* 1-Click Instant Demo Signup Button */}
        <button
          onClick={handleInstantDemoSignup}
          disabled={loading}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>⚡ 1-Click Instant Signup as Lead Architect</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[11px] font-mono text-neutral-500 uppercase">Or register with credentials</span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">Organization / Lab</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Anthra Systems"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border bg-black/40 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                  style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
                />
                <Building2 className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>
          </div>

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

          {/* Primary Use Case */}
          <div>
            <label className="text-xs font-mono text-neutral-400 block mb-1.5">Primary Architectural Focus</label>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {[
                { id: 'agents', label: 'Autonomous AI Agents' },
                { id: 'web-design', label: 'Full-Stack Web Design' },
                { id: 'mcp-server', label: 'Claude MCP Protocol' },
                { id: 'research', label: 'Safety & Research' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setUseCase(item.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    useCase === item.id
                      ? 'border-amber-500 bg-amber-500/15 text-white font-bold'
                      : 'border-white/5 bg-black/30 text-neutral-400 hover:bg-neutral-800'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account & Initializing...' : 'Create Account & Connect AI API →'}</span>
            {!loading && <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="text-xs font-mono text-neutral-400 text-center">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate && onNavigate('auth')}
            className="text-amber-400 font-bold hover:underline"
          >
            Sign in here →
          </button>
        </div>

        {/* Security Footer */}
        <div 
          className="pt-4 border-t flex items-center justify-between text-[11px] text-neutral-500 font-mono"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Apache-2.0 Open Source • SOC2 Certified</span>
          </div>
          <span>Zero Data Retention</span>
        </div>
      </div>
    </div>
  );
}
