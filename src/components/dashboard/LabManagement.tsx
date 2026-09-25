import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { Laboratory, RoomStatus } from '../../types';
import {
  FlaskConical,
  Search,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Cpu,
  Clock,
  Calendar,
  Layers,
  Sparkles,
  Filter,
} from 'lucide-react';

export const LabManagement: React.FC = () => {
  const { laboratories, setCurrentPage } = useCampus();
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);

  const totalLabs = laboratories.length;
  const availableLabs = laboratories.filter((l) => l.status === 'Available').length;
  const occupiedLabs = laboratories.filter((l) => l.status === 'Occupied').length;
  const maintenanceLabs = laboratories.filter((l) => l.status === 'Maintenance').length;
  const avgUtilization = Math.round(
    laboratories.reduce((acc, l) => acc + l.utilizationRate, 0) / laboratories.length
  );

  const filtered = laboratories.filter((lab) => {
    const matchesDept = filterDept === 'all' || lab.department.includes(filterDept);
    const matchesSearch =
      lab.name.toLowerCase().includes(search.toLowerCase()) ||
      lab.labCode.toLowerCase().includes(search.toLowerCase()) ||
      lab.specializedEquipment.some((eq) => eq.toLowerCase().includes(search.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <FlaskConical className="w-6 h-6 text-emerald-400" />
              Specialized Research & High-Compute Labs
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-emerald-500/20 text-emerald-300">
              15 Facilities
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time monitoring of specialized laboratory equipment, power rack loads, gas safety sensors, and student schedules.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('recommendations')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Optimize Lab Scheduling</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-xs text-slate-400">Total Labs</div>
          <div className="text-xl font-bold text-white font-mono mt-1">{totalLabs}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
          <div className="text-xs text-emerald-400">Available</div>
          <div className="text-xl font-bold text-emerald-300 font-mono mt-1">{availableLabs}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
          <div className="text-xs text-cyan-400">Occupied</div>
          <div className="text-xl font-bold text-cyan-300 font-mono mt-1">{occupiedLabs}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
          <div className="text-xs text-rose-400">Maintenance</div>
          <div className="text-xl font-bold text-rose-300 font-mono mt-1">{maintenanceLabs}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 col-span-2 sm:col-span-1">
          <div className="text-xs text-indigo-400">Avg Utilization</div>
          <div className="text-xl font-bold text-indigo-300 font-mono mt-1">{avgUtilization}%</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/70 border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search lab name, code, or equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science & AI</option>
            <option value="Biomedical">Biomedical Engineering</option>
            <option value="Mechanical">Mechanical & Robotics</option>
            <option value="Chemistry">Chemistry & Materials</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>
        </div>
      </div>

      {/* Laboratories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lab) => (
          <div
            key={lab.id}
            onClick={() => setSelectedLab(lab)}
            className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-950/20 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {lab.labCode}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    lab.status === 'Occupied'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : lab.status === 'Available'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {lab.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                {lab.name}
              </h3>
              <div className="text-xs text-slate-400 mt-0.5">{lab.buildingName}</div>

              {/* Progress and Stats */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Active Workstations:</span>
                  <span className="font-mono font-bold text-white">
                    {lab.currentUsage} / {lab.capacity} seats ({lab.utilizationRate}%)
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                    style={{ width: `${lab.utilizationRate}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] pt-1 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    Load: <strong className="text-slate-200 font-mono">{lab.powerLoadKW} kW</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Safety: <strong className="text-emerald-300">{lab.safetyRating}</strong>
                  </span>
                </div>
              </div>

              {/* Equipment Tags */}
              <div className="mt-3">
                <div className="text-[11px] font-semibold text-slate-400 mb-1.5">Specialized Equipment:</div>
                <div className="flex flex-wrap gap-1">
                  {lab.specializedEquipment.slice(0, 3).map((eq) => (
                    <span
                      key={eq}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 text-slate-300 border border-white/5"
                    >
                      {eq}
                    </span>
                  ))}
                  {lab.specializedEquipment.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800/40 text-slate-400">
                      +{lab.specializedEquipment.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Upcoming Session Snippet */}
            <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="truncate">
                {lab.schedule.length > 0 ? (
                  <>
                    <strong className="text-slate-300">{lab.schedule[0].subject}</strong> (
                    {lab.schedule[0].time})
                  </>
                ) : (
                  'No pending reservations today'
                )}
              </span>
              <span className="text-emerald-400 font-semibold text-xs ml-2">Inspect →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lab Detail Modal */}
      {selectedLab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-2xl rounded-3xl border border-emerald-500/30 bg-slate-950 p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {selectedLab.labCode}
                  </span>
                  <h3 className="text-lg font-bold text-white">{selectedLab.name}</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {selectedLab.buildingName} • Department of {selectedLab.department}
                </p>
              </div>
              <button
                onClick={() => setSelectedLab(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-slate-400">Power Consumption</span>
                  <div className="text-lg font-bold text-amber-400 font-mono mt-1">
                    {selectedLab.powerLoadKW} kW
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-slate-400">Gas & Fume Sensor</span>
                  <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                    {selectedLab.hazardousGasSensor}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <span className="text-slate-400">Safety Index</span>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-1">
                    {selectedLab.safetyRating} Rating
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
                  Installed Hardware & Tooling:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedLab.specializedEquipment.map((eq) => (
                    <div
                      key={eq}
                      className="p-2 rounded-xl bg-slate-900/90 border border-white/5 flex items-center gap-2 text-slate-200"
                    >
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
                  Today's Scheduled Academic Sessions:
                </h4>
                {selectedLab.schedule.length > 0 ? (
                  <div className="space-y-2">
                    {selectedLab.schedule.map((slot, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-900/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="font-bold text-slate-200">{slot.subject}</div>
                          <div className="text-slate-400 text-[11px]">
                            {slot.professor} • {slot.enrolled} Students Enrolled
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 font-mono text-xs font-semibold self-start sm:self-auto">
                          {slot.time}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs italic">
                    No classroom sessions booked today. Available for walk-in research cohorts.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
