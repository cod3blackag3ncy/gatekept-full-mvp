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
export interface Verification {
    id: string;
    userId: string;
    status: 'pending' | 'verified' | 'failed';
    provider?: string | null;
    providerId?: string | null;
    verifiedAt?: Date | null;
    createdAt: Date;
}
export interface Subscription {
    id: string;
    userId: string;
    status: 'trial' | 'active' | 'canceled' | 'expired';
    plan: 'basic' | 'premium' | 'elite';
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
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
export interface Message {
    id: string;
    matchId: string;
    senderId: string;
    content: string;
    type: 'video' | 'text';
    expiresAt: Date;
    isDeleted: boolean;
    isReported?: boolean;
    createdAt: Date;
}
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
export interface Preferences {
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    interestedIn: ('male' | 'female' | 'nonbinary' | 'other')[];
    showOnFeed: boolean;
    showDistance: boolean;
    showAge: boolean;
    notifications: {
        newMatches: boolean;
        messages: boolean;
        likes: boolean;
        marketing: boolean;
    };
}
export interface Notification {
    id: string;
    type: 'match' | 'message' | 'like' | 'system';
    title: string;
    body: string;
    read: boolean;
    createdAt: number;
    data?: Record<string, any>;
}
