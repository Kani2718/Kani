import React from 'react';

interface CircularScoreProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: 'emerald' | 'cyan' | 'amber' | 'indigo';
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  maxScore = 100,
  size = 140,
  strokeWidth = 10,
  label = 'Score',
  sublabel = 'Campus Rating',
  color = 'emerald',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorConfig = {
    emerald: {
      stroke: '#10b981',
      glow: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))',
      text: 'text-emerald-400',
    },
    cyan: {
      stroke: '#06b6d4',
      glow: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))',
      text: 'text-cyan-400',
    },
    amber: {
      stroke: '#f59e0b',
      glow: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))',
      text: 'text-amber-400',
    },
    indigo: {
      stroke: '#6366f1',
      glow: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))',
      text: 'text-indigo-400',
    },
  };

  const activeColor = colorConfig[color];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full -rotate-90 transform" viewBox={`0 0 ${size} ${size}`}>
          {/* Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800"
            fill="transparent"
          />
          {/* Animated Indicator Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={activeColor.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: activeColor.glow,
            }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
            {score}
            <span className="text-xs text-slate-400 font-sans font-normal">/{maxScore}</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mt-0.5">
            {label}
          </span>
        </div>
      </div>

      {sublabel && (
        <span className="mt-2 text-xs font-medium text-slate-400 tracking-wide text-center">
          {sublabel}
        </span>
      )}
    </div>
  );
};
