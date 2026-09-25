import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { StatCard } from '../common/StatCard';
import {
  BrainCircuit,
  TrendingUp,
  Clock,
  Zap,
  Droplets,
  School,
  Sparkles,
  Layers,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

export const AIPredictions: React.FC = () => {
  const { predictions, triggerAIOptimization } = useCampus();
  const [selectedForecast, setSelectedForecast] = useState<'classrooms' | 'energy'>('classrooms');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <BrainCircuit className="w-6 h-6 text-cyan-400" />
              Predictive AI Forecasting & Capacity Engine
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Confidence: {predictions.confidenceScore}%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            LSTM neural networks trained on historical academic calendars, timetable rosters, and meteorological forecasts.
          </p>
        </div>

        <button
          onClick={triggerAIOptimization}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-md shadow-cyan-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Run Neural Re-Forecast</span>
        </button>
      </div>

      {/* 4 Forecast KPI Cards (Requirement 19) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Tomorrow's Classroom Demand"
          value={`${predictions.tomorrowClassroomDemand}%`}
          change="High Utilization Expected"
          isPositive={true}
          subtitle="40 active halls modelled"
          icon={<School className="w-5 h-5" />}
          accentColor="cyan"
          iconBg="bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
        />

        <StatCard
          title="Predicted Campus Peak Window"
          value={predictions.predictedPeakTime}
          change="88-96% Congestion"
          neutral={true}
          subtitle="Prepare cooling pre-chill"
          icon={<Clock className="w-5 h-5" />}
          accentColor="amber"
          iconBg="bg-amber-500/10 text-amber-400 border-amber-500/20"
        />

        <StatCard
          title="Energy Consumption Forecast"
          value={`${predictions.predictedEnergyKWh.toLocaleString()} kWh`}
          change="+13.7% vs Today"
          isPositive={false}
          subtitle="Hot weather trajectory"
          icon={<Zap className="w-5 h-5" />}
          accentColor="purple"
          iconBg="bg-purple-500/10 text-purple-400 border-purple-500/20"
        />

        <StatCard
          title="Water Demand Forecast"
          value={`${predictions.predictedWaterLiters.toLocaleString()} L`}
          change="+8.6% vs Today"
          isPositive={false}
          subtitle="Peak lab rinsing cycle"
          icon={<Droplets className="w-5 h-5" />}
          accentColor="emerald"
          iconBg="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
      </div>

      {/* Forecast Selector Tabs */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white">
              {selectedForecast === 'classrooms'
                ? 'Tomorrow’s Hourly Classroom Space Demand Projection (%)'
                : 'Projected Electrical Demand Profile with 95% Confidence Interval (kW)'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical actual telemetry curve overlaid with neural forecast and confidence boundaries.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-white/5 text-xs">
            <button
              onClick={() => setSelectedForecast('classrooms')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedForecast === 'classrooms'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Classroom Demand
            </button>
            <button
              onClick={() => setSelectedForecast('energy')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedForecast === 'energy'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Energy Demand
            </button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {selectedForecast === 'classrooms' ? (
              <AreaChart data={predictions.classroomDemandCurve} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="%" domain={[30, 100]} />
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
                  dataKey="predicted"
                  name="AI Projected Demand (%)"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#predGrad)"
                />
                <Line
                  type="monotone"
                  dataKey="historical"
                  name="Historical Average (%)"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="upper"
                  name="Upper Bound (95% CI)"
                  stroke="#38bdf8"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                />
              </AreaChart>
            ) : (
              <LineChart data={predictions.energyDemandCurve} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="kW" />
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
                  dataKey="predicted"
                  name="Predicted Load (kW)"
                  stroke="#c084fc"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="historical"
                  name="Baseline Load (kW)"
                  stroke="#64748b"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="upper"
                  name="Peak Upper Bound"
                  stroke="#f43f5e"
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Parameters & Explainability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs">
          <div className="text-cyan-400 font-bold uppercase tracking-wider text-[10px] mb-1">
            Model Architecture
          </div>
          <div className="text-white font-bold text-sm">Bidirectional LSTM + Transformer Attention</div>
          <p className="text-slate-400 mt-1 leading-relaxed">
            Multi-horizon autoregressive forecasting updated every 15 minutes with streaming telemetry.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs">
          <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] mb-1">
            Mean Absolute Error (MAE)
          </div>
          <div className="text-white font-bold text-sm">± 2.4% Across All Sensor Nodes</div>
          <p className="text-slate-400 mt-1 leading-relaxed">
            Exceeds industry standard baseline accuracy across varying campus term exams and holidays.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 text-xs">
          <div className="text-purple-400 font-bold uppercase tracking-wider text-[10px] mb-1">
            Autonomous Mitigation
          </div>
          <div className="text-white font-bold text-sm">Proactive Pre-Cooling Engaged</div>
          <p className="text-slate-400 mt-1 leading-relaxed">
            System will automatically chill Blocks A & B 45 minutes prior to the 10:00 AM classroom rush.
          </p>
        </div>
      </div>
    </div>
  );
};
