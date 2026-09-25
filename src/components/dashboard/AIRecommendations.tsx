import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { AIRecommendation, RecommendationPriority } from '../../types';
import {
  Lightbulb,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Building,
  TrendingDown,
  Filter,
  Flame,
  Zap,
} from 'lucide-react';

export const AIRecommendations: React.FC = () => {
  const { recommendations, applyRecommendation, dismissRecommendation, triggerAIOptimization } =
    useCampus();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  const filtered = recommendations.filter((rec) => {
    const matchesCat = filterCategory === 'all' || rec.category === filterCategory;
    const matchesPri = filterPriority === 'all' || rec.priority === filterPriority;
    return matchesCat && matchesPri;
  });

  const pendingCount = recommendations.filter((r) => r.status === 'pending').length;
  const appliedCount = recommendations.filter((r) => r.status === 'applied').length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Lightbulb className="w-6 h-6 text-emerald-400" />
              Intelligent Prescriptive Optimization Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {pendingCount} Actions Pending
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-objective optimization recommendations to minimize energy waste and maximize space utilization.
          </p>
        </div>

        <button
          onClick={triggerAIOptimization}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New Recommendation</span>
        </button>
      </div>

      {/* Filter and stats row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/70 border border-white/10">
        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Categories</option>
            <option value="Energy Optimization">Energy Optimization</option>
            <option value="Space Allocation">Space Allocation</option>
            <option value="Water Conservation">Water Conservation</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Priorities</option>
            <option value="HIGH">High Priority Only</option>
            <option value="MEDIUM">Medium Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 self-end sm:self-auto font-mono">
          <span>
            Pending: <strong className="text-amber-400">{pendingCount}</strong>
          </span>
          <span>•</span>
          <span>
            Applied: <strong className="text-emerald-400">{appliedCount}</strong>
          </span>
        </div>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-4">
        {filtered.map((rec) => {
          const isPending = rec.status === 'pending';

          return (
            <div
              key={rec.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isPending
                  ? rec.priority === 'HIGH'
                    ? 'bg-gradient-to-r from-slate-900/90 to-slate-950 border-rose-500/30 hover:border-rose-500/50 shadow-xl'
                    : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40 shadow-lg'
                  : 'bg-slate-950/50 border-white/5 opacity-75'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="space-y-3 flex-1">
                  {/* Category, Priority and Timestamp */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        rec.priority === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : rec.priority === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {rec.priority} PRIORITY
                    </span>

                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-white/5">
                      {rec.category}
                    </span>

                    {rec.buildingName && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-500" />
                        {rec.buildingName}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-500 font-mono ml-auto">
                      {rec.createdAt}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white tracking-tight">{rec.title}</h3>

                  {/* Problem & AI Analysis Box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Detected Issue:
                      </div>
                      <p className="text-slate-300 leading-relaxed">{rec.problem}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
                      <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> AI Telemetry Analysis:
                      </div>
                      <p className="text-slate-200 leading-relaxed">{rec.aiAnalysis}</p>
                    </div>
                  </div>

                  {/* Recommended Action */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/5 text-xs">
                    <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                      Recommended Execution:
                    </span>
                    <p className="text-white font-medium mt-0.5">{rec.recommendedAction}</p>
                  </div>

                  {/* Benefits and Impact */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-400">Expected Benefit:</span>
                      <strong className="text-emerald-400">{rec.expectedBenefit}</strong>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <span className="text-slate-400">Estimated Resource Savings:</span>
                      <strong className="text-cyan-300 font-mono">{rec.estimatedSavings}</strong>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex lg:flex-col gap-2 shrink-0 pt-2 lg:pt-0 self-start">
                  {isPending ? (
                    <>
                      <button
                        onClick={() => applyRecommendation(rec.id)}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Apply Recommendation</span>
                      </button>
                      <button
                        onClick={() => dismissRecommendation(rec.id)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Dismiss
                      </button>
                    </>
                  ) : (
                    <div className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Applied & Optimized
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
