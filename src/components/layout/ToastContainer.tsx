import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCampus();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const iconConfig = {
          success: {
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
            border: 'border-emerald-500/30',
            bg: 'bg-slate-900/95',
            glow: 'shadow-emerald-500/10',
          },
          warning: {
            icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
            border: 'border-amber-500/30',
            bg: 'bg-slate-900/95',
            glow: 'shadow-amber-500/10',
          },
          error: {
            icon: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
            border: 'border-rose-500/30',
            bg: 'bg-slate-900/95',
            glow: 'shadow-rose-500/10',
          },
          info: {
            icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
            border: 'border-cyan-500/30',
            bg: 'bg-slate-900/95',
            glow: 'shadow-cyan-500/10',
          },
        };

        const config = iconConfig[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border ${config.border} ${config.bg} backdrop-blur-md shadow-2xl ${config.glow} transition-all duration-300 animate-in slide-in-from-top-2`}
          >
            {config.icon}
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-white tracking-wide">{toast.title}</h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
