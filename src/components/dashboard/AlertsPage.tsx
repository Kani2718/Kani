import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { CampusAlert, AlertSeverity } from '../../types';
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle,
  Filter,
  CheckCheck,
  Search,
  Building,
  Wrench,
  Sparkles,
} from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, markAlertRead, resolveAlert, setCurrentPage } = useCampus();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [activeAlertDetail, setActiveAlertDetail] = useState<CampusAlert | null>(null);

  const filtered = alerts.filter((a) => {
    const matchesSev = selectedSeverity === 'all' || a.severity === selectedSeverity;
    const matchesStat = selectedStatus === 'all' || a.status === selectedStatus;
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase()) ||
      (a.buildingName && a.buildingName.toLowerCase().includes(search.toLowerCase()));
    return matchesSev && matchesStat && matchesSearch;
  });

  const criticalCount = alerts.filter((a) => a.severity === 'critical' && a.status !== 'resolved').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning' && a.status !== 'resolved').length;
  const attentionCount = alerts.filter((a) => a.severity === 'attention' && a.status !== 'resolved').length;
  const infoCount = alerts.filter((a) => a.severity === 'info').length;

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            🔴 Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            🟠 Warning
          </span>
        );
      case 'attention':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            🟡 Attention
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            🟢 Information
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
              Campus Anomaly & Alert Incident Center
            </h1>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-300">
              {alerts.filter((a) => a.status === 'unread').length} Unread
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated sensor fault detection, continuous environmental thresholds, and facility incident dispatch.
          </p>
        </div>

        <button
          onClick={() => alerts.forEach((a) => markAlertRead(a.id))}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-white/10 hover:bg-slate-800 transition-all self-start sm:self-auto"
        >
          <CheckCheck className="w-4 h-4 text-cyan-400" />
          Mark All As Read
        </button>
      </div>

      {/* Severity Counter Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div
          onClick={() => setSelectedSeverity('critical')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'critical'
              ? 'bg-rose-950/40 border-rose-500'
              : 'bg-rose-950/20 border-rose-500/20 hover:border-rose-500/40'
          }`}
        >
          <div className="text-xs text-rose-400 font-bold">🔴 Critical Incidents</div>
          <div className="text-xl font-bold text-white font-mono mt-1">{criticalCount}</div>
        </div>

        <div
          onClick={() => setSelectedSeverity('warning')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'warning'
              ? 'bg-amber-950/40 border-amber-500'
              : 'bg-amber-950/20 border-amber-500/20 hover:border-amber-500/40'
          }`}
        >
          <div className="text-xs text-amber-400 font-bold">🟠 Warnings</div>
          <div className="text-xl font-bold text-white font-mono mt-1">{warningCount}</div>
        </div>

        <div
          onClick={() => setSelectedSeverity('attention')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'attention'
              ? 'bg-yellow-950/40 border-yellow-500'
              : 'bg-yellow-950/20 border-yellow-500/20 hover:border-yellow-500/40'
          }`}
        >
          <div className="text-xs text-yellow-400 font-bold">🟡 Attention Required</div>
          <div className="text-xl font-bold text-white font-mono mt-1">{attentionCount}</div>
        </div>

        <div
          onClick={() => setSelectedSeverity('info')}
          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
            selectedSeverity === 'info'
              ? 'bg-emerald-950/40 border-emerald-500'
              : 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40'
          }`}
        >
          <div className="text-xs text-emerald-400 font-bold">🟢 AI Info Logs</div>
          <div className="text-xl font-bold text-white font-mono mt-1">{infoCount}</div>
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/70 border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search alerts or buildings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
            <option value="attention">Attention</option>
            <option value="info">Information</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
          >
            <option value="all">All Statuses</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              alert.status === 'unread'
                ? 'bg-slate-900/90 border-white/15 shadow-lg'
                : 'bg-slate-950/60 border-white/5 opacity-80'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {getSeverityBadge(alert.severity)}

                  {alert.buildingName && (
                    <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {alert.buildingName}
                    </span>
                  )}

                  {alert.metricValue && (
                    <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                      {alert.metricValue}
                    </span>
                  )}

                  <span className="text-[11px] text-slate-500 font-mono ml-auto">
                    {alert.timestamp}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{alert.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{alert.message}</p>

                {alert.actionRequired && (
                  <div className="p-2.5 rounded-lg bg-slate-950/80 border border-white/5 text-xs text-amber-300 flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      <strong>Facility Directive:</strong> {alert.actionRequired}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0 self-start">
                {alert.status !== 'resolved' ? (
                  <>
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Resolve Alert
                    </button>
                    {alert.status === 'unread' && (
                      <button
                        onClick={() => markAlertRead(alert.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/10"
                      >
                        Mark Read
                      </button>
                    )}
                  </>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-mono flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Mitigated
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
