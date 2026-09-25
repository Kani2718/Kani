import React, { useState, useEffect } from 'react';
import { useCampus } from '../../context/CampusContext';
import { UserRole } from '../../types';
import { AuthVisualSide } from '../auth/AuthVisualSide';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Shield, 
  Info,
  Cpu
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { 
    loginWithCredentials, 
    setCurrentPage, 
    authBanner, 
    setAuthBanner,
    prefilledEmail 
  } = useCampus();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasShake, setHasShake] = useState(false);

  // Pre-fill email if passed from Registration redirect or defaults
  useEffect(() => {
    if (prefilledEmail) {
      setEmail(prefilledEmail);
      setPassword(''); // User enters password after registration
    } else if (!email) {
      setEmail('demo@smartcampus.ai');
      setPassword('DemoCampus@2026');
    }
  }, [prefilledEmail]);

  const handleSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both your email address and password.');
      triggerShake();
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginWithCredentials(email.trim(), password, rememberMe);
      if (!result.success) {
        setErrorMessage(result.error || 'Invalid email or password. Please try again.');
        triggerShake();
      }
    } catch {
      setErrorMessage('Invalid email or password. Please try again.');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const triggerShake = () => {
    setHasShake(true);
    setTimeout(() => setHasShake(false), 450);
  };

  // Demo auto-fill handlers (Fills form, does not bypass authentication flow)
  const applyDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
    setAuthBanner(null);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-[#080c15] text-slate-100">
      {/* Left 50%: Futuristic Smart Campus AI Visual Showcase */}
      <AuthVisualSide quote="Autonomous energy orchestration, hydraulic submeter analytics, and occupant intelligence for modern educational institutions." />

      {/* Right 50%: Premium Authentication Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 xl:p-16 relative">
        <div className="w-full max-w-md space-y-6">
          
          {/* Mobile-only Brand Header */}
          <div className="lg:hidden text-center space-y-2 mb-4">
            <div
              onClick={() => setCurrentPage('landing')}
              className="inline-flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                SMART CAMPUS <span className="text-cyan-400">AI</span>
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1.5 text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans flex items-center gap-2">
              <span>Welcome Back</span>
              <span className="text-xl sm:text-2xl animate-bounce">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Sign in to continue managing your intelligent campus.
            </p>
          </div>

          {/* Banner Messages (from Registration, Logout, or System) */}
          {authBanner && (
            <div 
              className={`p-3.5 rounded-2xl text-xs sm:text-[13px] flex items-start gap-3 border shadow-lg animate-in fade-in slide-in-from-top-2 duration-300 ${
                authBanner.type === 'success'
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300 shadow-emerald-950/20'
                  : authBanner.type === 'error'
                  ? 'bg-rose-950/50 border-rose-500/40 text-rose-300 shadow-rose-950/20'
                  : 'bg-cyan-950/50 border-cyan-500/40 text-cyan-300 shadow-cyan-950/20'
              }`}
            >
              {authBanner.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : authBanner.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 leading-relaxed">
                {authBanner.title && <strong className="block font-semibold">{authBanner.title}</strong>}
                {authBanner.message}
              </div>
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className={`p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-[13px] flex items-center gap-2.5 shadow-lg shadow-rose-950/30 ${hasShake ? 'animate-shake' : ''}`}>
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Demo Access Section (Hackathon & Judges) */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/25 shadow-xl shadow-cyan-950/15 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Demo Access for Evaluators</span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                Hackathon Ready
              </span>
            </div>

            <div className="text-[11px] text-slate-400 leading-tight">
              Pre-configured simulated campus network. Click to populate credentials:
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => applyDemoAccount('demo@smartcampus.ai', 'DemoCampus@2026')}
                className="p-2 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-cyan-500/30 text-left transition-all group"
              >
                <div className="font-bold text-cyan-300 text-xs flex items-center justify-between">
                  <span>Demo Admin</span>
                  <span className="text-[9px] text-cyan-400 font-mono">Instant</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">demo@smartcampus.ai</div>
              </button>

              <button
                type="button"
                onClick={() => applyDemoAccount('admin@smartcampus.edu', 'CampusAdmin@2026')}
                className="p-2 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-white/5 text-left transition-all"
              >
                <div className="font-bold text-white text-xs">Super Admin</div>
                <div className="text-[10px] text-slate-400 truncate">admin@smartcampus.edu</div>
              </button>

              <button
                type="button"
                onClick={() => applyDemoAccount('facilities@smartcampus.edu', 'Facilities@2026')}
                className="p-2 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-white/5 text-left transition-all"
              >
                <div className="font-bold text-amber-300 text-xs">Facility Manager</div>
                <div className="text-[10px] text-slate-400 truncate">facilities@smartcampus.edu</div>
              </button>

              <button
                type="button"
                onClick={() => applyDemoAccount('faculty@smartcampus.edu', 'Faculty@2026')}
                className="p-2 rounded-xl bg-slate-950/90 hover:bg-slate-800 border border-white/5 text-left transition-all"
              >
                <div className="font-bold text-emerald-300 text-xs">Faculty Member</div>
                <div className="text-[10px] text-slate-400 truncate">faculty@smartcampus.edu</div>
              </button>
            </div>
          </div>

          {/* Authentication Card Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-sans transition-all"
                  />
                </div>
              </div>

              {/* Password Field with Eye Toggle */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Options: Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-300 transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500/30"
                  />
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setAuthBanner(null);
                    setCurrentPage('forgot-password');
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:via-sky-300 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Register Switch */}
            <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthBanner(null);
                  setCurrentPage('register');
                }}
                className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Security Assurance Footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 font-sans">
            <Shield className="w-3.5 h-3.5 text-cyan-500/60" />
            <span>Encrypted with SHA-256 Auth & JWT Session Tokens</span>
          </div>

        </div>
      </div>
    </div>
  );
};
