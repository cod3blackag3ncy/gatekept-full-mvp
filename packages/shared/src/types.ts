// User Types
export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: Profile;
  verification?: Verification;
  subscription?: Subscription;
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  bio: string;
  age: number;
  gender: 'male' | 'female' | 'nonbinary' | 'other';
  location: string;
  photos: string[];
  videoUrl?: string;
  interests: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedProfile {
  id: string;
  displayName: string;
  age: number;
  bio: string;
  location: string;
  photos: string[];
  videoUrl?: string;
  interests: string[];
  distance: number;
}

// Verification Types
export interface Verification {
  id: string;
  userId: string;
  status: 'pending' | 'verified' | 'failed';
  provider?: string | null;
  providerId?: string | null;
  verifiedAt?: Date | null;
  createdAt: Date;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  status: 'trial' | 'active' | 'canceled' | 'expired';
  plan: 'basic' | 'premium' | 'elite';
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Match Types
export interface Match {
  id: string;
  userId: string;
  targetId: string;
  action: 'pass' | 'connect';
  isMutual: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MutualMatch {
  matchId: string;
  userId: string;
  displayName: string;
  photo?: string;
  matchedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  matchId: string;
  senderId: string;
  content: string; // Video URL
  type: 'video' | 'text';
  expiresAt: Date;
  isDeleted: boolean;
  isReported?: boolean;
  createdAt: Date;
}

// Auth Types
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
  age: number;
  gender: 'male' | 'female' | 'nonbinary' | 'other';
  phone?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  hasMore: boolean;
}

// Report Types
export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reportedMessageId?: string;
  reason: string;
  details?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
}
