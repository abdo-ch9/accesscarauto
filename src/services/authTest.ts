// Demo authentication service for offline/fallback mode

export interface TestUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: 'user' | 'admin';
  isEmailVerified: boolean;
  createdAt: string;
}

interface AuthResponse<T = TestUser> {
  success: boolean;
  user?: T;
  error?: string;
}

interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const STORAGE_KEY = 'demoUsers' as const;

const getStoredUsers = (): TestUser[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: TestUser[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

const defaultUsers: TestUser[] = [
  {
    id: '1',
    email: 'demo@aero.com',
    firstName: 'Demo',
    lastName: 'User',
    fullName: 'Demo User',
    role: 'user',
    isEmailVerified: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'admin@aero.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    role: 'admin',
    isEmailVerified: true,
    createdAt: new Date().toISOString()
  }
];

// Initialize default users on first load
if (getStoredUsers().length === 0) {
  saveUsers(defaultUsers);
}

const DEMO_MODE_KEY = 'useDemoMode';

export const setDemoMode = (enabled: boolean) => {
  localStorage.setItem(DEMO_MODE_KEY, enabled ? 'true' : 'false');
};

export const isDemoMode = (): boolean => {
  const value = localStorage.getItem(DEMO_MODE_KEY);
  // Default to false to try Supabase first, falls back to demo if connection fails
  return value === 'true';
};

const MIN_PASSWORD_LENGTH = 3;
const DEMO_DELAY_MS = 50;

export const testAuth = {
  async login(email: string, password: string): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, DEMO_DELAY_MS));
    
    const users = getStoredUsers();
    const user = users.find(u => u.email === email.toLowerCase());
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    if (password.length < MIN_PASSWORD_LENGTH) {
      return { success: false, error: 'Password too short' };
    }
    
    return { success: true, user };
  },

  async register(userData: RegisterInput): Promise<AuthResponse> {
    await new Promise(resolve => setTimeout(resolve, DEMO_DELAY_MS));
    
    const users = getStoredUsers();
    const normalizedEmail = userData.email.toLowerCase();
    const existingUser = users.find(u => u.email === normalizedEmail);
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    if (userData.password.length < MIN_PASSWORD_LENGTH) {
      return { success: false, error: 'Password too short' };
    }
    
    const newUser: TestUser = {
      id: Date.now().toString(),
      email: normalizedEmail,
      firstName: userData.firstName,
      lastName: userData.lastName,
      fullName: `${userData.firstName} ${userData.lastName}`,
      role: 'user',
      isEmailVerified: true,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: newUser };
  }
};
