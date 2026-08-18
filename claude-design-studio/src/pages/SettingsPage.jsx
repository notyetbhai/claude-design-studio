import React, { useState } from 'react';
import { Key, Shield, User, Bell, Globe, Database, Save, Check, Lock } from 'lucide-react';

export default function SettingsPage({ config }) {
  const primary = config.primaryColor || '#CC6B49';
  const isDark = config.isDark;

  const [saved, setSaved] = useState(false);
  const [orgName, setOrgName] = useState('Anthra Research Labs');
  const [webhookUrl, setWebhookUrl] = useState('https://api.enterprise.com/webhooks/claude');
  const [dataRetention, setDataRetention] = useState('zero');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto p-6 md:p-12 font-sans space-y-10">
      <div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-2" style={{ fontFamily: config.fontHeading }}>
          Organization & Security Settings
        </h1>
        <p className="text-sm opacity-60 font-mono">
          Manage private VPC peering, enterprise compliance, and automated webhook dispatch.
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm">
        {/* Organization Info */}
        <div className="p-6 md:p-8 rounded-3xl border backdrop-blur-xl space-y-5"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <h3 className="text-lg font-bold text-white font-sans">Organization Profile</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full p-2.5 rounded-xl border bg-black/40 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              />
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 block mb-1">Primary Region</label>
              <select className="w-full p-2.5 rounded-xl border bg-black/40 text-white font-sans text-xs focus:outline-none focus:border-amber-500"
                style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
              >
                <option>US-East (N. Virginia)</option>
                <option>EU-Central (Frankfurt)</option>
                <option>AP-Northeast (Tokyo)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Data Retention */}
        <div className="p-6 md:p-8 rounded-3xl border backdrop-blur-xl space-y-5"
          style={{
            backgroundColor: isDark ? 'rgba(18, 22, 33, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h3 className="text-lg font-bold text-white font-sans">Constitutional Data Privacy</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-xl border bg-black/30 flex items-center justify-between"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
            >
              <div>
                <div className="font-bold text-white">Strict Zero-Data Retention (ZDR)</div>
                <div className="text-neutral-400 text-[11px] mt-0.5">Payloads are processed exclusively in volatile RAM buffers.</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">ENFORCED</span>
            </div>

            <div className="p-4 rounded-xl border bg-black/30 flex items-center justify-between"
              style={{ borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
            >
              <div>
                <div className="font-bold text-white">Automated Red-Teaming Firewalls</div>
                <div className="text-neutral-400 text-[11px] mt-0.5">Blocks recursive context bypasses and weight tampering attempts.</div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold text-[10px]">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:opacity-90 transition-all hover:scale-105"
            style={{ backgroundColor: primary }}
          >
            {saved ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved Changes!' : 'Save Organization Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
