import React from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  School,
  Users,
  Zap,
  Droplets,
  Brain,
  AlertTriangle,
  BarChart3,
  Leaf,
  CheckCircle2,
  Shield,
  Layers,
  ChevronRight,
  Radio,
  Play,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage } = useCampus();

  const features = [
    {
      icon: <School className="w-5 h-5 text-cyan-400" />,
      title: 'Smart Space Allocation',
      desc: 'Dynamically allocate 40+ lecture halls based on capacity, timetable rosters, and microgrid cooling availability.',
    },
    {
      icon: <Users className="w-5 h-5 text-purple-400" />,
      title: 'Occupancy Monitoring',
      desc: 'Real-time LiDAR and access-point telemetry tracking crowd density across multi-story academic buildings.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'Energy Intelligence',
      desc: 'Sub-metered kilowatt tracking, automated HVAC setpoint drift, and peak demand charge avoidance.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-sky-400" />,
      title: 'Water Intelligence',
      desc: 'Ultrasonic acoustic flow monitoring identifying anomalous pipe leaks and optimizing non-potable greywater.',
    },
    {
      icon: <Brain className="w-5 h-5 text-emerald-400" />,
      title: 'AI Prediction',
      desc: 'Autoregressive LSTM neural forecasting anticipating tomorrow’s room demand and electrical grid spikes.',
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      title: 'Anomaly Detection',
      desc: 'Continuous real-time anomaly detection comparing current sensor telemetry against 30-day baseline ranges.',
    },
    {
      icon: <Radio className="w-5 h-5 text-indigo-400" />,
      title: 'Smart Alerts',
      desc: 'Multi-tiered critical, warning, and informational notifications with immediate work-order dispatch triggers.',
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
      title: 'Analytics & ESG',
      desc: 'Verified carbon reduction tracking, LEED compliance auditing, and exportable CSV/PDF institutional reports.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Collect',
      subtitle: 'IoT Telemetry Ingestion',
      desc: 'Gather continuous multi-modal streaming data from power submeters, ultrasonic flow meters, and WiFi sensors.',
      color: 'border-cyan-500/30 text-cyan-400',
    },
    {
      number: '02',
      title: 'Analyze',
      subtitle: 'Edge Telemetry Processing',
      desc: 'Normalize real-time sensor streams and compare them against historical campus operating baselines.',
      color: 'border-sky-500/30 text-sky-400',
    },
    {
      number: '03',
      title: 'Predict',
      subtitle: 'Neural Demand Forecasting',
      desc: 'AI neural networks forecast upcoming lecture space congestion, thermal demands, and solar microgrid output.',
      color: 'border-purple-500/30 text-purple-400',
    },
    {
      number: '04',
      title: 'Optimize',
      subtitle: 'Algorithmic Scheduling',
      desc: 'Platform computes the most energy-efficient room allocation, grouping classes to reduce HVAC footprints.',
      color: 'border-emerald-500/30 text-emerald-400',
    },
    {
      number: '05',
      title: 'Act',
      subtitle: 'Autonomous Execution',
      desc: 'Facility managers and campus administrators receive proactive prescriptive recommendations with one-click actuation.',
      color: 'border-amber-500/30 text-amber-400',
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-20 text-center px-4 max-w-5xl mx-auto">
        {/* Futuristic glowing backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-sky-500/15 to-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-950/50 mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Next-Generation Autonomous Campus Infrastructure</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
          SMART CAMPUS <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">AI</span>
        </h1>

        <p className="mt-4 text-base sm:text-xl font-bold text-slate-300 max-w-3xl mx-auto">
          Intelligent Campus Resource Optimization & Sustainability Platform
        </p>

        <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transform your campus into an intelligent, efficient, and sustainable ecosystem with AI-powered space allocation, microgrid balancing, and leak anomaly detection.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setCurrentPage('how-it-works')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            <span>See How It Works</span>
          </button>
        </div>

        {/* Interactive Futuristic Simulation Preview Graphic */}
        <div className="mt-14 relative rounded-3xl border border-white/10 bg-slate-950/80 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-400 ml-2">campus-ai-core.telemetry.mesh</span>
            </div>
            <span className="text-cyan-400 font-mono text-[11px] font-bold">5 Buildings Active</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Energy Load</span>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">524 kW</div>
              <span className="text-[10px] text-emerald-400">Solar Offset: 32.8%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Water Flow</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-1">148 L/min</div>
              <span className="text-[10px] text-rose-400">Block C Leak Spike</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Headcount</span>
              <div className="text-xl font-bold font-mono text-purple-400 mt-1">2,846</div>
              <span className="text-[10px] text-slate-300">Peak Shift (78% Cap)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/5">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">ESG Score</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">86 / 100</div>
              <span className="text-[10px] text-emerald-300">LEED Gold Tier</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section (Requirement 5) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
            The Institutional Challenge
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Traditional Campuses Struggle with Resource Waste
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Disconnected legacy BMS systems lead to soaring utility tariffs, overcrowded labs, and unaddressed infrastructure leaks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Problem Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-950/20 border border-rose-500/20 space-y-4">
            <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Traditional Campus Pain Points
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              {[
                'Underutilized classrooms cooling empty lecture halls all day.',
                'Laboratory scheduling conflicts causing expensive research idle time.',
                'Excessive peak electricity consumption incurring utility tariff penalties.',
                'Undetected plumbing water leaks losing thousands of gallons weekly.',
                'Zero real-time visibility into actual crowd distributions.',
                'Fragmented, siloed facility data causing reactive maintenance.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Solution Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-cyan-950/30 to-slate-900 border border-cyan-500/30 space-y-4 shadow-xl shadow-cyan-950/30">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              The Smart Campus AI Unified Solution
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              {[
                'Neural room matching engine pairing class cohorts to optimal room sizes.',
                'Automated HVAC eco-drift setpoints saving ~210 kWh daily per building.',
                'Acoustic pipe leak detection resolving anomalies within minutes.',
                'Proactive pre-cooling scheduled during 100% rooftop solar generation.',
                'Unified live telemetry across all 5 campus facility blocks in one place.',
                'Automated work-order generation reducing operational costs by 28%.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Section (Requirement 6) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            Engineered for Modern Universities & Institutes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Eight interconnected modules working concurrently to elevate institutional efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feat) => (
            <div
              key={feat.title}
              className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 w-fit mb-3 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center text-[11px] font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Explore capability →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Step Process (Requirement 7) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            The Five-Stage Autonomous Intelligence Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            From raw micro-telemetry ingestion to automated actuator directives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`p-5 rounded-2xl bg-slate-900/70 border ${step.color} shadow-lg flex flex-col justify-between`}
            >
              <div>
                <div className="text-2xl font-black font-mono opacity-50 mb-2">{step.number}</div>
                <h3 className="text-base font-bold text-white">{step.title}</h3>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">{step.subtitle}</div>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tagline & Final CTA (Requirement 1) */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-emerald-950 border border-cyan-500/40 p-8 sm:p-12 text-center shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15)_0%,transparent_60%)]" />

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
            Institutional Transformation
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
            Smarter Resources. Greener Campus. Better Future.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
            Ready to deploy production-quality AI optimization across your college or university? Experience our live simulation sandbox immediately.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-xl transition-all"
            >
              Launch Live Demonstration
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3 rounded-2xl text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-white/10"
            >
              Request Campus Deployment Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
