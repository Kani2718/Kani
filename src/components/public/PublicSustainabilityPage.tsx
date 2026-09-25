import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { CircularScore } from '../common/CircularScore';
import { Leaf, Sun, Droplets, TreePine, Award, CheckCircle, ArrowRight } from 'lucide-react';

export const PublicSustainabilityPage: React.FC = () => {
  const { sustainability, setCurrentPage } = useCampus();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16 animate-in fade-in">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          Public ESG & Sustainability Portal
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Our Collective Carbon Neutrality & Conservation Progress
        </h1>
        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transparent, audited campus sustainability metrics published for students, faculty, and institutional stakeholders.
        </p>
      </div>

      {/* Main Score Feature Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-emerald-950/40 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="space-y-4 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
            <Award className="w-4 h-4" />
            LEED Platinum Campus Standard
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Campus Eco-Efficiency Rating: {sustainability.resourceEfficiencyScore}/100
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our autonomous microgrid load management and acoustic leak prevention systems have saved a cumulative <strong>{sustainability.energySavedMWh} MWh</strong> of electrical energy and prevented <strong>{sustainability.waterSavedLiters.toLocaleString()} Liters</strong> of clean water loss this year.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs inline-flex items-center gap-2 transition-all shadow-md shadow-emerald-400/20"
            >
              <span>View Live Telemetry Data</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/5 shadow-2xl">
          <CircularScore
            score={sustainability.resourceEfficiencyScore}
            maxScore={100}
            size={180}
            strokeWidth={14}
            label="ESG Rating"
            sublabel="Institutional Green Score"
            color="emerald"
          />
        </div>
      </div>

      {/* 4 Impact Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto mb-2">
            <Sun className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {sustainability.energySavedMWh} MWh
          </div>
          <div className="text-xs font-bold text-slate-300">Clean Energy Conserved</div>
          <p className="text-[11px] text-slate-400">Equivalent to powering 48 homes for a year.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-2">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {sustainability.waterSavedLiters.toLocaleString()} L
          </div>
          <div className="text-xs font-bold text-slate-300">Clean Water Preserved</div>
          <p className="text-[11px] text-slate-400">Harvested rainwater & fixed micro-fissures.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
            <TreePine className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">
            {sustainability.co2ReductionTons} Tons
          </div>
          <div className="text-xs font-bold text-slate-300">Net CO₂ Reduction</div>
          <p className="text-[11px] text-slate-400">Equivalent to +412 mature carbon-offset trees.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black font-mono text-white">32.8%</div>
          <div className="text-xs font-bold text-slate-300">Rooftop Solar Share</div>
          <p className="text-[11px] text-slate-400">190 kW rooftop array powering campus labs.</p>
        </div>
      </div>
    </div>
  );
};
