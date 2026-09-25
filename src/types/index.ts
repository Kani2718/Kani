export type UserRole = 'Super Admin' | 'Campus Admin' | 'Facility Manager' | 'Faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  campusName?: string;
  phone?: string;
  avatar?: string;
  department?: string;
}

export interface RegisteredAccount extends User {
  passwordHash?: string;
  registeredAt: string;
}

export interface AuthBanner {
  type: 'success' | 'info' | 'error';
  title?: string;
  message: string;
}

export type RoomStatus = 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
export type RoomType = 'Lecture Hall' | 'Seminar Room' | 'Standard Classroom' | 'Auditorium' | 'Computer Lab';

export interface Classroom {
  id: string;
  roomNumber: string;
  buildingId: string;
  buildingName: string;
  floor: number;
  capacity: number;
  currentOccupancy: number;
  status: RoomStatus;
  utilizationRate: number; // percentage
  equipment: string[];
  department: string;
  airQualityPPM: number;
  tempCelsius: number;
  energyUsageKW: number;
  lastCleaned: string;
  nextSchedule?: {
    course: string;
    instructor: string;
    time: string;
  };
}

export interface Laboratory {
  id: string;
  name: string;
  labCode: string;
  buildingId: string;
  buildingName: string;
  capacity: number;
  currentUsage: number;
  status: RoomStatus;
  utilizationRate: number;
  specializedEquipment: string[];
  department: string;
  safetyRating: 'A+' | 'A' | 'B' | 'Needs Inspection';
  powerLoadKW: number;
  hazardousGasSensor: 'Normal' | 'Trace' | 'Warning';
  schedule: {
    time: string;
    subject: string;
    professor: string;
    enrolled: number;
  }[];
}

export interface Building {
  id: string;
  name: string;
  code: string;
  totalFloors: number;
  totalRooms: number;
  totalLabs: number;
  capacity: number;
  currentOccupancy: number;
  occupancyRate: number; // percentage
  energyKW: number;
  waterFlowLMin: number;
  solarGenerationKW: number;
  status: 'Optimal' | 'Warning' | 'High Load';
  coordinates: { x: number; y: number };
}

export type AlertSeverity = 'critical' | 'warning' | 'attention' | 'info';

export interface CampusAlert {
  id: string;
  title: string;
  message: string;
  category: 'energy' | 'water' | 'occupancy' | 'safety' | 'system';
  severity: AlertSeverity;
  timestamp: string;
  buildingId?: string;
  buildingName?: string;
  roomId?: string;
  status: 'unread' | 'read' | 'resolved';
  metricValue?: string;
  actionRequired?: string;
}

export type RecommendationPriority = 'HIGH' | 'MEDIUM' | 'LOW';

export interface AIRecommendation {
  id: string;
  title: string;
  category: 'Energy Optimization' | 'Space Allocation' | 'Water Conservation' | 'Maintenance';
  problem: string;
  aiAnalysis: string;
  recommendedAction: string;
  expectedBenefit: string;
  estimatedSavings: string;
  priority: RecommendationPriority;
  status: 'pending' | 'applied' | 'dismissed';
  buildingId?: string;
  buildingName?: string;
  createdAt: string;
}

export interface PredictionDataPoint {
  time: string;
  historical?: number;
  predicted: number;
  upperConfidence?: number;
  lowerConfidence?: number;
  actual?: number;
}

export interface EnergyMetric {
  currentKW: number;
  todayKWh: number;
  monthlyKWh: number;
  yesterdayKWh: number;
  peakHour: string;
  solarGeneratedKWh: number;
  gridImportKWh: number;
  hourlyData: { hour: string; today: number; yesterday: number; baseline: number }[];
  buildingBreakdown: { building: string; consumption: number; percentage: number }[];
}

export interface WaterMetric {
  currentFlowLMin: number;
  todayLiters: number;
  monthlyLiters: number;
  anomalyDetected: boolean;
  leakageZone?: string;
  hourlyData: { hour: string; flow: number; average: number }[];
  blockBreakdown: { block: string; usage: number; variance: number }[];
}

export interface SustainabilityMetric {
  energySavedMWh: number;
  waterSavedLiters: number;
  co2ReductionTons: number;
  resourceEfficiencyScore: number; // 0-100
  treesEquivalent: number;
  solarCoveragePercent: number;
  monthlyTrend: { month: string; co2Saved: number; energySaved: number }[];
}

export interface AllocationRequest {
  studentsCount: number;
  roomType: RoomType;
  date: string;
  timeSlot: string;
  requiredEquipment: string[];
  department: string;
}

export interface AllocationRecommendation {
  room: Classroom;
  matchScore: number; // 0-100
  efficiencyScore: 'High' | 'Optimal' | 'Standard';
  reason: string;
  energyImpact: string;
}
