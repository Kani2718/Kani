import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  Settings as SettingsIcon,
  Building,
  Bell,
  Shield,
  Palette,
  CheckCircle2,
  Lock,
  Smartphone,
  Globe,
  Save,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, addToast } = useCampus();

  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'appearance'>('general');
  const [institutionName, setInstitutionName] = useState(user?.institution || 'Apex Institute of Technology & Research');
  const [campusName, setCampusName] = useState('North Tech Campus');
  const [timezone, setTimezone] = useState('America/New_York (UTC-5)');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [aiRecTriggers, setAiRecTriggers] = useState(true);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Platform configurations updated successfully.',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="pb-4 border-b border-white/5">
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
          <SettingsIcon className="w-6 h-6 text-cyan-400" />
          Campus Platform Settings & System Governance
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure institutional metadata, AI thresholds, multi-factor security, and telemetry integrations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {[
          { id: 'general', label: 'General Institution', icon: <Building className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications & Alerts', icon: <Bell className="w-4 h-4" /> },
          { id: 'security', label: 'Security & 2FA', icon: <Shield className="w-4 h-4" /> },
          { id: 'appearance', label: 'Appearance & UI', icon: <Palette className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Settings Form Container */}
      <div className="max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Institutional Details
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Institution Name
                </label>
                <input
                  type="text"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Campus Name / Branch
                </label>
                <input
                  type="text"
                  value={campusName}
                  onChange={(e) => setCampusName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Time Zone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="America/New_York (UTC-5)">Eastern Time (US & Canada)</option>
                  <option value="America/Chicago (UTC-6)">Central Time</option>
                  <option value="America/Los_Angeles (UTC-8)">Pacific Time</option>
                  <option value="Europe/London (UTC+0)">London (GMT)</option>
                  <option value="Asia/Kolkata (UTC+5:30)">India Standard Time (IST)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Automated Notification Dispatches
              </h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Email Digest & Alerts</div>
                    <div className="text-[11px] text-slate-400">
                      Receive hourly digests of campus energy deviations and maintenance tasks.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Critical Anomaly Push Notifications</div>
                    <div className="text-[11px] text-slate-400">
                      Immediate alert when burst water leaks or chiller spikes occur.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={criticalAlerts}
                    onChange={(e) => setCriticalAlerts(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Autonomous AI Recommendation Triggers</div>
                    <div className="text-[11px] text-slate-400">
                      Notify administrators when the microgrid identifies load shifting opportunities.
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={aiRecTriggers}
                    onChange={(e) => setAiRecTriggers(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-0"
                  />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Authentication & Role Security
              </h3>

              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    Two-Factor Authentication (2FA)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Authenticator TOTP app (Google Authenticator / YubiKey)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    twoFactorEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5">
                <div className="text-xs font-bold text-white mb-2">Active Authenticated Sessions</div>
                <div className="text-[11px] text-slate-400 flex justify-between items-center py-1 border-b border-white/5">
                  <span>Chrome / macOS Sonoma (Current Device)</span>
                  <span className="text-emerald-400 font-bold">Online</span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between items-center py-1">
                  <span>Smart Campus Operations Terminal #3</span>
                  <span className="text-slate-500">2h ago</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4 rounded-2xl bg-slate-900/60 border border-white/10 p-6 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Theme and Interface Aesthetics
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setThemeMode('dark')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    themeMode === 'dark'
                      ? 'bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900 border-white/5'
                  }`}
                >
                  <div className="w-full h-16 rounded-xl bg-[#080c15] border border-cyan-500/30 mb-2 flex items-center justify-center">
                    <span className="text-xs text-cyan-400 font-bold">Deep Tech Dark</span>
                  </div>
                  <div className="text-xs font-bold text-white">Futuristic Dark (Default)</div>
                  <div className="text-[11px] text-slate-400">High contrast cyan/emerald glow</div>
                </div>

                <div
                  onClick={() => setThemeMode('light')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    themeMode === 'light'
                      ? 'bg-slate-950 border-cyan-400'
                      : 'bg-slate-900 border-white/5'
                  }`}
                >
                  <div className="w-full h-16 rounded-xl bg-slate-800 border border-white/10 mb-2 flex items-center justify-center">
                    <span className="text-xs text-slate-300 font-bold">Studio Slate</span>
                  </div>
                  <div className="text-xs font-bold text-white">Studio Slate Mode</div>
                  <div className="text-[11px] text-slate-400">Muted grey palette</div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-md shadow-cyan-500/25 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Platform Preferences</span>
          </button>
        </form>
      </div>
    </div>
  );
};
