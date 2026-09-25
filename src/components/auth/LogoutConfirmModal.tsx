import React from 'react';
import { LogOut, X, AlertTriangle } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const LogoutConfirmModal: React.FC = () => {
  const { isLogoutModalOpen, setIsLogoutModalOpen, confirmLogout } = useCampus();

  if (!isLogoutModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-md p-6 sm:p-7 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl shadow-rose-950/30 text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsLogoutModalOpen(false)}
          className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/10">
          <LogOut className="w-6 h-6 text-rose-400" />
        </div>

        {/* Header */}
        <h3 className="text-xl font-bold text-white font-sans">Sign out?</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Are you sure you want to sign out of <strong className="text-white font-semibold">Smart Campus AI</strong>? Your active session credentials and monitoring preferences will be cleared.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={() => setIsLogoutModalOpen(false)}
            className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={confirmLogout}
            className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-500/25 transition-all flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
