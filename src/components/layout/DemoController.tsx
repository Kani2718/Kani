import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  Sparkles,
  Zap,
  Droplets,
  Users,
  Brain,
  RotateCcw,
  Activity,
  ChevronUp,
  ChevronDown,
  Radio,
  Sliders,
} from 'lucide-react';

export const DemoController: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    isLiveSimulationActive,
    toggleLiveSimulation,
    simulateOccupancySpike,
    simulateEnergySpike,
    simulateWaterLeakage,
    triggerAIOptimization,
    resetDemoData,
    currentPage,
    setCurrentPage,
  } = useCampus();

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-full px-2 sm:px-0">
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Header Bar */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/30 border-b border-white/10 cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 font-mono">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Campus Simulation Console
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-1.5 py-0.5 rounded-full font-semibold">
              Live Ready
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Controls */}
        {isOpen && (
          <div className="p-3.5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/5">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Live Sensor Telemetry Ticker:
              </span>
              <button
                onClick={toggleLiveSimulation}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isLiveSimulationActive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                <Activity className="w-3 h-3" />
                {isLiveSimulationActive ? 'Active (4s Tick)' : 'Paused'}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Trigger simulated campus scenarios to inspect reactive AI alerts, charts, and optimization workflows:
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={simulateOccupancySpike}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 hover:border-amber-500/30 text-left transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-200">Surge Occupancy</div>
                  <div className="text-[10px] text-slate-400 truncate">+110 in Block B</div>
                </div>
              </button>

              <button
                onClick={simulateEnergySpike}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 hover:border-rose-500/30 text-left transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-105 transition-transform">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-200">Energy Spike</div>
                  <div className="text-[10px] text-slate-400 truncate">+48.5 kW Chiller</div>
                </div>
              </button>

              <button
                onClick={simulateWaterLeakage}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 hover:border-cyan-500/30 text-left transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-200">Water Leakage</div>
                  <div className="text-[10px] text-slate-400 truncate">+55 L/min Block C</div>
                </div>
              </button>

              <button
                onClick={triggerAIOptimization}
                className="flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 hover:from-emerald-900/70 hover:to-cyan-900/70 border border-emerald-500/30 text-left transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 group-hover:scale-105 transition-transform">
                  <Brain className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-emerald-200">Trigger AI Rec</div>
                  <div className="text-[10px] text-emerald-400/80 truncate">Optimize Microgrid</div>
                </div>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <button
                onClick={resetDemoData}
                className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-[11px]"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Baseline
              </button>

              {currentPage.startsWith('landing') ||
              currentPage === 'about' ||
              currentPage === 'features' ||
              currentPage === 'contact' ? (
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px]"
                >
                  <Sparkles className="w-3 h-3" />
                  Jump to Dashboard →
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage('recommendations')}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold text-[11px]"
                >
                  <Sparkles className="w-3 h-3" />
                  View AI Center →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
