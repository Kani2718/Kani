import React from 'react';
import { useCampus } from '../../context/CampusContext';
import {
  School,
  Users,
  Zap,
  Droplets,
  BrainCircuit,
  AlertTriangle,
  BarChart3,
  Leaf,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const { setCurrentPage } = useCampus();

  const featureDeepDives = [
    {
      icon: <School className="w-6 h-6 text-cyan-400" />,
      title: 'Smart Space Allocation & Timetable Optimization',
      tagline: 'Match Class Size to Thermal Footprint',
      description:
        'Our proprietary neural room-fitting algorithm evaluates scheduled student rosters, equipment needs (projectors, smartboards, audio), and current HVAC loads. By concentrating low-occupancy classes into fewer zones, energy wastage is drastically curtailed.',
      bulletPoints: [
        'Capacity and fill-ratio optimization (avoids 120-seat halls for 20 students)',
        'Automated collision prevention across standard classrooms and specialty labs',
        'Direct synchronization with university SIS and ERP timetable systems',
      ],
      link: 'classrooms',
    },
    {
      icon: <Users className="w-6 h-6 text-purple-400" />,
      title: 'Real-time Occupancy & Mesh Telemetry',
      tagline: 'LiDAR and WiFi Triangulation without Privacy Intrusions',
      description:
        'Track student flow through atriums, libraries, dining halls, and multi-story academic buildings with zero facial recognition or privacy violation. Sensors aggregate headcount counts anonymously in real-time.',
      bulletPoints: [
        'Live vs Historical headcount heatmaps per building and floor',
        'Instant alerts when room capacities exceed safe emergency thresholds',
        'Continuous ambient feedback for air quality (ppm CO₂) and thermal comfort',
      ],
      link: 'occupancy',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Energy Intelligence & Rooftop Microgrid',
      tagline: 'Peak Shaving and Demand Charge Elimination',
      description:
        'Continuous kilowatt sub-metering isolates chiller draws, lighting banks, and high-performance server clusters. Smart algorithms divert excess midday rooftop solar power to battery storage and pre-chill building thermal mass.',
      bulletPoints: [
        'Instantaneous kW draw and cumulative kWh MTD tracking',
        'Autonomous HVAC drift when rooms are detected vacant for >30 minutes',
        '24-hour predictive baseline comparison alerting to compressor malfunctions',
      ],
      link: 'energy',
    },
    {
      icon: <Droplets className="w-6 h-6 text-sky-400" />,
      title: 'Water Intelligence & Ultrasonic Leak Detection',
      tagline: 'Prevent Thousand-Gallon Infrastructure Catastrophes',
      description:
        'Acoustic high-frequency hydro-sensors identify the acoustic signature of leaking toilet flapper valves, supply line fissures, and burst pipes across campus riser networks within minutes.',
      bulletPoints: [
        'Flow rate monitoring in L/min with historical 30-day baseline comparison',
        'Building-by-building water consumption variance scoring',
        'Automated valve closure recommendations and emergency plumber dispatch',
      ],
      link: 'water',
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-emerald-400" />,
      title: 'Predictive Demand & Neural Forecasting',
      tagline: 'Anticipate Congestion Before Classes Even Start',
      description:
        'Bidirectional LSTM neural networks trained on historical academic schedules, weather forecasts, and term exams generate demand curves with 95% confidence intervals.',
      bulletPoints: [
        'Classroom and lab peak congestion time window forecasting',
        'Next-day electrical demand projection allowing utility peak pre-negotiation',
        'Automated proactive cooling scheduled 45 minutes before morning surges',
      ],
      link: 'predictions',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-rose-400" />,
      title: 'Anomaly Detection & Unified Incident Dispatch',
      tagline: 'Four-Tier Severity Classification System',
      description:
        'Never miss an equipment malfunction again. Anomaly detection agents compare real-time metrics against Gaussian distributions and immediately triage critical incidents to facility managers.',
      bulletPoints: [
        'Critical, Warning, Attention, and Informational severity categorizations',
        'Specific facility directives and diagnostic equipment telemetry',
        'One-click alert resolution and audit logging',
      ],
      link: 'alerts',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-16 animate-in fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          Product Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Comprehensive Campus Management Capabilities
        </h1>
        <p className="text-xs sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Deep dive into the 8 specialized engines powering Smart Campus AI's autonomous optimization loop.
        </p>
      </div>

      {/* Feature Deep Dive Cards */}
      <div className="space-y-8">
        {featureDeepDives.map((feat, i) => (
          <div
            key={feat.title}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 shrink-0">
              {feat.icon}
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                  {feat.tagline}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{feat.title}</h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {feat.description}
              </p>

              <div className="space-y-1.5 pt-1">
                {feat.bulletPoints.map((pt, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentPage(feat.link as any)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>Launch {feat.title.split(' ')[0]} Module in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
