import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Calendar,
  CheckCircle,
  Building,
  Layers,
  Sparkles,
  Printer,
} from 'lucide-react';

export const AnalyticsReports: React.FC = () => {
  const { buildings, energy, water, sustainability, classrooms, recommendations } = useCampus();

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedBuilding, setSelectedBuilding] = useState('All Buildings');
  const [selectedResource, setSelectedResource] = useState('All Resources');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<boolean>(true);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedReport(true);
    }, 500);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Metric,Value,Unit,Benchmark\n' +
      `Classroom Utilization,78,%,70%\n` +
      `Laboratory Utilization,72,%,65%\n` +
      `Current Occupancy,2846,headcount,-\n` +
      `Energy Consumed Today,${energy.todayKWh},kWh,13000\n` +
      `Water Consumed Today,${water.todayLiters},L,9000\n` +
      `CO2 Reduction,${sustainability.co2ReductionTons},Tons,-\n` +
      `Sustainability Score,${sustainability.resourceEfficiencyScore},/100,80\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `smart_campus_ai_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              Campus Analytics, Audits & Report Generator
            </h1>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300">
              Audit Ready
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Produce executive summaries, facility compliance audits, and LEED sustainability reports with custom parametric filters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-md shadow-cyan-500/20"
          >
            <FileText className="w-4 h-4" />
            <span>Export PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Filter Parameters Bar */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          Parametric Audit Filters
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Time Horizon</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="Today">Today (Real-time telemetry)</option>
              <option value="Last 7 Days">Last 7 Days (Weekly Cycle)</option>
              <option value="Last 30 Days">Last 30 Days (Monthly Audit)</option>
              <option value="Current Academic Term">Current Academic Term (Spring 2026)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Facility</label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All Buildings">Entire Smart Campus (All 5 Blocks)</option>
              <option value="Engineering Block A">Engineering Block A</option>
              <option value="Science Complex B">Science Complex B</option>
              <option value="Computing & AI Center C">Computing & AI Center C</option>
              <option value="Knowledge Hub">Central Knowledge Hub & Library</option>
              <option value="Student Innovation">Student Innovation Center E</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Resource Scope</label>
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All Resources">Composite (Energy, Water, Space, Carbon)</option>
              <option value="Electricity">Electrical Grid & Rooftop Solar</option>
              <option value="Water">Hydraulic Flow & Greywater</option>
              <option value="Occupancy">Classroom & Lab Capacity</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">Academic Department</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All Departments">All Academic Departments</option>
              <option value="Engineering">School of Engineering</option>
              <option value="Sciences">Faculty of Pure & Applied Sciences</option>
              <option value="Computer Science">Computer Science & AI Operations</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-cyan-400/20"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Aggregating Telemetry Records...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Report Preview Sheet */}
      {generatedReport && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6 shadow-2xl backdrop-blur-xl">
          {/* Institutional Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 font-mono">
                Official Campus Resource Intelligence Report
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Apex Institute of Technology & Research — Facility Audit
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Scope: {selectedBuilding} • Interval: {dateRange} • Generated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="text-right font-mono text-xs">
              <span className="text-slate-400">Report Ref: </span>
              <span className="text-cyan-300 font-bold">#SCAI-2026-0924</span>
              <div className="text-emerald-400 font-bold mt-0.5 flex items-center justify-end gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Telemetry Verified
              </div>
            </div>
          </div>

          {/* Key Audit Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5">
              <span className="text-slate-400">Classroom Utilization</span>
              <div className="text-xl font-bold text-white font-mono mt-1">78% Average</div>
              <span className="text-[10px] text-emerald-400">↑ 3.4% Target Exceeded</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5">
              <span className="text-slate-400">Total Power Consumed</span>
              <div className="text-xl font-bold text-amber-400 font-mono mt-1">
                {energy.todayKWh.toLocaleString()} kWh
              </div>
              <span className="text-[10px] text-emerald-400">↓ 8.2% Under Baseline</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5">
              <span className="text-slate-400">Clean Water Inflow</span>
              <div className="text-xl font-bold text-cyan-400 font-mono mt-1">
                {water.todayLiters.toLocaleString()} L
              </div>
              <span className="text-[10px] text-slate-400">24% Recycled Greywater</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5">
              <span className="text-slate-400">ESG Sustainability Score</span>
              <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                {sustainability.resourceEfficiencyScore} / 100
              </div>
              <span className="text-[10px] text-emerald-300">LEED Gold Benchmark</span>
            </div>
          </div>

          {/* Executive Observations Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Autonomous Optimization Log
            </h4>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase">
                    <th className="py-2.5 px-3">System / Space</th>
                    <th className="py-2.5 px-3">Intervention</th>
                    <th className="py-2.5 px-3">Resource Savings</th>
                    <th className="py-2.5 px-3">CO₂ Impact</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Classrooms A104 & A204</td>
                    <td className="py-2.5 px-3">HVAC Eco-Drift engaged during vacancy</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-400">210 kWh / day</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400">-68 kg CO₂</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Database Lab 3 → Lab 5</td>
                    <td className="py-2.5 px-3">Thermal load migration to zoned facility</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-400">14.4 kWh / hr</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400">-42 kg CO₂</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">
                        Optimized
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Block C Hydronic Manifold</td>
                    <td className="py-2.5 px-3">Nighttime smart pressure reduction</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-400">1,200 L / day</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400">Conserved</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300">
                        Resolved
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
