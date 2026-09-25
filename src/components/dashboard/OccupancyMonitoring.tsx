import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  Users,
  Activity,
  Layers,
  Building as BuildingIcon,
  Clock,
  Calendar,
  Sparkles,
  TrendingUp,
  MapPin,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const OccupancyMonitoring: React.FC = () => {
  const { buildings, classrooms, simulateOccupancySpike } = useCampus();
  const [viewType, setViewType] = useState<'live' | 'historical'>('live');
  const [activeBuildingId, setActiveBuildingId] = useState<string>('bld_2');

  const historicalTrend = [
    { hour: '08:00', total: 1120, bldA: 320, bldB: 410, bldC: 180, lib: 210 },
    { hour: '10:00', total: 2780, bldA: 780, bldB: 880, bldC: 420, lib: 700 },
    { hour: '12:00', total: 2950, bldA: 810, bldB: 920, bldC: 450, lib: 770 },
    { hour: '14:00', total: 2640, bldA: 740, bldB: 810, bldC: 390, lib: 700 },
    { hour: '16:00', total: 2110, bldA: 590, bldB: 640, bldC: 310, lib: 570 },
    { hour: '18:00', total: 1420, bldA: 380, bldB: 420, bldC: 190, lib: 430 },
    { hour: '20:00', total: 840, bldA: 180, bldB: 210, bldC: 110, lib: 340 },
  ];

  const activeBuilding = buildings.find((b) => b.id === activeBuildingId) || buildings[0];
  const buildingRooms = classrooms.filter((r) => r.buildingId === activeBuilding.id);

  // Group rooms by floor
  const floors = Array.from(new Set(buildingRooms.map((r) => r.floor))).sort();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Users className="w-6 h-6 text-purple-400" />
              Live Campus Occupancy & Space Intelligence
            </h1>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              Real-Time Mesh
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Optical LiDAR and WiFi triangulation telemetry indicating real-time crowd distribution across 5 primary blocks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-900 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setViewType('live')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'live'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Live View
            </button>
            <button
              onClick={() => setViewType('historical')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'historical'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Historical View
            </button>
          </div>

          <button
            onClick={simulateOccupancySpike}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simulate Surge
          </button>
        </div>
      </div>

      {/* Campus Building Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {buildings.map((bld) => {
          const isSelected = bld.id === activeBuildingId;
          const isHigh = bld.occupancyRate >= 80;

          return (
            <div
              key={bld.id}
              onClick={() => setActiveBuildingId(bld.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                isSelected
                  ? 'bg-slate-900 border-purple-500/50 shadow-xl shadow-purple-950/30'
                  : 'bg-slate-900/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-mono font-bold text-slate-400 group-hover:text-purple-400 transition-colors">
                  {bld.code}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isHigh
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  {bld.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white truncate">{bld.name}</h4>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-black text-white font-mono">
                  {bld.occupancyRate}%
                </span>
                <span className="text-xs text-slate-400">
                  {bld.currentOccupancy} / {bld.capacity}
                </span>
              </div>

              <div className="mt-2 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    bld.occupancyRate > 80
                      ? 'bg-gradient-to-r from-amber-400 to-rose-500'
                      : 'bg-gradient-to-r from-cyan-400 to-purple-500'
                  }`}
                  style={{ width: `${bld.occupancyRate}%` }}
                />
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>{bld.totalRooms} Rooms</span>
                <span className="text-purple-300 font-semibold group-hover:translate-x-1 transition-transform">
                  View Floors →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main View: Live Floor Breakdown & Interactive Layout or Historical Chart */}
      {viewType === 'live' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Detailed Selected Building Floor-by-Floor Heatmap */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5 text-purple-400" />
                  {activeBuilding.name} — Floor by Floor Heatmap
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Micro-zones showing actual vs capacity per classroom on each floor.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {activeBuilding.currentOccupancy} Active Occupants
              </span>
            </div>

            <div className="space-y-4">
              {floors.map((floorNum) => {
                const floorRooms = buildingRooms.filter((r) => r.floor === floorNum);
                const floorCapacity = floorRooms.reduce((acc, r) => acc + r.capacity, 0);
                const floorOcc = floorRooms.reduce((acc, r) => acc + r.currentOccupancy, 0);
                const floorUtil = floorCapacity > 0 ? Math.round((floorOcc / floorCapacity) * 100) : 0;

                return (
                  <div
                    key={floorNum}
                    className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-200">
                          Floor {floorNum}
                        </span>
                        <span className="text-xs text-slate-400">
                          ({floorOcc} / {floorCapacity} seats)
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-purple-400">
                        {floorUtil}% Load
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {floorRooms.map((room) => (
                        <div
                          key={room.id}
                          className={`p-2.5 rounded-lg border text-xs transition-all ${
                            room.status === 'Occupied'
                              ? room.utilizationRate > 80
                                ? 'bg-rose-950/30 border-rose-500/30'
                                : 'bg-cyan-950/30 border-cyan-500/30'
                              : 'bg-slate-900 border-white/5'
                          }`}
                        >
                          <div className="flex justify-between items-center font-mono font-bold">
                            <span className="text-white">{room.roomNumber}</span>
                            <span
                              className={`text-[10px] ${
                                room.status === 'Occupied' ? 'text-cyan-400' : 'text-slate-400'
                              }`}
                            >
                              {room.utilizationRate}%
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                            <span>{room.status}</span>
                            <span>{room.currentOccupancy} seats</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Campus Density Map / Radar */}
          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Compass className="w-5 h-5 text-cyan-400" />
                  Campus Density Radar
                </h3>
                <span className="text-xs text-slate-400 font-mono">5 Node Mesh</span>
              </div>

              {/* Graphical Campus Node Layout */}
              <div className="relative h-64 rounded-2xl bg-slate-950/90 border border-white/5 overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06)_0%,transparent_70%)]" />

                {/* Radar Grid Circles */}
                <div className="absolute w-48 h-48 rounded-full border border-white/5" />
                <div className="absolute w-32 h-32 rounded-full border border-white/5" />
                <div className="absolute w-16 h-16 rounded-full border border-cyan-500/10" />

                {buildings.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setActiveBuildingId(b.id)}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${b.coordinates.x}%`, top: `${b.coordinates.y}%` }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span
                        className={`w-6 h-6 rounded-full animate-ping absolute ${
                          b.occupancyRate > 80 ? 'bg-rose-500/40' : 'bg-cyan-500/40'
                        }`}
                      />
                      <div
                        className={`w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center shadow-lg ${
                          b.occupancyRate > 80 ? 'bg-rose-500' : 'bg-cyan-400'
                        }`}
                      />
                    </div>
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-slate-200 group-hover:border-cyan-400">
                      {b.code}: {b.occupancyRate}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                  <span>Busiest Zone:</span>
                  <span className="font-bold text-amber-400">Science Complex B (84%)</span>
                </div>
                <div className="flex justify-between text-slate-300 py-1 border-b border-white/5">
                  <span>Most Available Space:</span>
                  <span className="font-bold text-emerald-400">Computing Center C (51%)</span>
                </div>
                <div className="flex justify-between text-slate-300 py-1">
                  <span>Total Headcount On Campus:</span>
                  <span className="font-mono font-bold text-white">2,846 Students & Staff</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200">
              💡 <strong>AI Tip:</strong> Shift Science Complex afternoon overflow sections into Block C to avoid peak hall congestion.
            </div>
          </div>
        </div>
      ) : (
        /* Historical View */
        <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 sm:p-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">
                Hourly Occupancy Distribution Across Today's Shift
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Aggregated student and faculty headcounts recorded via IoT access points.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Block A
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Block B
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Block C
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Library
              </span>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={historicalTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="bldA" name="Block A" fill="#38bdf8" stackId="a" />
                <Bar dataKey="bldB" name="Block B" fill="#f59e0b" stackId="a" />
                <Bar dataKey="bldC" name="Block C" fill="#10b981" stackId="a" />
                <Bar dataKey="lib" name="Library Hub" fill="#a855f7" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
