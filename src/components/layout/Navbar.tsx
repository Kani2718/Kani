import React, { useState } from 'react';
import { useCampus, NavigationPage } from '../../context/CampusContext';
import {
  Cpu,
  Bell,
  Search,
  ChevronDown,
  User as UserIcon,
  LogOut,
  Settings,
  Sparkles,
  Shield,
  Layers,
  Menu,
  X,
  Radio,
  ExternalLink,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const {
    currentPage,
    setCurrentPage,
    navigateTo,
    user,
    openLogoutModal,
    setUserRole,
    searchQuery,
    setSearchQuery,
    alerts,
    markAlertRead,
    isLiveSimulationActive,
  } = useCampus();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPublicPage = [
    'landing',
    'about',
    'features',
    'how-it-works',
    'public-sustainability',
    'contact',
    'login',
    'register',
    'forgot-password',
  ].includes(currentPage);

  const unreadAlerts = alerts.filter((a) => a.status === 'unread');
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && a.status === 'unread').length;

  const publicNavLinks: { name: string; page: NavigationPage }[] = [
    { name: 'Home', page: 'landing' },
    { name: 'Features', page: 'features' },
    { name: 'How It Works', page: 'how-it-works' },
    { name: 'Sustainability', page: 'public-sustainability' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#090d16]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          {!isPublicPage && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div
            onClick={() => setCurrentPage(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white font-mono">
                  SMART CAMPUS <span className="text-cyan-400">AI</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                  v2.4 Pro
                </span>
              </div>
              <span className="hidden sm:block text-[10px] text-slate-400 tracking-wide font-medium">
                Resource Optimization & Sustainability
              </span>
            </div>
          </div>
        </div>

        {/* Public Navigation Links */}
        {isPublicPage ? (
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {publicNavLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  currentPage === item.page
                    ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        ) : (
          /* Dashboard Global Search */
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search rooms, labs, metrics, or alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
              />
              <kbd className="hidden sm:inline-block absolute right-2.5 top-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
                ⌘K
              </kbd>
            </div>
          </div>
        )}

        {/* Right Action Icons / User controls */}
        <div className="flex items-center gap-3">
          {/* Live Sensor Heartbeat Badge */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-white/10 text-xs">
            <Radio
              className={`w-3.5 h-3.5 ${
                isLiveSimulationActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'
              }`}
            />
            <span className="text-[11px] font-mono text-slate-300">
              {isLiveSimulationActive ? 'TELEMETRY: LIVE' : 'STREAM: PAUSED'}
            </span>
          </div>

          {isPublicPage ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('login')}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => navigateTo('register')}
                className="hidden sm:inline-block px-3.5 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/20 rounded-xl transition-all"
              >
                Register
              </button>
              <button
                onClick={() => navigateTo('dashboard')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch App</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              {/* Notification Center Popover */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/5 transition-all"
                >
                  <Bell className="w-4 h-4" />
                  {unreadAlerts.length > 0 && (
                    <span
                      className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold text-white ${
                        criticalCount > 0 ? 'bg-rose-500 animate-pulse' : 'bg-cyan-500'
                      }`}
                    >
                      {unreadAlerts.length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          Campus Alerts
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                          {unreadAlerts.length} unread
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          setCurrentPage('alerts');
                        }}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold"
                      >
                        View All Alerts →
                      </button>
                    </div>

                    <div className="mt-3 max-h-72 overflow-y-auto space-y-2 pr-1">
                      {alerts.slice(0, 4).map((a) => (
                        <div
                          key={a.id}
                          onClick={() => {
                            markAlertRead(a.id);
                            setCurrentPage('alerts');
                            setShowNotifications(false);
                          }}
                          className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-white/5 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span
                              className={`font-semibold uppercase tracking-wider ${
                                a.severity === 'critical'
                                  ? 'text-rose-400'
                                  : a.severity === 'warning'
                                  ? 'text-amber-400'
                                  : 'text-cyan-400'
                              }`}
                            >
                              {a.severity}
                            </span>
                            <span className="text-[10px] text-slate-400">{a.timestamp}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-200 mt-1 line-clamp-1 group-hover:text-cyan-300">
                            {a.title}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                            {a.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Public Portal Switcher */}
              <button
                onClick={() => setCurrentPage('landing')}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5 transition-all"
                title="View Public Institutional Landing Portal"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Portal View</span>
              </button>

              {/* User Profile Dropdown & Role Selector */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 transition-all text-left"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120'}
                    alt="avatar"
                    className="w-7 h-7 rounded-lg object-cover border border-cyan-500/30"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-white leading-tight truncate max-w-[120px]">
                      {user?.name || 'Administrator'}
                    </div>
                    <div className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider">
                      {user?.role || 'Admin'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
                    <div className="pb-2 mb-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                      <p className="text-[10px] text-slate-400 mt-1 font-mono">{user?.institution}</p>
                    </div>

                    {/* Role Switcher for Hackathon Demonstration */}
                    <div className="mb-2 pb-2 border-b border-white/10">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
                        <Shield className="w-3 h-3 text-cyan-400" />
                        Simulate Role Access
                      </span>
                      <div className="grid grid-cols-2 gap-1 text-[11px]">
                        {(['Super Admin', 'Campus Admin', 'Facility Manager', 'Faculty'] as const).map(
                          (role) => (
                            <button
                              key={role}
                              onClick={() => {
                                setUserRole(role);
                                setShowUserMenu(false);
                              }}
                              className={`p-1.5 rounded-lg text-left font-medium transition-all ${
                                user?.role === role
                                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
                              }`}
                            >
                              {role}
                            </button>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => {
                          navigateTo('profile');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>My Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          navigateTo('settings');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={() => {
                          navigateTo('alerts');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                      >
                        <Bell className="w-3.5 h-3.5 text-amber-400" />
                        <span>Notifications</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          openLogoutModal();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu for Public Links */}
      {isPublicPage && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-4 py-3 space-y-2">
          {publicNavLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${
                currentPage === item.page ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
