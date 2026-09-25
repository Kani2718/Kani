import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { AuthVisualSide } from './AuthVisualSide';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { setCurrentPage, setAuthBanner } = useCampus();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-[#080c15] text-slate-100">
      {/* Left 50%: Futuristic Visual Side */}
      <AuthVisualSide quote="Secure identity recovery protocol and encrypted cryptographic token dispatch for institutional access." />

      {/* Right 50%: Authentication Card */}
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
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
              Reset Your Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Enter your registered email address and we'll help you reset your password.
            </p>
          </div>

          {/* Auth Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Instructions Dispatched</h3>
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                    If an account exists for <strong className="text-cyan-400 font-mono">{email}</strong>, password reset instructions have been sent.
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Please check your institutional inbox or spam folder for your single-use reset link.
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthBanner({
                        type: 'info',
                        message: 'Check your email inbox for temporary password recovery credentials.',
                      });
                      setCurrentPage('login');
                    }}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
                  >
                    <span>Return to Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full py-2.5 text-xs text-slate-400 hover:text-white font-medium transition-colors"
                  >
                    Did not receive an email? Try another address
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Institutional Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="admin@smartcampus.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.99] transition-all mt-2"
                >
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-3 border-t border-white/5 text-center">
                  <button
                    type="button"
                    onClick={() => setCurrentPage('login')}
                    className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Security note */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/60" />
            <span>Identity verification links expire after 15 minutes</span>
          </div>

        </div>
      </div>
    </div>
  );
};
