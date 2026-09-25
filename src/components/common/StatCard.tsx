import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  isPositive?: boolean;
  neutral?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg?: string;
  accentColor?: 'cyan' | 'emerald' | 'amber' | 'indigo' | 'rose' | 'purple';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  isPositive = true,
  neutral = false,
  subtitle,
  icon,
  iconBg = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  accentColor = 'cyan',
  onClick,
}) => {
  const borderAccents = {
    cyan: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10',
    emerald: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
    amber: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    indigo: 'hover:border-indigo-500/40 hover:shadow-indigo-500/10',
    rose: 'hover:border-rose-500/40 hover:shadow-rose-500/10',
    purple: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-5 border border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        borderAccents[accentColor]
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Background soft ambient gradient */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/[0.02] rounded-full blur-xl pointer-events-none" />

      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl border ${iconBg} shadow-inner`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono">
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-slate-400">{unit}</span>}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {change && (
          <div
            className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
              neutral
                ? 'bg-slate-800 text-slate-300 border border-slate-700'
                : isPositive
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}
          >
            {neutral ? (
              <Minus className="w-3 h-3" />
            ) : isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{change}</span>
          </div>
        )}

        {subtitle && (
          <span className="text-slate-400 ml-auto truncate font-medium">{subtitle}</span>
        )}
      </div>
    </div>
  );
};
