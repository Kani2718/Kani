import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { Classroom, RoomStatus } from '../../types';
import { SmartAllocationModal } from './SmartAllocationModal';
import {
  School,
  Search,
  Filter,
  Sparkles,
  Users,
  Zap,
  Thermometer,
  Wind,
  CheckCircle,
  Clock,
  AlertCircle,
  Building as BuildingIcon,
  ChevronRight,
  Layers,
} from 'lucide-react';

export const ClassroomManagement: React.FC = () => {
  const { classrooms, updateClassroomStatus } = useCampus();
  const [selectedBuilding, setSelectedBuilding] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Classroom | null>(null);

  // Filter logic
  const filtered = classrooms.filter((room) => {
    const matchesBuilding = selectedBuilding === 'all' || room.buildingName.includes(selectedBuilding);
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(search.toLowerCase()) ||
      room.department.toLowerCase().includes(search.toLowerCase()) ||
      room.buildingName.toLowerCase().includes(search.toLowerCase());
    return matchesBuilding && matchesStatus && matchesSearch;
  });

  const totalRooms = classrooms.length;
  const availableRooms = classrooms.filter((r) => r.status === 'Available').length;
  const occupiedRooms = classrooms.filter((r) => r.status === 'Occupied').length;
  const reservedRooms = classrooms.filter((r) => r.status === 'Reserved').length;
  const maintenanceRooms = classrooms.filter((r) => r.status === 'Maintenance').length;

  const statusBadge = (status: RoomStatus) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Available
          </span>
        );
      case 'Occupied':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Occupied
          </span>
        );
      case 'Reserved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Reserved
          </span>
        );
      case 'Maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Maintenance
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title & Allocation Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <School className="w-6 h-6 text-cyan-400" />
              Classroom & Lecture Hall Management
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/20 text-cyan-300">
              {filtered.length} Halls
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time space occupancy, thermal comfort metrics, and automated smart room scheduling.
          </p>
        </div>

        <button
          onClick={() => setIsAllocationModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Allocate Room (AI)</span>
        </button>
      </div>

      {/* Metric Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
          <div className="text-xs text-slate-400">Total Classrooms</div>
          <div className="text-xl font-bold text-white font-mono mt-1">{totalRooms}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
          <div className="text-xs text-emerald-400">Available Now</div>
          <div className="text-xl font-bold text-emerald-300 font-mono mt-1">{availableRooms}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
          <div className="text-xs text-cyan-400">Occupied</div>
          <div className="text-xl font-bold text-cyan-300 font-mono mt-1">{occupiedRooms}</div>
        </div>
        <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20">
          <div className="text-xs text-rose-400">Under Maintenance</div>
          <div className="text-xl font-bold text-rose-300 font-mono mt-1">{maintenanceRooms}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/70 border border-white/10">
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="relative min-w-[200px] flex-1 sm:flex-none">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search room (e.g. A101, Civil)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Buildings (5 Blocks)</option>
            <option value="Engineering Block A">Engineering Block A</option>
            <option value="Science Complex B">Science Complex B</option>
            <option value="Computing & AI Center C">Computing & AI Center C</option>
            <option value="Knowledge Hub">Central Library Hub D</option>
            <option value="Student Innovation">Student Innovation E</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
            <option value="Reserved">Reserved</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Grid Cards
          </button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Room / Building</th>
                <th className="py-3.5 px-3 font-semibold">Department</th>
                <th className="py-3.5 px-3 font-semibold text-center">Capacity</th>
                <th className="py-3.5 px-3 font-semibold text-center">Occupancy</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
                <th className="py-3.5 px-3 font-semibold text-center">Utilization</th>
                <th className="py-3.5 px-3 font-semibold">Environmental Telemetry</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((room) => (
                <tr
                  key={room.id}
                  className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                  onClick={() => setSelectedRoom(room)}
                >
                  <td className="py-3 px-4">
                    <div className="font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
                      {room.roomNumber}
                    </div>
                    <div className="text-[11px] text-slate-400">{room.buildingName} • Floor {room.floor}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-medium">{room.department}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-200">
                    {room.capacity}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-cyan-400">
                    {room.currentOccupancy}
                  </td>
                  <td className="py-3 px-3">{statusBadge(room.status)}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-mono font-bold text-slate-200">
                        {room.utilizationRate}%
                      </span>
                      <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            room.utilizationRate > 80
                              ? 'bg-rose-500'
                              : room.utilizationRate > 50
                              ? 'bg-cyan-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${room.utilizationRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1" title="Room Temperature">
                        <Thermometer className="w-3 h-3 text-amber-400" />
                        {room.tempCelsius}°C
                      </span>
                      <span className="flex items-center gap-1" title="CO2 Air Quality">
                        <Wind className="w-3 h-3 text-cyan-400" />
                        {room.airQualityPPM} ppm
                      </span>
                      <span className="flex items-center gap-1" title="HVAC Power Load">
                        <Zap className="w-3 h-3 text-yellow-400" />
                        {room.energyUsageKW} kW
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateClassroomStatus(
                          room.id,
                          room.status === 'Available' ? 'Occupied' : 'Available'
                        );
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                      {room.status === 'Available' ? 'Check In' : 'Free Room'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((room) => (
            <div
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className="p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
                  {room.roomNumber}
                </span>
                {statusBadge(room.status)}
              </div>

              <div className="text-xs text-slate-400 truncate mb-3">
                {room.buildingName} • Floor {room.floor}
              </div>

              <div className="space-y-2 text-xs border-y border-white/5 py-2.5 my-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Capacity / Occ:</span>
                  <span className="font-mono font-bold text-white">
                    {room.currentOccupancy} / {room.capacity} seats
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Utilization:</span>
                  <span className="font-mono font-bold text-cyan-400">{room.utilizationRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-medium text-slate-300 truncate max-w-[140px]">
                    {room.department}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-amber-400" />
                  {room.tempCelsius}°C
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  {room.energyUsageKW} kW
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3 h-3 text-cyan-400" />
                  {room.airQualityPPM} ppm
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Room Detail Drawer / Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                  Room {selectedRoom.roomNumber}
                  {statusBadge(selectedRoom.status)}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedRoom.buildingName} • Floor {selectedRoom.floor}
                </p>
              </div>
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <div className="text-slate-400">Capacity</div>
                  <div className="text-lg font-bold text-white font-mono mt-1">
                    {selectedRoom.capacity} seats
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-white/5">
                  <div className="text-slate-400">Current Occupancy</div>
                  <div className="text-lg font-bold text-cyan-400 font-mono mt-1">
                    {selectedRoom.currentOccupancy} ({selectedRoom.utilizationRate}%)
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-300 mb-2">Equipped Hardware:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRoom.equipment.map((eq) => (
                    <span
                      key={eq}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-cyan-300 text-[11px]"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRoom.nextSchedule && (
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                    Next Active Session
                  </span>
                  <div className="text-slate-200 font-bold mt-1">
                    {selectedRoom.nextSchedule.course}
                  </div>
                  <div className="text-slate-400 mt-0.5">
                    {selectedRoom.nextSchedule.instructor} • {selectedRoom.nextSchedule.time}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    updateClassroomStatus(
                      selectedRoom.id,
                      selectedRoom.status === 'Available' ? 'Occupied' : 'Available'
                    );
                    setSelectedRoom(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
                >
                  Toggle Availability Status
                </button>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Allocation Modal */}
      <SmartAllocationModal
        isOpen={isAllocationModalOpen}
        onClose={() => setIsAllocationModalOpen(false)}
      />
    </div>
  );
};
