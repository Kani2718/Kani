import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { AllocationRequest, AllocationRecommendation, RoomType } from '../../types';
import { X, Sparkles, CheckCircle, Zap, Users, Monitor, Building as BuildingIcon, ArrowRight } from 'lucide-react';

interface SmartAllocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SmartAllocationModal: React.FC<SmartAllocationModalProps> = ({ isOpen, onClose }) => {
  const { findOptimalRooms, allocateClassroom } = useCampus();

  const [studentCount, setStudentCount] = useState<number>(65);
  const [roomType, setRoomType] = useState<RoomType>('Lecture Hall');
  const [date, setDate] = useState<string>('2026-09-25');
  const [timeSlot, setTimeSlot] = useState<string>('10:00 AM - 12:00 PM');
  const [department, setDepartment] = useState<string>('Computer Science & Engineering');
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([
    '4K Projector',
    'Smart Whiteboard',
  ]);

  const [recommendations, setRecommendations] = useState<AllocationRecommendation[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!isOpen) return null;

  const equipmentOptions = [
    '4K Projector',
    'Smart Whiteboard',
    'Dual Laser Projectors',
    'Audio PA System',
    'Automated HVAC',
    'Lecture Capture HD',
    'IoT Ambient Sensors',
  ];

  const handleEquipmentToggle = (item: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      const results = findOptimalRooms({
        studentsCount: studentCount,
        roomType,
        date,
        timeSlot,
        requiredEquipment: selectedEquipment,
        department,
      });
      setRecommendations(results);
      setIsSearching(false);
    }, 450);
  };

  const handleAllocate = (rec: AllocationRecommendation) => {
    allocateClassroom(
      rec.room.id,
      `${department.split(' ')[0]} Lecture (${studentCount} Students)`,
      'AI Scheduled'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Smart Room Allocation Engine
              <span className="text-xs bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-semibold">
                AI Optimization
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Algorithm balances capacity fit, timetable availability, equipment match, and HVAC power consumption.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Number of Students
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min={1}
                  max={250}
                  value={studentCount}
                  onChange={(e) => setStudentCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Required Space Type
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as RoomType)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Standard Classroom">Standard Classroom</option>
                <option value="Seminar Room">Seminar Room</option>
                <option value="Auditorium">Auditorium</option>
                <option value="Computer Lab">Computer Lab</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Date & Time Slot
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="08:00 AM - 10:00 AM">08:00 - 10:00 AM</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                  <option value="12:30 PM - 02:30 PM">12:30 - 02:30 PM</option>
                  <option value="03:00 PM - 05:00 PM">03:00 - 05:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Requesting Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Required AV / Smart Equipment
            </label>
            <div className="flex flex-wrap gap-2">
              {equipmentOptions.map((eq) => {
                const active = selectedEquipment.includes(eq);
                return (
                  <button
                    type="button"
                    key={eq}
                    onClick={() => handleEquipmentToggle(eq)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border border-white/5 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {eq}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSearching}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  Running Neural Matching Algorithm...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Find Optimal Room
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results Presentation */}
        {recommendations && (
          <div className="mt-8 pt-6 border-t border-white/10 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                AI Ranked Recommendations ({recommendations.length} Matches Found)
              </h4>
              <span className="text-[11px] text-slate-400">Sorted by Composite Energy & Capacity Score</span>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div
                  key={rec.room.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    index === 0
                      ? 'bg-gradient-to-r from-cyan-950/40 to-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-900/60 border-white/5'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ★ Top Recommendation
                          </span>
                        )}
                        <span className="text-base font-bold text-white font-mono">
                          Room {rec.room.roomNumber}
                        </span>
                        <span className="text-xs text-slate-400">({rec.room.buildingName})</span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-cyan-400" />
                          Capacity: <strong>{rec.room.capacity}</strong> (Fit: {studentCount} seats)
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          Energy Efficiency: <strong className="text-emerald-400">{rec.efficiencyScore}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <BuildingIcon className="w-3.5 h-3.5 text-slate-400" />
                          Floor {rec.room.floor}
                        </span>
                      </div>

                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">AI Rationale:</strong> {rec.reason}
                      </p>
                      <p className="text-[11px] text-emerald-400/90 mt-0.5 font-medium">
                        🌱 {rec.energyImpact}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Match Confidence</div>
                        <div className="text-xl font-black text-cyan-400 font-mono">
                          {rec.matchScore}%
                        </div>
                      </div>

                      <button
                        onClick={() => handleAllocate(rec)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 flex items-center gap-1.5 transition-all shadow-md shadow-cyan-400/20"
                      >
                        <span>Allocate Room</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
