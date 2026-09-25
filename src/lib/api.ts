import type { RegisteredAccount, User, UserRole } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const isDatabaseConfigured = Boolean(API_BASE_URL);

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
  token?: string;
}

interface RegisterDetails {
  fullName: string;
  email: string;
  phone: string;
  institution: string;
  campusName?: string;
  role: UserRole;
  password: string;
}

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const body = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(body.error || `Database request failed (${response.status})`);
  }
  return body;
}

export const databaseApi = {
  register: (details: RegisterDetails) =>
    request<{ success: boolean; error?: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(details),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  session: () => request<{ user: User }>('/api/auth/session', { method: 'GET' }),
};

export function toRegisteredAccount(details: RegisterDetails): RegisteredAccount {
  return {
    id: `usr_${Date.now()}`,
    name: details.fullName,
    email: details.email,
    phone: details.phone,
    institution: details.institution,
    campusName: details.campusName || 'Main Campus',
    role: details.role,
    department: 'Institutional Resource Operations',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    passwordHash: details.password,
    registeredAt: new Date().toISOString(),
  };
}
