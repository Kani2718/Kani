import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Cpu, Heart, Shield, Radio, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useCampus();

  return (
    <footer className="border-t border-white/10 bg-[#060911] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-sm text-white font-mono">
                SMART CAMPUS <span className="text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Intelligent Campus Resource Optimization & Sustainability Platform. Transforming universities into autonomous, carbon-neutral ecosystems.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Tagline: <span className="text-cyan-300">Smarter Resources. Greener Campus. Better Future.</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Campus Intelligence
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Admin Telemetry Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('classrooms')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Classroom Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('labs')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Laboratory Racks & Safety
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('occupancy')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Real-time LiDAR Occupancy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Resource Modules
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => setCurrentPage('energy')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Energy Sub-metering & Solar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('water')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Ultrasonic Water Leak Detection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('predictions')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  LSTM Neural Predictions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('recommendations')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Prescriptive Optimization
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
              Institutional ESG
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={() => setCurrentPage('sustainability')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  LEED Sustainability Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('analytics')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Compliance Audit Reports
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Request University Pilot
                </button>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Telemetric Edge: Operational
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Smart Campus AI Platform. Built for Production Hackathon Demonstrations.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3.5 h-3.5 text-cyan-400" /> AES-256 Encrypted Telemetry
            </span>
            <span>LEED Compliant Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
