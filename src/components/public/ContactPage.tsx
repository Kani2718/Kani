import React, { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useCampus();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Inquiry Submitted',
      message: 'Our campus deployment engineering team will reach out within 24 hours.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 animate-in fade-in">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          Connect with Us
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Bring Smart Campus AI to Your Institution
        </h1>
        <p className="text-xs sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          Request a full telemetry pilot, schedule an IoT hardware compatibility audit, or partner with our research team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Email Inquiry</h4>
              <p className="text-xs text-slate-300 mt-1">deploy@smartcampus.ai</p>
              <p className="text-[11px] text-slate-500">Response within 2 hours</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Hotline</h4>
              <p className="text-xs text-slate-300 mt-1">+1 (800) 412-SMART</p>
              <p className="text-[11px] text-slate-500">Mon-Fri 08:00 - 18:00 EST</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">HQ Research Lab</h4>
              <p className="text-xs text-slate-300 mt-1">Innovation Quadrant 4</p>
              <p className="text-[11px] text-slate-500">Apex Institute of Technology</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-md">
          {isSubmitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Thank you for reaching out!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your campus deployment request has been logged. We will contact your university facilities office shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dean Robert Shaw"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="dean@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College / University / Campus Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stanford University School of Engineering"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  How can we help optimize your campus?
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your current facility challenges, number of academic buildings, or request a customized sensor pilot..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <Send className="w-4 h-4" />
                Submit Pilot Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
