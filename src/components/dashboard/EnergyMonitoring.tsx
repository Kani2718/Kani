import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { StatCard } from '../common/StatCard';
import {
  Zap,
  Sun,
  BatteryCharging,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowRight,
  Flame,
  CheckCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const EnergyMonitoring: React.FC = () => {
  const { energy, buildings, simulateEnergySpike, applyRecommendation, setCurrentPage } = useCampus();
  const [chartGranularity, setChartGranularity] = useState<'hourly' | 'daily' | 'monthly'>('hourly');

  const dailyData = [
    { day: 'Mon', consumption: 11800, solar: 3600, target: 12000 },
    { day: 'Tue', consumption: 12900, solar: 3900, target: 12000 },
    { day: 'Wed', consumption: 12480, solar: 3840, target: 12000 },
    { day: 'Thu', consumption: 13100, solar: 3700, target: 12000 },
    { day: 'Fri', consumption: 11400, solar: 4100, target: 12000 },
    { day: 'Sat', consumption: 5600, solar: 4300, target: 6000 },
    { day: 'Sun', consumption: 4800, solar: 4400, target: 5500 },
  ];

  const monthlyData = [
    { month: 'Jan', consumption: 362000, baseline: 380000 },
    { month: 'Feb', consumption: 341000, baseline: 370000 },
    { month: 'Mar', consumption: 355000, baseline: 375000 },
    { month: 'Apr', consumption: 338000, baseline: 365000 },
    { month: 'May', consumption: 348240, baseline: 370000 },
  ];

  const COLORS = ['#f59e0b', '#06b6d4', '#10b981', '#6366f1', '#ec4899'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Zap className="w-6 h-6 text-amber-400" />
              Campus Smart Energy & Microgrid Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Flow: {energy.currentKW} kW
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuous sub-metering, peak-shaving forecasts, and rooftop solar microgrid orchestration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateEnergySpike}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-all flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5" />
            Simulate Power Spike
          </button>

          <button
            onClick={() => setCurrentPage('recommendations')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-cyan-400 hover:from-amber-300 hover:to-cyan-300 transition-all shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Energy Actions</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Power Load"
          value={energy.currentKW}
          unit="kW"
          change="Real-time"
          neutral={true}
          subtitle="Instantaneous Demand"
          icon={<Zap className="w-5 h-5" />}
          accentColor="amber"
          iconBg="bg-amber-500/10 text-amber-400 border-amber-500/20"
        />

        <StatCard
          title="Today's Consumption"
          value={energy.todayKWh.toLocaleString()}
          unit="kWh"
          change="↓ 5.1% vs Yesterday"
          isPositive={true}
          subtitle={`Peak window: ${energy.peakHour}`}
          icon={<BatteryCharging className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />

        <StatCard
          title="Monthly Consumption"
          value={energy.monthlyKWh.toLocaleString()}
          unit="kWh"
          change="↓ 8.6% Baseline"
          isPositive={true}
          subtitle="Cumulative MTD"
          icon={<TrendingDown className="w-5 h-5" />}
          accentColor="emerald"
          iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />

        <StatCard
          title="Solar Generation (Today)"
          value={energy.solarGeneratedKWh.toLocaleString()}
          unit="kWh"
          change="↑ 30.8% of Total"
          isPositive={true}
          subtitle="Clean Renewable"
          icon={<Sun className="w-5 h-5" />}
          accentColor="indigo"
          iconBg="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        />
      </div>

      {/* AI Prescriptive Insight Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                AI Energy Insight
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300">
                Pattern Variance +23%
              </span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5">
              Energy usage in <strong>Science Complex B</strong> is 23% above its historical baseline due to chiller compressor duty cycle.
            </p>
          </div>
        </div>

        <button
          onClick={() => applyRecommendation('rec_002')}
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          Auto-Mitigate HVAC →
        </button>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Load Curve Area Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Power Demand Analysis</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect load shifts across intervals to eliminate expensive demand spikes.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-white/5 text-xs">
              <button
                onClick={() => setChartGranularity('hourly')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  chartGranularity === 'hourly'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hourly (24h)
              </button>
              <button
                onClick={() => setChartGranularity('daily')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  chartGranularity === 'daily'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Daily (Week)
              </button>
              <button
                onClick={() => setChartGranularity('monthly')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  chartGranularity === 'monthly'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartGranularity === 'hourly' ? (
                <AreaChart data={energy.hourlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="kW" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="today"
                    name="Today (kW)"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#energyGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="baseline"
                    name="Predicted Baseline (kW)"
                    stroke="#64748b"
                    strokeDasharray="4 4"
                    fill="transparent"
                  />
                </AreaChart>
              ) : chartGranularity === 'daily' ? (
                <BarChart data={dailyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="kWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="consumption" name="Grid Load (kWh)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="solar" name="Solar Produced (kWh)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="kWh" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="consumption" name="Actual (kWh)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="baseline" name="Target Budget (kWh)" fill="#334155" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Building Energy Breakdown Pie / List (1 col) */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Building Consumption Share</h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown of today's 12,480 kWh draw</p>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energy.buildingBreakdown}
                    dataKey="consumption"
                    nameKey="building"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {energy.buildingBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 space-y-2">
              {energy.buildingBreakdown.map((b, i) => (
                <div key={b.building} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    />
                    <span className="text-slate-300 truncate max-w-[130px]">{b.building}</span>
                  </div>
                  <div className="font-mono text-slate-400">
                    <span className="text-white font-bold">{b.percentage}%</span> ({b.consumption} kWh)
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400">
            <span className="flex items-center gap-1 font-semibold">
              <CheckCircle className="w-3.5 h-3.5" />
              Microgrid Power Factor: 0.98 (Optimal)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
