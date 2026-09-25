import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Building2, Award, Users, Cpu, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useCampus();

  const leaders = [
    {
      name: 'Dr. Shrithan Raman',
      role: 'Chief AI Architect & Co-Founder',
      institution: 'Ph.D. in Cyber-Physical Intelligent Systems',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    },
    {
      name: 'Prof. Elena Rostova',
      role: 'Director of Environmental Microgrids',
      institution: 'LEED Fellow & Renewable Energy Specialist',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    },
    {
      name: 'Marcus Vance',
      role: 'Head of Facility Autonomous Robotics',
      institution: 'Ex-Lead Systems Architect, IoT Cloud Grid',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16 animate-in fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          About Smart Campus AI
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Pioneering Autonomous Resource Intelligence for Higher Education
        </h1>
        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Founded with a mission to convert educational campuses into self-balancing, carbon-neutral ecosystems using state-of-the-art predictive telemetry.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">Our Product Vision</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Campuses shouldn't rely on manual thermostat adjustments, uncoordinated paper room bookings, and catastrophic water leak surprises. We believe every college facility can think ahead: automatically scheduling classes where energy is cleanest and space is optimal.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">The Sustainability Pledge</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By shaving peak load tariffs, diverting rooftop solar into battery storage, and actively preventing water line waste, our deployments have achieved an average 18.6% carbon emissions reduction across partner institutions.
          </p>
        </div>
      </div>

      {/* Institutional Leadership */}
      <div className="space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
            Leadership & Research Team
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">
            Built by Academic Researchers for Campus Leaders
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {leaders.map((lead) => (
            <div
              key={lead.name}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 text-center space-y-3"
            >
              <img
                src={lead.image}
                alt={lead.name}
                className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-cyan-400/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                <div className="text-xs font-semibold text-cyan-400 mt-0.5">{lead.role}</div>
                <div className="text-[11px] text-slate-400 mt-1">{lead.institution}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-cyan-950/50 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Ready to examine the live platform?</h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Test the live telemetry dashboard and simulation triggers immediately.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-400/20 whitespace-nowrap self-start sm:self-auto"
        >
          <span>Launch Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
