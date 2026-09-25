import React, { useState, useEffect } from 'react';
import { useCampus } from '../../context/CampusContext';
import { UserRole } from '../../types';
import { AuthVisualSide } from './AuthVisualSide';
import confetti from 'canvas-confetti';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Check, 
  Cpu,
  MapPin,
  Clock
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { 
    registerAccount, 
    setCurrentPage, 
    setPrefilledEmail, 
    setAuthBanner 
  } = useCampus();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [campusName, setCampusName] = useState('');
  const [role, setRole] = useState<UserRole>('Campus Admin');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasShake, setHasShake] = useState(false);

  // Success State
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(4);

  // Password criteria computation
  const hasMinLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const criteriaCount = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
  
  let passwordStrength: 'Weak' | 'Medium' | 'Strong' = 'Weak';
  let strengthColor = 'bg-rose-500';
  let strengthWidth = 'w-1/4';
  let strengthTextColor = 'text-rose-400';

  if (criteriaCount >= 5) {
    passwordStrength = 'Strong';
    strengthColor = 'bg-emerald-400';
    strengthWidth = 'w-full';
    strengthTextColor = 'text-emerald-400';
  } else if (criteriaCount >= 3) {
    passwordStrength = 'Medium';
    strengthColor = 'bg-amber-400';
    strengthWidth = 'w-3/5';
    strengthTextColor = 'text-amber-400';
  }

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const showPasswordMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  // Countdown timer for automatic redirect after registration
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSuccess && countdown === 0) {
      proceedToLogin();
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown]);

  const proceedToLogin = () => {
    setPrefilledEmail(email);
    setAuthBanner({
      type: 'success',
      title: 'Account created successfully!',
      message: 'Your Smart Campus AI account is ready. Please sign in to continue.',
    });
    setCurrentPage('login');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation 1: Full name
    if (fullName.trim().length < 2) {
      setErrorMessage('Full name must be at least 2 characters long.');
      triggerShake();
      return;
    }

    // Validation 2: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid institutional email address.');
      triggerShake();
      return;
    }

    // Validation 3: Phone number format
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please provide a valid contact phone number with at least 10 digits.');
      triggerShake();
      return;
    }

    // Validation 4: Institution
    if (!institution.trim()) {
      setErrorMessage('Institution name is required.');
      triggerShake();
      return;
    }

    // Validation 5: Password requirements
    if (!hasMinLength || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      setErrorMessage(
        'Password must be at least 8 characters and include uppercase, lowercase, numbers, and special characters.'
      );
      triggerShake();
      return;
    }

    // Validation 6: Password Match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify your password confirmation.');
      triggerShake();
      return;
    }

    // Validation 7: Terms agreement
    if (!agreeTerms) {
      setErrorMessage('You must agree to the Terms of Service & Privacy Policy to create an account.');
      triggerShake();
      return;
    }

    // Attempt Account Registration in Local Context Store
    const res = await registerAccount({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      institution: institution.trim(),
      campusName: campusName.trim() || 'Main Campus',
      role,
      password,
    });

    if (!res.success) {
      setErrorMessage(res.error || 'Registration failed. Please check your information.');
      triggerShake();
      return;
    }

    // Trigger Success State
    setIsSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#10b981', '#38bdf8', '#34d399']
    });
  };

  const triggerShake = () => {
    setHasShake(true);
    setTimeout(() => setHasShake(false), 450);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-[#080c15] text-slate-100">
      {/* Left 50%: Futuristic Smart Campus AI Visual Showcase */}
      <AuthVisualSide quote="Deploy edge AI monitoring across your lecture halls, laboratories, and microgrid infrastructure with granular role delegation." />

      {/* Right 50%: Registration Experience */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-10 xl:p-12 relative overflow-y-auto">
        <div className="w-full max-w-lg space-y-6 my-auto">
          
          {/* Mobile-only Brand Header */}
          <div className="lg:hidden text-center space-y-2 mb-2">
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

          {/* SUCCESS SCREEN STATE: Appears after successful registration */}
          {isSuccess ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl shadow-emerald-950/30 text-center space-y-6 animate-in zoom-in-95 duration-300">
              {/* Animated Glowing Success Checkmark */}
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-60" />
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-check-pop">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Registration Verified</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Account Created Successfully
                </h2>
                <p className="text-sm font-semibold text-cyan-300">
                  Welcome to Smart Campus AI.
                </p>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Your account has been created successfully. Please sign in to access your intelligent campus dashboard.
                </p>
              </div>

              {/* Account Summary Chip */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Registered User:</span>
                  <span className="text-white font-sans font-semibold">{fullName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Authorized Email:</span>
                  <span className="text-cyan-300">{email}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Institution / Role:</span>
                  <span className="text-emerald-300 font-sans">{institution} ({role})</span>
                </div>
              </div>

              {/* Auto Redirect Countdown */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-sans">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>
                    Automatically opening Login page in <strong className="text-white font-mono">{countdown}</strong> seconds...
                  </span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-white/5">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-1000 ease-linear"
                    style={{ width: `${((4 - countdown) / 4) * 100}%` }}
                  />
                </div>
              </div>

              {/* Manual Continue Button */}
              <button
                type="button"
                onClick={proceedToLogin}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all"
              >
                <span>Continue to Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* STANDARD REGISTRATION FORM */
            <>
              {/* Heading */}
              <div className="space-y-1.5 text-left">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                  Create Your Account
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Join Smart Campus AI and transform the way your campus uses resources.
                </p>
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <div className={`p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs sm:text-[13px] flex items-center gap-2.5 shadow-lg shadow-rose-950/30 ${hasShake ? 'animate-shake' : ''}`}>
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-2xl space-y-4">
                <form onSubmit={handleRegister} className="space-y-4 text-left">
                  
                  {/* Personal Information Group */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block font-mono">
                      1. Personal Information
                    </span>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="Dr. Jordan Mercer"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Email Address <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            placeholder="jordan@mit.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Phone Number <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+1 (555) 234-5678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Institution Information Group */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block font-mono">
                      2. Institution Information
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Institution Name <span className="text-rose-400">*</span>
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            placeholder="Apex Institute of Technology"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Campus Name
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="North Science Campus"
                            value={campusName}
                            onChange={(e) => setCampusName(e.target.value)}
                            className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Role Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Administrative Role <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value as UserRole)}
                          className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="Super Admin">Super Admin — Complete Campus Controls</option>
                          <option value="Campus Admin">Campus Admin — Academic & Space Allocation</option>
                          <option value="Facility Manager">Facility Manager — Energy & HVAC Operations</option>
                          <option value="Faculty">Faculty — Departmental Schedules & Classrooms</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Security Group */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block font-mono">
                      3. Security Credentials
                    </span>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Password <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Min 8 chars with upper, lower, number & symbol"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-slate-950/90 border border-white/10 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Real-time Password Strength Meter */}
                      {password.length > 0 && (
                        <div className="mt-2 space-y-1.5 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 font-sans">Strength:</span>
                            <span className={`font-bold ${strengthTextColor}`}>{passwordStrength}</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-white/10">
                            <div className={`h-full ${strengthColor} ${strengthWidth} transition-all duration-300`} />
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1">
                            <span className={hasMinLength ? 'text-emerald-400 flex items-center gap-1' : ''}>
                              {hasMinLength ? '✓' : '•'} 8+ characters
                            </span>
                            <span className={hasUpper && hasLower ? 'text-emerald-400 flex items-center gap-1' : ''}>
                              {hasUpper && hasLower ? '✓' : '•'} Upper & lowercase
                            </span>
                            <span className={hasNumber ? 'text-emerald-400 flex items-center gap-1' : ''}>
                              {hasNumber ? '✓' : '•'} At least 1 number
                            </span>
                            <span className={hasSpecial ? 'text-emerald-400 flex items-center gap-1' : ''}>
                              {hasSpecial ? '✓' : '•'} At least 1 symbol
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Confirm Password <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="Re-enter password to confirm"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full bg-slate-950/90 border rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:outline-none font-mono transition-all ${
                            showPasswordMismatch 
                              ? 'border-rose-500/80 focus:border-rose-500' 
                              : passwordsMatch 
                              ? 'border-emerald-500/80 focus:border-emerald-500' 
                              : 'border-white/10 focus:border-cyan-500'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Password Match Status */}
                      {showPasswordMismatch && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 animate-in fade-in">
                          <AlertCircle className="w-3 h-3" />
                          <span>Passwords do not match.</span>
                        </p>
                      )}
                      {passwordsMatch && (
                        <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 animate-in fade-in">
                          <Check className="w-3 h-3" />
                          <span>Passwords match.</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Terms & Privacy Agreement */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 select-none">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-slate-950 text-cyan-500 focus:ring-cyan-500/30"
                      />
                      <span>
                        I agree to the <span className="text-cyan-400 hover:underline">Terms of Service</span> and{' '}
                        <span className="text-cyan-400 hover:underline">Privacy Policy</span> of Smart Campus AI.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.99] transition-all mt-4"
                  >
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Bottom Switch to Sign In */}
                <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-slate-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setCurrentPage('login')}
                    className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 transition-colors"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
