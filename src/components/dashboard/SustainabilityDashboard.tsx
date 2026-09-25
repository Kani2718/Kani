import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { StatCard } from '../common/StatCard';
import { CircularScore } from '../common/CircularScore';
import {
  Leaf,
  Sun,
  Droplets,
  Zap,
  Award,
  TreePine,
  CheckCircle,
  TrendingUp,
  Download,
  Share2,
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
  Legend,
} from 'recharts';

export const SustainabilityDashboard: React.FC = () => {
  const { sustainability, energy, water } = useCampus();

  const esgBenchmarks = [
    { metric: 'LEED Platinum Energy Standard', score: 94, status: 'Exceeded' },
    { metric: 'Campus Water Neutrality Index', score: 88, status: 'On Track' },
    { metric: 'Greenhouse Gas Scope 1 & 2 Reduction', score: 91, status: 'Exceeded' },
    { metric: 'Rooftop Solar Integration Ratio', score: 82, status: 'Target Met' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Leaf className="w-6 h-6 text-emerald-400" />
              Institutional ESG & Campus Sustainability Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              Grade: A+
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tracking verified carbon offset metrics, renewable solar microgrid generation, and rainwater harvesting.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          Export ESG Audit
        </button>
      </div>

      {/* 4 Primary Sustainability KPIs (Requirement 22) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Energy Saved"
          value={`${sustainability.energySavedMWh} MWh`}
          change="↑ 14.2% YTD"
          isPositive={true}
          subtitle="Autonomous HVAC Drift"
          icon={<Zap className="w-5 h-5" />}
          accentColor="amber"
          iconBg="bg-amber-500/10 text-amber-400 border-amber-500/20"
        />

        <StatCard
          title="Clean Water Saved"
          value={`${sustainability.waterSavedLiters.toLocaleString()} L`}
          change="↑ 18.0% YTD"
          isPositive={true}
          subtitle="Recycled & leak prevented"
          icon={<Droplets className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />

        <StatCard
          title="Net CO₂ Reduction"
          value={`${sustainability.co2ReductionTons} Tons`}
          change="Equivalent to 412 Trees"
          isPositive={true}
          subtitle="Scope 1 & 2 Emissions"
          icon={<TreePine className="w-5 h-5" />}
          accentColor="emerald"
          iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />

        <StatCard
          title="Resource Efficiency Score"
          value={`${sustainability.resourceEfficiencyScore}%`}
          change="Target: 90% by 2027"
          isPositive={true}
          subtitle="LEED Gold Benchmark"
          icon={<Award className="w-5 h-5" />}
          accentColor="indigo"
          iconBg="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        />
      </div>

      {/* Score Showcase & Monthly Offset Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sustainability Score Circular Gauge (1 col) */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/30 p-6 shadow-xl flex flex-col items-center justify-between text-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Green Score Rating
            </span>
            <span className="text-[11px] font-mono text-slate-400">LEED Certified</span>
          </div>

          <div className="py-6">
            <CircularScore
              score={sustainability.resourceEfficiencyScore}
              maxScore={100}
              size={180}
              strokeWidth={12}
              label="Campus ESG"
              sublabel="Overall Sustainability Index"
              color="emerald"
            />
          </div>

          <div className="w-full space-y-2 text-xs pt-2">
            <p className="text-slate-300 leading-relaxed">
              Your institution ranks in the <strong>top 3%</strong> of smart sustainable campuses nationwide.
            </p>
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 font-semibold text-[11px]">
              🌱 18.4 MWh clean power generated & conserved this academic term.
            </div>
          </div>
        </div>

        {/* Monthly Trend Area / Bar Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Monthly Environmental Offset Trajectory</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Verified CO₂ tonnage eliminated and energy saved through AI scheduling and solar microgrids.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> CO₂ Avoided (Tons)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Energy Saved (MWh)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sustainability.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="co2Saved" name="CO₂ Avoided (Tons)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="energySaved" name="Energy Saved (MWh)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Institutional ESG Standards Checklist */}
      <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <h3 className="text-base font-bold text-white mb-4">
          Institutional ESG Accreditation Benchmarks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {esgBenchmarks.map((b) => (
            <div
              key={b.metric}
              className="p-4 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-slate-200 text-xs">{b.metric}</div>
                <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  {b.status} ({b.score}% compliance)
                </div>
              </div>
              <span className="text-xl font-bold font-mono text-white">{b.score}/100</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
