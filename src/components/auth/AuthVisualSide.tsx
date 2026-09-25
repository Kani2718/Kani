import React from 'react';
import { Cpu, Zap, Droplets, Users, Leaf, ShieldCheck, Activity, Radio, ArrowUpRight } from 'lucide-react';

interface AuthVisualSideProps {
  quote?: string;
}

export const AuthVisualSide: React.FC<AuthVisualSideProps> = ({
  quote = 'Autonomous telemetry, predictive loads, and intelligent space orchestration for next-generation universities.',
}) => {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-1/2 p-10 xl:p-14 bg-gradient-to-br from-slate-950 via-[#0a1120] to-[#040812] border-r border-white/10 overflow-hidden select-none">
      {/* Background Ambient Glows & Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Brand Block */}
      <div className="relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-400 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                SMART CAMPUS <span className="text-cyan-400">AI</span>
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                SaaS v2.4
              </span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl xl:text-3xl font-bold tracking-tight text-white font-sans mt-3">
            Smarter Resources.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Greener Campus.
            </span>{' '}
            Better Future.
          </h2>
          <p className="text-xs xl:text-sm text-slate-400 mt-2 max-w-md leading-relaxed font-sans">
            {quote}
          </p>
        </div>
      </div>

      {/* Centerpiece: Futuristic Interactive AI Campus Neural Blueprint */}
      <div className="relative z-10 my-8 flex items-center justify-center">
        <div className="relative w-full max-w-lg aspect-square max-h-[380px] p-6 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Animated SVG Circuit Lines & Nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Network Bus Lines */}
            <path d="M 80 100 L 200 60 L 320 120 L 260 260 L 140 280 Z" fill="none" stroke="url(#cyanGrad)" strokeWidth="1.5" strokeDasharray="4 3" />
            <path d="M 200 60 L 200 200 L 320 120" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
            <path d="M 80 100 L 200 200 L 140 280" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            <path d="M 200 200 L 260 260" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6" />
            
            {/* Center Core Hub */}
            <circle cx="200" cy="200" r="28" fill="#030712" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="200" cy="200" r="16" fill="#06b6d4" fillOpacity="0.2" className="animate-ping" />
            <circle cx="200" cy="200" r="6" fill="#38bdf8" />
          </svg>

          {/* Top Telemetry Pills */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs shadow-lg shadow-cyan-950/40">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">Smart Grid Load</div>
                <div className="font-mono font-bold text-white text-[11px]">168.4 kW <span className="text-emerald-400 text-[9px] font-sans">(-14.2%)</span></div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs shadow-lg shadow-emerald-950/40">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">Hydraulic Submeter</div>
                <div className="font-mono font-bold text-white text-[11px]">42.1 L/min <span className="text-cyan-400 text-[9px] font-sans">Nominal</span></div>
              </div>
            </div>
          </div>

          {/* Central AI Campus Mesh Visual */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-center animate-float">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Autonomous Engine Active
              </div>
              <div className="text-sm font-bold text-white">Campus Neural Mesh</div>
              <div className="text-[11px] text-slate-400 mt-0.5">3 Buildings • 28 Classrooms • 13 Labs</div>
            </div>
          </div>

          {/* Bottom Telemetry Pills */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">Live Occupancy</div>
                <div className="font-mono font-bold text-white text-[11px]">2,846 Active</div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <div>
                <div className="text-[10px] text-slate-400 leading-none">Green Eco Score</div>
                <div className="font-mono font-bold text-emerald-300 text-[11px]">86 / 100 A+</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Badges & Credibility */}
      <div className="relative z-10 space-y-3 pt-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-medium leading-tight">Role-Based RBAC Auth</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-slate-300">
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px] font-medium leading-tight">Sub-Second Telemetry Sync</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5 font-mono">
          <span>Enterprise Campus Gateway</span>
          <span className="text-emerald-400 flex items-center gap-1 font-sans">
            TLS 1.3 Encrypted <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
