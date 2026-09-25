import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Building,
  Classroom,
  Laboratory,
  CampusAlert,
  AIRecommendation,
  EnergyMetric,
  WaterMetric,
  SustainabilityMetric,
  User,
  UserRole,
  RegisteredAccount,
  AuthBanner,
  AllocationRequest,
  AllocationRecommendation
} from '../types';
import {
  BUILDINGS,
  CLASSROOMS,
  LABORATORIES,
  INITIAL_ALERTS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_ENERGY_METRIC,
  INITIAL_WATER_METRIC,
  SUSTAINABILITY_METRIC,
  INITIAL_USER,
  PREDICTIONS_DATA
} from '../data/mockData';
import { databaseApi, isDatabaseConfigured, toRegisteredAccount } from '../lib/api';

export type NavigationPage =
  | 'landing'
  | 'about'
  | 'features'
  | 'how-it-works'
  | 'public-sustainability'
  | 'contact'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'dashboard'
  | 'classrooms'
  | 'labs'
  | 'occupancy'
  | 'energy'
  | 'water'
  | 'predictions'
  | 'recommendations'
  | 'alerts'
  | 'sustainability'
  | 'analytics'
  | 'settings'
  | 'profile';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

const DEFAULT_ACCOUNTS: RegisteredAccount[] = [
  {
    id: 'usr_demo',
    name: 'Demo Admin',
    email: 'demo@smartcampus.ai',
    role: 'Super Admin',
    institution: 'Global Tech Institute of AI',
    campusName: 'Main Cyber Campus',
    phone: '+1 (555) 019-2834',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    department: 'Smart Infrastructure',
    passwordHash: 'DemoCampus@2026',
    registeredAt: '2026-09-01T00:00:00Z',
  },
  {
    id: 'usr_001',
    name: 'Dr. Shrithan Raman',
    email: 'admin@smartcampus.edu',
    role: 'Super Admin',
    institution: 'Apex Institute of Technology & Research',
    campusName: 'North Technology Campus',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    department: 'Campus Infrastructure & AI Operations',
    passwordHash: 'CampusAdmin@2026',
    registeredAt: '2026-09-10T00:00:00Z',
  },
  {
    id: 'usr_002',
    name: 'Academic Dean Elena Vance',
    email: 'dean@smartcampus.edu',
    role: 'Campus Admin',
    institution: 'Apex Institute of Technology & Research',
    campusName: 'North Technology Campus',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    department: 'Academic Affairs',
    passwordHash: 'DeanCampus@2026',
    registeredAt: '2026-09-12T00:00:00Z',
  },
  {
    id: 'usr_003',
    name: 'Marcus Brody',
    email: 'facilities@smartcampus.edu',
    role: 'Facility Manager',
    institution: 'Apex Institute of Technology & Research',
    campusName: 'North Technology Campus',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    department: 'HVAC, Power & Utilities',
    passwordHash: 'Facilities@2026',
    registeredAt: '2026-09-15T00:00:00Z',
  },
  {
    id: 'usr_004',
    name: 'Prof. David Kuan',
    email: 'faculty@smartcampus.edu',
    role: 'Faculty',
    institution: 'Apex Institute of Technology & Research',
    campusName: 'North Technology Campus',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    department: 'Computer Science & AI',
    passwordHash: 'Faculty@2026',
    registeredAt: '2026-09-18T00:00:00Z',
  },
];

const PROTECTED_PAGES: NavigationPage[] = [
  'dashboard',
  'classrooms',
  'labs',
  'occupancy',
  'energy',
  'water',
  'predictions',
  'recommendations',
  'alerts',
  'sustainability',
  'analytics',
  'settings',
  'profile',
];

interface CampusContextType {
  // Navigation & Auth
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  navigateTo: (page: NavigationPage) => void;
  user: User | null;
  authBanner: AuthBanner | null;
  setAuthBanner: (banner: AuthBanner | null) => void;
  prefilledEmail: string;
  setPrefilledEmail: (email: string) => void;
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (open: boolean) => void;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  confirmLogout: () => void;
  registerAccount: (details: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    campusName?: string;
    role: UserRole;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  loginWithCredentials: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, role?: string) => void;
  logout: () => void;
  setUserRole: (role: any) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Campus Data
  buildings: Building[];
  classrooms: Classroom[];
  laboratories: Laboratory[];
  alerts: CampusAlert[];
  recommendations: AIRecommendation[];
  energy: EnergyMetric;
  water: WaterMetric;
  sustainability: SustainabilityMetric;
  predictions: typeof PREDICTIONS_DATA;

  // Actions
  markAlertRead: (id: string) => void;
  resolveAlert: (id: string) => void;
  applyRecommendation: (id: string) => void;
  dismissRecommendation: (id: string) => void;
  findOptimalRooms: (req: AllocationRequest) => AllocationRecommendation[];
  allocateClassroom: (roomId: string, course: string, instructor: string) => void;
  updateClassroomStatus: (roomId: string, status: Classroom['status']) => void;

  // Demo & Simulation
  isLiveSimulationActive: boolean;
  toggleLiveSimulation: () => void;
  simulateOccupancySpike: () => void;
  simulateEnergySpike: () => void;
  simulateWaterLeakage: () => void;
  triggerAIOptimization: () => void;
  resetDemoData: () => void;

  // Notifications
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('landing');
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<NavigationPage | null>(null);
  const [authBanner, setAuthBanner] = useState<AuthBanner | null>(null);
  const [prefilledEmail, setPrefilledEmail] = useState<string>('');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Restore authenticated session from localStorage or sessionStorage
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('smart_campus_session') || sessionStorage.getItem('smart_campus_session');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse active user session', e);
    }
    return null;
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Core state collections
  const [buildings, setBuildings] = useState<Building[]>(BUILDINGS);
  const [classrooms, setClassrooms] = useState<Classroom[]>(CLASSROOMS);
  const [laboratories, setLaboratories] = useState<Laboratory[]>(LABORATORIES);
  const [alerts, setAlerts] = useState<CampusAlert[]>(INITIAL_ALERTS);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>(INITIAL_RECOMMENDATIONS);
  const [energy, setEnergy] = useState<EnergyMetric>(INITIAL_ENERGY_METRIC);
  const [water, setWater] = useState<WaterMetric>(INITIAL_WATER_METRIC);
  const [sustainability, setSustainability] = useState<SustainabilityMetric>(SUSTAINABILITY_METRIC);
  const [predictions] = useState(PREDICTIONS_DATA);

  const [isLiveSimulationActive, setIsLiveSimulationActive] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Protected navigation handler
  const navigateTo = useCallback((page: NavigationPage) => {
    if (PROTECTED_PAGES.includes(page) && !user) {
      setRedirectAfterLogin(page);
      setAuthBanner({
        type: 'info',
        title: 'Authentication Required',
        message: 'Please sign in to access your intelligent campus dashboard and resource tools.',
      });
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
  }, [user]);

  // Account Registration with Duplicate Check (DOES NOT automatically login!)
  const registerAccount = useCallback(async (details: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    campusName?: string;
    role: UserRole;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (isDatabaseConfigured) {
      try {
        const result = await databaseApi.register(details);
        if (result.success) {
          setPrefilledEmail(details.email);
        }
        return result;
      } catch (err: any) {
        return { success: false, error: err?.message || 'Failed to connect to the database.' };
      }
    }

    try {
      const storedStr = localStorage.getItem('smart_campus_accounts');
      const accounts: RegisteredAccount[] = storedStr ? JSON.parse(storedStr) : DEFAULT_ACCOUNTS;

      // Prevent duplicate registered email addresses
      const duplicate = accounts.some(
        (acc) => acc.email.toLowerCase() === details.email.toLowerCase()
      );

      if (duplicate) {
        return {
          success: false,
          error: 'An account with this institutional email already exists. Please sign in instead.',
        };
      }

      const newAccount = toRegisteredAccount(details);

      accounts.push(newAccount);
      localStorage.setItem('smart_campus_accounts', JSON.stringify(accounts));
      setPrefilledEmail(details.email);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to process registration.' };
    }
  }, []);

  // Production-grade login with credentials verification, session storage, and loading state
  const loginWithCredentials = useCallback(async (
    email: string,
    password: string,
    rememberMe = true
  ): Promise<{ success: boolean; error?: string }> => {
    if (isDatabaseConfigured) {
      try {
        const result = await databaseApi.login(email.trim(), password);
        if (!result.success || !result.user) {
          return { success: false, error: result.error || 'Invalid email or password. Please try again.' };
        }

        setUser(result.user);
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('smart_campus_session', JSON.stringify(result.user));
        setAuthBanner(null);
        const destination = redirectAfterLogin || 'dashboard';
        setRedirectAfterLogin(null);
        setCurrentPage(destination);
        addToast({
          type: 'success',
          title: 'Authentication Successful',
          message: `Welcome back, ${result.user.name} (${result.user.role})`,
        });
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Authentication service temporarily unavailable.' };
      }
    }

    // Demo fallback when no database API URL is configured.
    await new Promise((resolve) => setTimeout(resolve, 650));

    try {
      const storedStr = localStorage.getItem('smart_campus_accounts');
      const accounts: RegisteredAccount[] = storedStr ? JSON.parse(storedStr) : DEFAULT_ACCOUNTS;

      // Case-insensitive email search
      const matched = accounts.find(
        (acc) => acc.email.toLowerCase() === email.trim().toLowerCase()
      );

      // Secure generic response to prevent username enumeration
      if (!matched || matched.passwordHash !== password) {
        return {
          success: false,
          error: 'Invalid email or password. Please try again.',
        };
      }

      // Create secure user session payload (exclude password)
      const sessionUser: User = {
        id: matched.id,
        name: matched.name,
        email: matched.email,
        phone: matched.phone,
        institution: matched.institution,
        campusName: matched.campusName,
        role: matched.role,
        department: matched.department,
        avatar: matched.avatar,
      };

      setUser(sessionUser);

      if (rememberMe) {
        localStorage.setItem('smart_campus_session', JSON.stringify(sessionUser));
      } else {
        sessionStorage.setItem('smart_campus_session', JSON.stringify(sessionUser));
      }

      // Clear any auth banners
      setAuthBanner(null);

      // Redirect to originally requested protected route or default dashboard
      const destination = redirectAfterLogin || 'dashboard';
      setRedirectAfterLogin(null);
      setCurrentPage(destination);

      addToast({
        type: 'success',
        title: 'Authentication Successful',
        message: `Welcome back, ${sessionUser.name} (${sessionUser.role})`,
      });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Authentication service temporarily unavailable.' };
    }
  }, [redirectAfterLogin, addToast]);

  // Backward compatible login
  const login = (email: string, role = 'Super Admin') => {
    const defaultUser: User = {
      ...INITIAL_USER,
      email,
      role: role as any,
    };
    setUser(defaultUser);
    localStorage.setItem('smart_campus_session', JSON.stringify(defaultUser));
    setCurrentPage('dashboard');
    addToast({
      type: 'success',
      title: 'Authentication Successful',
      message: `Welcome back, ${defaultUser.name} (${role})`,
    });
  };

  // Open modal confirmation for logout
  const logout = () => {
    setIsLogoutModalOpen(true);
  };

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  // Confirmed logout execution
  const confirmLogout = useCallback(() => {
    localStorage.removeItem('smart_campus_session');
    sessionStorage.removeItem('smart_campus_session');
    setUser(null);
    setIsLogoutModalOpen(false);
    setAuthBanner({
      type: 'info',
      message: 'You have been signed out successfully.',
    });
    setCurrentPage('login');
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out successfully.',
    });
  }, [addToast]);

  const setUserRole = (role: any) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('smart_campus_session', JSON.stringify(updatedUser));
      addToast({
        type: 'info',
        title: 'Role Switched',
        message: `Active permission profile updated to ${role}.`,
      });
    }
  };

  const markAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'read' as const } : a))
    );
  };

  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolved' as const } : a))
    );
    addToast({
      type: 'success',
      title: 'Alert Resolved',
      message: 'Mitigation workflow logged to facility operations.',
    });
  };

  const applyRecommendation = (id: string) => {
    const target = recommendations.find((r) => r.id === id);
    if (!target) return;

    // Trigger visual celebration
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#38bdf8', '#10b981', '#6366f1'],
      });
    } catch {
      // fallback
    }

    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'applied' as const } : r))
    );

    // Dynamic state impact based on recommendation
    if (id === 'rec_001') {
      // Move Database lab to Lab 5
      setLaboratories((prev) =>
        prev.map((lab) => {
          if (lab.id === 'lab_3') {
            return { ...lab, currentUsage: 0, status: 'Available', utilizationRate: 0, powerLoadKW: 4.2 };
          }
          if (lab.id === 'lab_5') {
            return { ...lab, currentUsage: 44, status: 'Occupied', utilizationRate: 73, powerLoadKW: 11.2 };
          }
          return lab;
        })
      );
      setEnergy((prev) => ({
        ...prev,
        currentKW: Math.max(480, prev.currentKW - 8.6),
        todayKWh: prev.todayKWh - 14,
      }));
    } else if (id === 'rec_002') {
      // Optimize Building A HVAC
      setClassrooms((prev) =>
        prev.map((room) => {
          if (['A104', 'A204', 'A401'].includes(room.roomNumber)) {
            return { ...room, energyUsageKW: 0.1, tempCelsius: 24.5 };
          }
          return room;
        })
      );
      setEnergy((prev) => ({
        ...prev,
        currentKW: Math.max(450, prev.currentKW - 18.2),
      }));
    } else if (id === 'rec_003') {
      // Fix water anomaly in Block C
      setWater((prev) => ({
        ...prev,
        currentFlowLMin: 112,
        anomalyDetected: false,
      }));
      setAlerts((prev) =>
        prev.map((a) => (a.id === 'alt_001' ? { ...a, status: 'resolved' as const } : a))
      );
    }

    // Boost sustainability score
    setSustainability((prev) => ({
      ...prev,
      resourceEfficiencyScore: Math.min(96, prev.resourceEfficiencyScore + 2),
      energySavedMWh: +(prev.energySavedMWh + 0.3).toFixed(1),
      co2ReductionTons: +(prev.co2ReductionTons + 0.2).toFixed(1),
    }));

    addToast({
      type: 'success',
      title: 'Recommendation Applied',
      message: `Action executed: "${target.title}". Resource baseline optimized.`,
    });
  };

  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'dismissed' as const } : r))
    );
    addToast({
      type: 'info',
      title: 'Recommendation Dismissed',
      message: 'Item archived in AI historical log.',
    });
  };

  const findOptimalRooms = (req: AllocationRequest): AllocationRecommendation[] => {
    const candidates = classrooms.filter((r) => {
      // Must accommodate headcount
      if (r.capacity < req.studentsCount) return false;
      // Must not be under maintenance
      if (r.status === 'Maintenance') return false;
      return true;
    });

    // Score candidates based on capacity tightness, current status, and equipment match
    const scored = candidates.map((room) => {
      let score = 70;

      // Fit score: avoid wasting a 120-person room on 20 students
      const fillRatio = req.studentsCount / room.capacity;
      if (fillRatio >= 0.75 && fillRatio <= 0.95) score += 20;
      else if (fillRatio >= 0.6) score += 10;
      else if (fillRatio < 0.4) score -= 15;

      // Equipment match
      const hasAllEquipment = req.requiredEquipment.every((eq) =>
        room.equipment.some((item) => item.toLowerCase().includes(eq.toLowerCase()))
      );
      if (hasAllEquipment) score += 10;

      // Prefer currently available or lower baseline energy
      if (room.status === 'Available') score += 10;

      const efficiencyScore: 'High' | 'Optimal' | 'Standard' =
        score >= 85 ? 'High' : score >= 70 ? 'Optimal' : 'Standard';

      const reason = `Fits ${req.studentsCount} students into ${room.capacity}-seat space (${Math.round(
        fillRatio * 100
      )}% fit). Equipped with ${room.equipment.slice(0, 2).join(', ')}.`;

      const energyImpact =
        room.energyUsageKW < 2.0
          ? 'Minimal additional HVAC load (+0.8 kW)'
          : 'Standard thermal load (+1.4 kW)';

      return {
        room,
        matchScore: Math.min(99, Math.max(50, score)),
        efficiencyScore,
        reason,
        energyImpact,
      };
    });

    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
  };

  const allocateClassroom = (roomId: string, course: string, instructor: string) => {
    setClassrooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          return {
            ...r,
            status: 'Occupied',
            currentOccupancy: Math.round(r.capacity * 0.85),
            utilizationRate: 85,
            nextSchedule: { course, instructor, time: 'Now - 2 Hours' },
          };
        }
        return r;
      })
    );
    addToast({
      type: 'success',
      title: 'Room Allocated',
      message: `Room ${roomId} has been reserved for ${course} (${instructor}).`,
    });
  };

  const updateClassroomStatus = (roomId: string, status: Classroom['status']) => {
    setClassrooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const occ = status === 'Occupied' ? Math.round(r.capacity * 0.8) : 0;
          return {
            ...r,
            status,
            currentOccupancy: occ,
            utilizationRate: Math.round((occ / r.capacity) * 100),
          };
        }
        return r;
      })
    );
    addToast({
      type: 'info',
      title: 'Status Updated',
      message: `Classroom ${roomId} updated to ${status}.`,
    });
  };

  // Real-time live simulation ticker
  useEffect(() => {
    if (!isLiveSimulationActive) return;

    const interval = setInterval(() => {
      // Jitter energy slightly by +/- 1 to 3 kW
      setEnergy((prev) => {
        const delta = (Math.random() - 0.48) * 3;
        const newKW = +(prev.currentKW + delta).toFixed(1);
        return {
          ...prev,
          currentKW: Math.max(480, Math.min(620, newKW)),
          todayKWh: +(prev.todayKWh + 0.05).toFixed(1),
        };
      });

      // Jitter water flow
      setWater((prev) => {
        const delta = (Math.random() - 0.5) * 2;
        return {
          ...prev,
          currentFlowLMin: Math.max(120, Math.min(180, Math.round(prev.currentFlowLMin + delta))),
          todayLiters: prev.todayLiters + 2,
        };
      });

      // Randomly tweak 1 classroom occupancy
      setClassrooms((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const room = prev[randomIndex];
        if (room.status === 'Occupied') {
          const deltaOcc = Math.floor((Math.random() - 0.5) * 4);
          const newOcc = Math.max(5, Math.min(room.capacity, room.currentOccupancy + deltaOcc));
          const updated = [...prev];
          updated[randomIndex] = {
            ...room,
            currentOccupancy: newOcc,
            utilizationRate: Math.round((newOcc / room.capacity) * 100),
          };
          return updated;
        }
        return prev;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isLiveSimulationActive]);

  const toggleLiveSimulation = () => {
    setIsLiveSimulationActive((prev) => {
      const next = !prev;
      addToast({
        type: 'info',
        title: 'Simulation Stream',
        message: next ? 'Live telemetry stream resumed.' : 'Live telemetry stream paused.',
      });
      return next;
    });
  };

  // Hackathon Demo actions
  const simulateOccupancySpike = () => {
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === 'bld_2'
          ? {
              ...b,
              currentOccupancy: Math.min(b.capacity, b.currentOccupancy + 110),
              occupancyRate: 95,
              status: 'High Load',
            }
          : b
      )
    );

    const newAlert: CampusAlert = {
      id: `alt_${Date.now()}`,
      title: 'Occupancy Surge in Science Complex B',
      message: 'Sudden influx of +110 occupants detected across atrium and Floor 2 auditoriums. HVAC load scaling to 100%.',
      category: 'occupancy',
      severity: 'warning',
      timestamp: 'Just now',
      buildingId: 'bld_2',
      buildingName: 'Science Complex B',
      status: 'unread',
      metricValue: '95% capacity',
      actionRequired: 'Open secondary ventilation dampers & alert campus security',
    };

    setAlerts((prev) => [newAlert, ...prev]);
    addToast({
      type: 'warning',
      title: 'Simulation: Occupancy Surge',
      message: 'Sudden crowd influx in Science Complex B (+110 students). Alert generated.',
    });
  };

  const simulateEnergySpike = () => {
    setEnergy((prev) => ({
      ...prev,
      currentKW: prev.currentKW + 48.5,
    }));

    setBuildings((prev) =>
      prev.map((b) =>
        b.id === 'bld_1' ? { ...b, energyKW: b.energyKW + 48.5, status: 'High Load' } : b
      )
    );

    const newAlert: CampusAlert = {
      id: `alt_${Date.now()}`,
      title: 'Severe Power Draw Surge: Block A Chiller',
      message: 'Substation A reported sudden surge of +48.5 kW due to chiller compressor short-cycling.',
      category: 'energy',
      severity: 'critical',
      timestamp: 'Just now',
      buildingId: 'bld_1',
      buildingName: 'Engineering Block A',
      status: 'unread',
      metricValue: '+48.5 kW',
      actionRequired: 'Switch to backup chiller unit and activate peak shedding',
    };

    setAlerts((prev) => [newAlert, ...prev]);
    addToast({
      type: 'error',
      title: 'Simulation: Energy Surge',
      message: 'Engineering Block A power spiked +48.5 kW! Critical alert triggered.',
    });
  };

  const simulateWaterLeakage = () => {
    setWater((prev) => ({
      ...prev,
      currentFlowLMin: prev.currentFlowLMin + 55,
      anomalyDetected: true,
      leakageZone: 'Computing & AI Center C - Hydronic Valve 3B',
    }));

    const newAlert: CampusAlert = {
      id: `alt_${Date.now()}`,
      title: '🚨 High-Flow Water Leakage Detected',
      message: 'Smart acoustic hydro-sensor detected continuous burst rate flow of +55 L/min in Computing Center C riser.',
      category: 'water',
      severity: 'critical',
      timestamp: 'Just now',
      buildingId: 'bld_3',
      buildingName: 'Computing & AI Center C',
      status: 'unread',
      metricValue: '+55 L/min abnormal',
      actionRequired: 'Trigger remote automated shutoff solenoid valve #3B',
    };

    setAlerts((prev) => [newAlert, ...prev]);
    addToast({
      type: 'error',
      title: 'Simulation: Water Leakage',
      message: 'Burst water leak simulated in Block C! Flow spiked +55 L/min.',
    });
  };

  const triggerAIOptimization = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#06b6d4', '#10b981', '#a855f7'],
      });
    } catch {
      // fallback
    }

    const newRec: AIRecommendation = {
      id: `rec_${Date.now()}`,
      title: 'Autonomous Grid Balancing: Shift 35 kW to Battery BESS',
      category: 'Energy Optimization',
      problem: 'Campus solar peak is generating 140 kW while utility demand charges are entering the highest tier.',
      aiAnalysis: 'Campus battery energy storage system (BESS) is at 62% state-of-charge with 200 kWh capacity available.',
      recommendedAction: 'Direct excess solar into BESS and discharge during 14:00-17:00 high tariff window.',
      expectedBenefit: 'Avoids $540 peak demand penalty and stores 100% clean solar energy.',
      estimatedSavings: '$540 / month & 110 kg CO₂',
      priority: 'HIGH',
      status: 'pending',
      buildingId: 'bld_1',
      buildingName: 'Engineering Block A',
      createdAt: 'Just now',
    };

    setRecommendations((prev) => [newRec, ...prev]);
    setSustainability((prev) => ({
      ...prev,
      resourceEfficiencyScore: Math.min(99, prev.resourceEfficiencyScore + 1),
    }));

    addToast({
      type: 'success',
      title: 'AI Optimization Triggered',
      message: 'New high-priority optimization generated for campus microgrid.',
    });
  };

  const resetDemoData = () => {
    setBuildings(BUILDINGS);
    setClassrooms(CLASSROOMS);
    setLaboratories(LABORATORIES);
    setAlerts(INITIAL_ALERTS);
    setRecommendations(INITIAL_RECOMMENDATIONS);
    setEnergy(INITIAL_ENERGY_METRIC);
    setWater(INITIAL_WATER_METRIC);
    setSustainability(SUSTAINABILITY_METRIC);
    addToast({
      type: 'info',
      title: 'Reset Completed',
      message: 'Campus datasets and live sensor state reverted to factory baseline.',
    });
  };

  return (
    <CampusContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        user,
        authBanner,
        setAuthBanner,
        prefilledEmail,
        setPrefilledEmail,
        isLogoutModalOpen,
        setIsLogoutModalOpen,
        openLogoutModal,
        closeLogoutModal,
        confirmLogout,
        registerAccount,
        loginWithCredentials,
        login,
        logout,
        setUserRole,
        searchQuery,
        setSearchQuery,
        buildings,
        classrooms,
        laboratories,
        alerts,
        recommendations,
        energy,
        water,
        sustainability,
        predictions,
        markAlertRead,
        resolveAlert,
        applyRecommendation,
        dismissRecommendation,
        findOptimalRooms,
        allocateClassroom,
        updateClassroomStatus,
        isLiveSimulationActive,
        toggleLiveSimulation,
        simulateOccupancySpike,
        simulateEnergySpike,
        simulateWaterLeakage,
        triggerAIOptimization,
        resetDemoData,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
