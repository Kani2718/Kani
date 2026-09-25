import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { User, Shield, Key, Clock, Award, Building, Mail, CheckCircle2 } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { user, setUserRole } = useCampus();

  const permissions = [
    { name: 'Telemetry Sensor Read Access', enabled: true },
    { name: 'Autonomous HVAC Setpoint Override', enabled: user?.role === 'Super Admin' || user?.role === 'Facility Manager' },
    { name: 'Classroom & Lab Reallocation Dispatch', enabled: true },
    { name: 'Incident Resolution & Work-Order Signoff', enabled: user?.role !== 'Faculty' },
    { name: 'ESG Carbon Audit Generation & Export', enabled: true },
    { name: 'Machine Learning Model Hyperparameter Tuning', enabled: user?.role === 'Super Admin' },
  ];

  const recentActions = [
    { action: 'Applied AI HVAC eco-drift recommendation for Block A', time: '25 mins ago' },
    { action: 'Inspected hydronic valve manifold diagnostic #W-409', time: '1 hour ago' },
    { action: 'Approved classroom reallocation request for CSE Lecture', time: '3 hours ago' },
    { action: 'Exported Monthly Energy Audit CSV report', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl">
      {/* Profile Card Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/40 border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'}
          alt="Avatar"
          className="w-24 h-24 rounded-2xl object-cover border-2 border-cyan-400 shadow-xl shadow-cyan-950/50"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-black text-white">{user?.name}</h1>
            <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {user?.role}
            </span>
          </div>

          <div className="text-xs text-slate-400 space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span>{user?.institution}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Switcher Sandbox for Judges */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/30 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              Simulate Role-Based Access Control (RBAC)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Switch role permissions on-the-fly to test dashboard authorization boundaries.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {(['Super Admin', 'Campus Admin', 'Facility Manager', 'Faculty'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setUserRole(r)}
              className={`p-3 rounded-xl text-left border transition-all ${
                user?.role === r
                  ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold shadow-md shadow-cyan-950/40'
                  : 'bg-slate-950 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="text-xs font-bold">{r}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {r === 'Super Admin'
                  ? 'Full Governance'
                  : r === 'Campus Admin'
                  ? 'Space & Schedules'
                  : r === 'Facility Manager'
                  ? 'HVAC & Plumbing'
                  : 'Classroom Booking'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-400" />
          Active Policy Authorizations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {permissions.map((p) => (
            <div
              key={p.name}
              className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between"
            >
              <span className="text-slate-300 font-medium">{p.name}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  p.enabled
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {p.enabled ? 'Authorized' : 'Restricted'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Audit Trail */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          Administrator Security Audit Trail
        </h3>

        <div className="space-y-2.5 text-xs">
          {recentActions.map((act, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between text-slate-300"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{act.action}</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">{act.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
