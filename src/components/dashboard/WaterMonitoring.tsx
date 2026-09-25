import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { StatCard } from '../common/StatCard';
import {
  Droplets,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert,
  Gauge,
  CheckCircle2,
  Sliders,
  Wrench,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const WaterMonitoring: React.FC = () => {
  const { water, simulateWaterLeakage, applyRecommendation, setCurrentPage } = useCampus();
  const [inspectModalOpen, setInspectModalOpen] = useState(false);

  const weeklyWaterData = [
    { day: 'Mon', usage: 7900, recycled: 2400 },
    { day: 'Tue', usage: 8400, recycled: 2700 },
    { day: 'Wed', usage: 8240, recycled: 2600 },
    { day: 'Thu', usage: 8800, recycled: 2800 },
    { day: 'Fri', usage: 7600, recycled: 2500 },
    { day: 'Sat', usage: 3800, recycled: 1200 },
    { day: 'Sun', usage: 3100, recycled: 950 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Droplets className="w-6 h-6 text-cyan-400" />
              Smart Water Telemetry & Hydro-Conservation
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Flow: {water.currentFlowLMin} L/min
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Acoustic ultrasonic pipe sensors detecting micro-fissures, greywater reclamation, and flow balancing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateWaterLeakage}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all flex items-center gap-1.5"
          >
            <Droplets className="w-3.5 h-3.5" />
            Simulate Leakage
          </button>

          <button
            onClick={() => setInspectModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20"
          >
            <Wrench className="w-4 h-4" />
            <span>Inspect Manifold Valve</span>
          </button>
        </div>
      </div>

      {/* Anomaly Detection Banner (Requirement 18) */}
      {water.anomalyDetected && (
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 shadow-xl shadow-cyan-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                  🚨 Potential Leakage Detected
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                  +34% Flow Variance
                </span>
              </div>
              <p className="text-xs text-slate-200 mt-0.5">
                Water consumption in <strong>Block C (Computing Center)</strong> increased 34% above its normal historical baseline.
              </p>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Zone: <span className="text-cyan-300 font-mono">{water.leakageZone}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setInspectModalOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
            >
              Inspect Valve
            </button>
            <button
              onClick={() => applyRecommendation('rec_003')}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10"
            >
              Auto-Drop Pressure
            </button>
          </div>
        </div>
      )}

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Current Flow Rate"
          value={water.currentFlowLMin}
          unit="L / min"
          change="Instantaneous Flow"
          neutral={true}
          subtitle="Campus Main Inflow"
          icon={<Gauge className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />

        <StatCard
          title="Today's Consumption"
          value={water.todayLiters.toLocaleString()}
          unit="Liters"
          change="↑ 5.1% Baseline"
          isPositive={false}
          subtitle="MTD daily average"
          icon={<Droplets className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-sky-500/10 text-sky-400 border-sky-500/20"
        />

        <StatCard
          title="Monthly Usage"
          value={water.monthlyLiters.toLocaleString()}
          unit="Liters"
          change="↓ 12.4% vs Last Year"
          isPositive={true}
          subtitle="Greywater recycling: 24%"
          icon={<Droplets className="w-5 h-5" />}
          accentColor="emerald"
          iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hourly Flow Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Hydraulic Flow Pattern (24h)</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time liter-per-minute flow comparing today's rate against the 30-day baseline average.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Today's Flow
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Historical Avg
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={water.hourlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="L/m" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="flow"
                  name="Today's Flow (L/min)"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="average"
                  name="30-Day Avg (L/min)"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Building Variance & Leak Detection List (1 col) */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Building Flow Variance</h3>
            <p className="text-xs text-slate-400 mb-4">Deviation from expected baseline</p>

            <div className="space-y-3">
              {water.blockBreakdown.map((item) => (
                <div
                  key={item.block}
                  className={`p-3 rounded-xl border transition-all ${
                    item.variance > 20
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-slate-950/60 border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-white">{item.block}</span>
                    <span
                      className={`font-mono font-bold ${
                        item.variance > 20
                          ? 'text-rose-400'
                          : item.variance > 0
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {item.variance > 0 ? `+${item.variance}%` : `${item.variance}%`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 mt-1">
                    <span>Usage: {item.usage} L</span>
                    <span>{item.variance > 20 ? '⚠️ High Anomaly' : 'Normal Flow'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-slate-300">
            🌱 <strong>Campus Greywater:</strong> 24% of today's non-potable water is supplied by campus rainwater catchment tanks.
          </div>
        </div>
      </div>

      {/* Inspection Modal */}
      {inspectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-400" />
              Hydronic Manifold Valve Diagnostics
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Location: Computing & AI Center C - Basement Manifold #2
            </p>

            <div className="my-4 space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex justify-between">
                <span className="text-slate-400">Acoustic Leak Probability:</span>
                <span className="font-bold text-rose-400">92% (High Confidence)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex justify-between">
                <span className="text-slate-400">Pressure Differential:</span>
                <span className="font-bold text-amber-400">4.2 bar (Normal: 3.5 bar)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-white/5 flex justify-between">
                <span className="text-slate-400">Automated Solenoid:</span>
                <span className="font-bold text-emerald-400">Connected & Responsive</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  applyRecommendation('rec_003');
                  setInspectModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
              >
                Trigger Smart Flow Reduction
              </button>
              <button
                onClick={() => setInspectModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
