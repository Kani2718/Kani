import React from 'react';
import { useCampus, NavigationPage } from '../../context/CampusContext';
import {
  LayoutDashboard,
  School,
  FlaskConical,
  Users,
  Zap,
  Droplets,
  BrainCircuit,
  Lightbulb,
  AlertTriangle,
  Leaf,
  BarChart3,
  Settings,
  User,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentPage, setCurrentPage, alerts, recommendations } = useCampus();

  const unreadAlerts = alerts.filter((a) => a.status === 'unread').length;
  const pendingRecs = recommendations.filter((r) => r.status === 'pending').length;

  interface NavItem {
    id: NavigationPage;
    label: string;
    icon: React.ReactNode;
    badge?: number | string;
    badgeColor?: string;
  }

  interface NavGroup {
    group: string;
    items: NavItem[];
  }

  const navGroups: NavGroup[] = [
    {
      group: 'OVERVIEW',
      items: [
        {
          id: 'dashboard',
          label: 'Admin Dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
      ],
    },
    {
      group: 'CAMPUS SPACES',
      items: [
        {
          id: 'classrooms',
          label: 'Classrooms',
          icon: <School className="w-4 h-4" />,
        },
        {
          id: 'labs',
          label: 'Laboratories',
          icon: <FlaskConical className="w-4 h-4" />,
        },
        {
          id: 'occupancy',
          label: 'Live Occupancy',
          icon: <Users className="w-4 h-4" />,
        },
      ],
    },
    {
      group: 'RESOURCE INTELLIGENCE',
      items: [
        {
          id: 'energy',
          label: 'Energy Monitoring',
          icon: <Zap className="w-4 h-4" />,
        },
        {
          id: 'water',
          label: 'Water Monitoring',
          icon: <Droplets className="w-4 h-4" />,
        },
      ],
    },
    {
      group: 'AI INTELLIGENCE',
      items: [
        {
          id: 'predictions',
          label: 'AI Predictions',
          icon: <BrainCircuit className="w-4 h-4" />,
        },
        {
          id: 'recommendations',
          label: 'AI Recommendations',
          icon: <Lightbulb className="w-4 h-4" />,
          badge: pendingRecs > 0 ? pendingRecs : undefined,
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        },
        {
          id: 'alerts',
          label: 'Anomaly Alerts',
          icon: <AlertTriangle className="w-4 h-4" />,
          badge: unreadAlerts > 0 ? unreadAlerts : undefined,
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        },
      ],
    },
    {
      group: 'SUSTAINABILITY & REPORTS',
      items: [
        {
          id: 'sustainability',
          label: 'Sustainability Hub',
          icon: <Leaf className="w-4 h-4" />,
        },
        {
          id: 'analytics',
          label: 'Analytics & Reports',
          icon: <BarChart3 className="w-4 h-4" />,
        },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        {
          id: 'settings',
          label: 'Settings',
          icon: <Settings className="w-4 h-4" />,
        },
        {
          id: 'profile',
          label: 'User Profile',
          icon: <User className="w-4 h-4" />,
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-white/10 bg-[#080c15] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation scrollable items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.group}>
              <div className="px-2.5 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                {group.group}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        if (onClose) onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 to-sky-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`transition-colors ${
                            isActive
                              ? 'text-cyan-400'
                              : 'text-slate-400 group-hover:text-slate-300'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge !== undefined && (
                          <span
                            className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold border ${
                              item.badgeColor || 'bg-cyan-500/20 text-cyan-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Campus Health Widget */}
        <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Campus AI Core
            </span>
            <span className="text-[10px] font-mono text-slate-400">99.8% SLA</span>
          </div>
          <div className="text-xs font-semibold text-slate-200">
            Autonomous Optimization Active
          </div>
          <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full w-[86%]" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Eco Score: 86/100</span>
            <span>-18.6% CO₂</span>
          </div>
        </div>
      </aside>
    </>
  );
};
