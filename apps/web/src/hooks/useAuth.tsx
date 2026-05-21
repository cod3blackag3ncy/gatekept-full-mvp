'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthTokens } from '@gatekept/shared';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  age: number;
  gender: 'male' | 'female' | 'nonbinary' | 'other';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for mock mode
const DEMO_USER: User = {
  id: 'demo-user-123',
  email: 'demo@gatekept.app',
  passwordHash: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  profile: {
    id: 'demo-profile-123',
    userId: 'demo-user-123',
    displayName: 'Demo User',
    bio: 'This is a demo account',
    age: 28,
    gender: 'nonbinary',
    location: 'San Francisco, CA',
    photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    interests: ['hiking', 'photography'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  verification: {
    id: 'demo-verification-123',
    userId: 'demo-user-123',
    status: 'verified',
    provider: 'mock',
    providerId: 'mock-verification',
    verifiedAt: new Date(),
    createdAt: new Date(),
  },
  subscription: {
    id: 'demo-subscription-123',
    userId: 'demo-user-123',
    status: 'active',
    plan: 'premium',
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - always succeeds with demo user
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userWithEmail = {
      ...DEMO_USER,
      email,
      id: `user-${Date.now()}`,
      profile: {
        ...DEMO_USER.profile!,
        displayName: email.split('@')[0],
      },
    };
    
    localStorage.setItem('user', JSON.stringify(userWithEmail));
    setUser(userWithEmail);
  };

  const register = async (data: RegisterData) => {
    // Mock register - always succeeds
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      passwordHash: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: `profile-${Date.now()}`,
        userId: `user-${Date.now()}`,
        displayName: data.displayName,
        bio: '',
        age: data.age,
        gender: data.gender,
        location: '',
        photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'],
        interests: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      verification: {
        id: `verification-${Date.now()}`,
        userId: `user-${Date.now()}`,
        status: 'pending',
        provider: null,
        providerId: null,
        verifiedAt: null,
        createdAt: new Date(),
      },
      subscription: {
        id: `subscription-${Date.now()}`,
        userId: `user-${Date.now()}`,
        status: 'trial',
        plan: 'basic',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const refreshUser = async () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
