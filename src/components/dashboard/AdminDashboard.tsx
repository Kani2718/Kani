import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { StatCard } from '../common/StatCard';
import { CircularScore } from '../common/CircularScore';
import { SmartAllocationModal } from './SmartAllocationModal';
import {
  School,
  FlaskConical,
  Zap,
  Droplets,
  Users,
  Leaf,
  Brain,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  TrendingDown,
  TrendingUp,
  Sliders,
  RefreshCw,
  Eye,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    setCurrentPage,
    classrooms,
    laboratories,
    energy,
    water,
    sustainability,
    alerts,
    recommendations,
    applyRecommendation,
    simulateEnergySpike,
  } = useCampus();

  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);

  // Compute live aggregates from data
  const occupiedClassrooms = classrooms.filter((r) => r.status === 'Occupied').length;
  const classroomUtil = Math.round((occupiedClassrooms / classrooms.length) * 100);

  const occupiedLabs = laboratories.filter((l) => l.status === 'Occupied').length;
  const labUtil = Math.round((occupiedLabs / laboratories.length) * 100);

  const totalCurrentOccupancy = classrooms.reduce((acc, r) => acc + r.currentOccupancy, 0) +
    laboratories.reduce((acc, l) => acc + l.currentUsage, 0) + 1240; // Including atriums/library

  const weekdayOccupancyData = [
    { day: 'Mon', classrooms: 74, labs: 68, library: 80 },
    { day: 'Tue', classrooms: 82, labs: 75, library: 85 },
    { day: 'Wed', classrooms: 78, labs: 72, library: 82 },
    { day: 'Thu', classrooms: 85, labs: 79, library: 88 },
    { day: 'Fri', classrooms: 65, labs: 60, library: 70 },
  ];

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical' && a.status !== 'resolved');
  const activeRecommendations = recommendations.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Good Morning, {user?.name?.split(' ')[0] || 'Administrator'} 👋
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Campus AI Core Active
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here's the autonomous resource telemetry, occupancy trends, and AI recommendations across your campus today.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAllocationModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Allocate Room</span>
          </button>

          <button
            onClick={() => setCurrentPage('analytics')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-all"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Critical Alert Warning Banner (if any) */}
      {criticalAlerts.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 shadow-xl shadow-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
              <AlertTriangle className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400">
                  Critical Incident Detected
                </span>
                <span className="text-[10px] text-slate-400">{criticalAlerts[0].timestamp}</span>
              </div>
              <p className="text-xs font-medium text-slate-200 mt-0.5">
                <strong>{criticalAlerts[0].title}:</strong> {criticalAlerts[0].message}
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentPage('alerts')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-900/60 hover:bg-rose-800 border border-rose-500/30 whitespace-nowrap self-start sm:self-auto"
          >
            Investigate Incident →
          </button>
        </div>
      )}

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Classroom Utilization"
          value={`${classroomUtil}%`}
          change="↑ 3.4%"
          isPositive={true}
          subtitle="40 active halls"
          icon={<School className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
          onClick={() => setCurrentPage('classrooms')}
        />

        <StatCard
          title="Laboratory Utilization"
          value={`${labUtil}%`}
          change="↓ 1.8%"
          isPositive={false}
          subtitle="15 research labs"
          icon={<FlaskConical className="w-5 h-5" />}
          accentColor="indigo"
          iconBg="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
          onClick={() => setCurrentPage('labs')}
        />

        <StatCard
          title="Current Occupancy"
          value={totalCurrentOccupancy.toLocaleString()}
          unit="students"
          change="↑ 12.4%"
          isPositive={true}
          subtitle="Peak morning shift"
          icon={<Users className="w-5 h-5" />}
          accentColor="purple"
          iconBg="bg-purple-500/10 text-purple-400 border-purple-500/20"
          onClick={() => setCurrentPage('occupancy')}
        />

        <StatCard
          title="Energy Consumption"
          value={`${energy.todayKWh.toLocaleString()} kWh`}
          change="↓ 8.2%"
          isPositive={true}
          subtitle={`Flow: ${energy.currentKW} kW`}
          icon={<Zap className="w-5 h-5" />}
          accentColor="amber"
          iconBg="bg-amber-500/10 text-amber-400 border-amber-500/20"
          onClick={() => setCurrentPage('energy')}
        />

        <StatCard
          title="Water Consumption"
          value={`${water.todayLiters.toLocaleString()} L`}
          change="↑ 5.1%"
          isPositive={false}
          subtitle={`Flow: ${water.currentFlowLMin} L/min`}
          icon={<Droplets className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-sky-500/10 text-sky-400 border-sky-500/20"
          onClick={() => setCurrentPage('water')}
        />

        <StatCard
          title="CO₂ Reduction"
          value={`${sustainability.co2ReductionTons} t`}
          unit="CO₂"
          change="↑ 18.6%"
          isPositive={true}
          subtitle="Green rating: 86"
          icon={<Leaf className="w-5 h-5" />}
          accentColor="emerald"
          iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          onClick={() => setCurrentPage('sustainability')}
        />
      </div>

      {/* Main Analytics Row: Energy Area Chart & Space Utilization Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Energy Load Curve Area Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Campus Electrical Load Curve (24h)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                  Current: {energy.currentKW} kW
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparison of today's live profile vs yesterday and historical predictive baseline.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Today
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" /> Yesterday
              </span>
              <button
                onClick={() => setCurrentPage('energy')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold ml-2 flex items-center gap-1"
              >
                Deep Dive →
              </button>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energy.hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="todayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="yesterdayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
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
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#todayGrad)"
                />
                <Area
                  type="monotone"
                  dataKey="yesterday"
                  name="Yesterday (kW)"
                  stroke="#6366f1"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fillOpacity={1}
                  fill="url(#yesterdayGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Space Utilization Gauge & Weekly Breakdown (1 col) */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white tracking-tight">
                Sustainability & Efficiency Score
              </h3>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Tier 1 LEED
              </span>
            </div>

            <div className="py-2 flex justify-center">
              <CircularScore
                score={sustainability.resourceEfficiencyScore}
                maxScore={100}
                label="Efficiency"
                sublabel="Campus Resource Score"
                color="emerald"
                size={150}
              />
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">Clean Energy Offset:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {sustainability.solarCoveragePercent}% Solar
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                <span className="text-slate-400">Clean Water Conserved:</span>
                <span className="font-mono font-bold text-cyan-400">
                  {sustainability.waterSavedLiters.toLocaleString()} Liters
                </span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-400">Equivalent Trees Planted:</span>
                <span className="font-mono font-bold text-emerald-300">
                  +{sustainability.treesEquivalent} Mature Trees
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('sustainability')}
            className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
          >
            <span>View Full Sustainability Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Row: Smart AI Recommendations & Live Water / Occupancy breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dedicated AI Recommendations Card (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-950 border border-cyan-500/30 p-5 sm:p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  Active AI Optimization Recommendations
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    {activeRecommendations.length} Ready
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Prescriptive autonomous suggestions generated from multi-modal sensor telemetry.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('recommendations')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              Intelligence Hub →
            </button>
          </div>

          <div className="space-y-3.5">
            {activeRecommendations.slice(0, 2).map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          rec.priority === 'HIGH'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {rec.priority} PRIORITY
                      </span>
                      <span className="text-xs font-bold text-white">{rec.title}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-slate-200">Problem:</strong> {rec.problem}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-950/70 border border-white/5 text-xs text-cyan-300 font-medium">
                      💡 <strong>AI Analysis & Action:</strong> {rec.aiAnalysis}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                      <span>
                        Expected Impact: <strong className="text-emerald-400">{rec.expectedBenefit}</strong>
                      </span>
                      <span>
                        Savings: <strong className="text-white font-mono">{rec.estimatedSavings}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex sm:flex-col gap-2 pt-2 sm:pt-0">
                    <button
                      onClick={() => applyRecommendation(rec.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Apply Recommendation
                    </button>
                    <button
                      onClick={() => setCurrentPage('recommendations')}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      Inspect Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Breakdown & Leak Alerts (1 col) */}
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white tracking-tight">
                  Water Consumption & Blocks
                </h3>
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {water.currentFlowLMin} L/min
              </span>
            </div>

            {water.anomalyDetected && (
              <div className="p-3 mb-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Potential Leak Detected
                </div>
                <p className="text-slate-300 mt-1 text-[11px] leading-tight">
                  Block C Computing flow is +34% above normal. Manifold valve 3B active.
                </p>
              </div>
            )}

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={water.blockBreakdown} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="block" stroke="#64748b" tick={{ fontSize: 9 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} unit="L" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      fontSize: '11px',
                    }}
                  />
                  <Bar dataKey="usage" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage('water')}
            className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-all flex items-center justify-center gap-1.5 border border-white/5"
          >
            <span>Inspect Water Infrastructure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Weekday Utilization Line Chart */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Weekly Campus Space Utilization Trend (%)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical Monday-through-Friday utilization aggregated across classrooms, research labs, and library zones.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Classrooms
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Labs
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Library
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weekdayOccupancyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="%" domain={[40, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090d16',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Line type="monotone" dataKey="classrooms" name="Classrooms (%)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="labs" name="Laboratories (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="library" name="Knowledge Hub (%)" stroke="#c084fc" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Smart Room Allocation Modal */}
      <SmartAllocationModal
        isOpen={isAllocationModalOpen}
        onClose={() => setIsAllocationModalOpen(false)}
      />
    </div>
  );
};
