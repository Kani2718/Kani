import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Radio, Cpu, Brain, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentPage } = useCampus();

  const workflow = [
    {
      step: 'STEP 1',
      title: 'Collect',
      icon: <Radio className="w-6 h-6 text-cyan-400" />,
      subtitle: 'Universal Telemetry Ingestion',
      desc: 'Smart Campus AI interfaces with existing BACnet, Modbus, MQTT, and IoT sensor streams. High-resolution submetering records electricity, water flow, ambient temperature, humidity, and anonymous WiFi occupancy points.',
      highlight: 'Zero hardware rip-and-replace required. Integrates seamlessly with legacy BMS.',
    },
    {
      step: 'STEP 2',
      title: 'Analyze',
      icon: <Cpu className="w-6 h-6 text-sky-400" />,
      subtitle: 'Real-Time Edge Telemetry Processing',
      desc: 'Incoming streams are normalized, filtered for outliers, and aggregated into a high-performance time-series database. Sensor readings are continuously cross-referenced against historical university operational patterns.',
      highlight: 'Continuous baseline learning updates dynamically every 15 minutes.',
    },
    {
      step: 'STEP 3',
      title: 'Predict',
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      subtitle: 'Neural Forecasting & Demand Modeling',
      desc: 'Bidirectional LSTM neural networks synthesize timetable schedules, local weather forecasts, and historical term exam patterns to generate 24-hour and 7-day predictive curves for space occupancy, peak energy load, and water demands.',
      highlight: 'Achieves 94.6% confidence rating in peak congestion forecasting.',
    },
    {
      step: 'STEP 4',
      title: 'Optimize',
      subtitle: 'Algorithmic Space & Energy Balancing',
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      desc: 'A multi-variable heuristic optimizer calculates optimal classroom allocations, groups evening classes into single energy-efficient building zones, and schedules pre-cooling cycles to coincide with rooftop solar generation spikes.',
      highlight: 'Cuts campus HVAC run-hours by up to 28% without sacrificing student comfort.',
    },
    {
      step: 'STEP 5',
      title: 'Act',
      subtitle: 'Autonomous Execution & Facility Alerts',
      icon: <CheckCircle2 className="w-6 h-6 text-amber-400" />,
      desc: 'Prescriptive recommendations are immediately delivered to campus administrators, department schedulers, and facility engineers. Critical anomalies trigger instant work-orders with specific manifold diagnostics.',
      highlight: 'One-click actuation for immediate automated schedule and thermostat adjustments.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-16 animate-in fade-in">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
          System Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          The Five-Step Autonomous Optimization Loop
        </h1>
        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          How Smart Campus AI converts raw sensory streams into measurable kilowatt and water savings.
        </p>
      </div>

      <div className="space-y-6">
        {workflow.map((item, index) => (
          <div
            key={item.step}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row gap-6 items-start"
          >
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 shrink-0 flex flex-col items-center">
              {item.icon}
              <span className="font-mono text-xs font-bold text-slate-400 mt-2">{item.step}</span>
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <span className="text-xs font-mono text-cyan-400">{item.subtitle}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-xs text-emerald-300 font-semibold mt-2">
                ✓ {item.highlight}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-xl shadow-cyan-500/20"
        >
          Experience the Loop in Live Dashboard →
        </button>
      </div>
    </div>
  );
};
