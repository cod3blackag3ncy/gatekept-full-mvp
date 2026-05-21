// Fake API layer - simulates backend with realistic latency
// All methods return Promises with setTimeout delays
// Set NEXT_PUBLIC_SIMULATE_ERRORS=1 to simulate 5% error rate

import { mockStore, StoredProfile, SwipeAction, Conversation, StoredMessage, NotificationItem, WaitlistEntry } from './mockStore';
import { User, Match, Report, Preferences, Profile } from '@gatekept/shared';

const SIMULATE_ERRORS = process.env.NEXT_PUBLIC_SIMULATE_ERRORS === '1';
const ERROR_RATE = 0.05; // 5% error rate

// Sleep utility with random duration
function sleep(minMs: number = 200, maxMs: number = 600): Promise<void> {
  const duration = Math.random() * (maxMs - minMs) + minMs;
  return new Promise(resolve => setTimeout(resolve, duration));
}

// Simulate random errors
function maybeError<T>(data: T): Promise<T> {
  if (SIMULATE_ERRORS && Math.random() < ERROR_RATE) {
    return Promise.reject(new Error('Simulated network error'));
  }
  return Promise.resolve(data);
}

// Generate IDs
function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    await sleep(300, 500);
    
    // Check for existing user or create demo user
    let user = mockStore.getUser();
    
    if (!user) {
      user = {
        id: `user-${Date.now()}`,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
        profile: {
          id: `profile-${Date.now()}`,
          userId: `user-${Date.now()}`,
          displayName: email.split('@')[0],
          bio: '',
          age: 25,
          gender: 'other',
          location: '',
          photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'],
          videoUrl: '',
          interests: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        verification: {
          id: `ver-${Date.now()}`,
          userId: `user-${Date.now()}`,
          status: 'pending',
          provider: null,
          providerId: null,
          verifiedAt: null,
          createdAt: new Date(),
        },
        subscription: {
          id: `sub-${Date.now()}`,
          userId: `user-${Date.now()}`,
          status: 'trial',
          plan: 'basic',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };
    } else {
      user.email = email;
    }
    
    mockStore.setUser(user);
    return maybeError(user);
  },

  register: async (data: {
    email: string;
    password: string;
    displayName: string;
    age: number;
    gender: 'male' | 'female' | 'nonbinary' | 'other';
  }): Promise<User> => {
    await sleep(400, 700);
    
    const user: User = {
      id: generateId('user'),
      email: data.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: {
        id: generateId('profile'),
        userId: '',
        displayName: data.displayName,
        bio: '',
        age: data.age,
        gender: data.gender,
        location: '',
        photos: ['https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'],
        videoUrl: '',
        interests: [],
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      verification: {
        id: generateId('ver'),
        userId: '',
        status: 'pending',
        provider: null,
        providerId: null,
        verifiedAt: null,
        createdAt: new Date(),
      },
      subscription: {
        id: generateId('sub'),
        userId: '',
        status: 'trial',
        plan: 'basic',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    
    // Fix circular references
    user.profile!.userId = user.id;
    user.verification!.userId = user.id;
    user.subscription!.userId = user.id;
    
    mockStore.setUser(user);
    mockStore.setOnboardingStep(1);
    return maybeError(user);
  },

  logout: async (): Promise<void> => {
    await sleep(200, 300);
    mockStore.setUser(null);
  },

  requestPasswordReset: async (email: string): Promise<{ success: boolean }> => {
    await sleep(300, 500);
    return maybeError({ success: true });
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ success: boolean }> => {
    await sleep(400, 600);
    return maybeError({ success: true });
  },

  verifyEmail: async (token: string): Promise<{ success: boolean }> => {
    await sleep(300, 500);
    return maybeError({ success: true });
  },
};

// Profile API
export const profileApi = {
  get: async (userId?: string): Promise<StoredProfile | null> => {
    await sleep(200, 400);
    
    if (userId) {
      return maybeError(mockStore.getProfileById(userId) || null);
    }
    
    const user = mockStore.getUser();
    if (!user?.profile) return null;
    
    return maybeError({
      ...user.profile,
      userId: user.id,
    } as StoredProfile);
  },

  update: async (data: Partial<StoredProfile>): Promise<StoredProfile> => {
    await sleep(300, 600);
    
    const user = mockStore.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const updatedProfile = { ...user.profile, ...data, updatedAt: new Date() } as Profile;
    user.profile = updatedProfile;
    mockStore.setUser(user);
    
    return maybeError({ ...updatedProfile, userId: user.id } as StoredProfile);
  },

  uploadVideo: async (blob: Blob): Promise<{ url: string }> => {
    await sleep(1000, 2000);
    // Create object URL for demo
    const url = URL.createObjectURL(blob);
    return maybeError({ url });
  },

  uploadPhoto: async (blob: Blob): Promise<{ url: string }> => {
    await sleep(800, 1500);
    const url = URL.createObjectURL(blob);
    return maybeError({ url });
  },
};

// Feed API
export const feedApi = {
  list: async (filters?: { page?: number; limit?: number }): Promise<StoredProfile[]> => {
    await sleep(400, 800);
    
    const allProfiles = mockStore.getProfiles();
    const user = mockStore.getUser();
    const swipes = mockStore.getSwipes();
    const blocked = mockStore.getBlockedUsers();
    const prefs = mockStore.getPreferences();
    
    // Filter out already swiped, blocked, and self
    const seenIds = new Set(swipes.map(s => s.targetId));
    if (user?.profile) seenIds.add(user.profile.id);
    
    let filtered = allProfiles.filter(p => {
      if (seenIds.has(p.id)) return false;
      if (blocked.includes(p.userId)) return false;
      if (p.age < prefs.ageMin || p.age > prefs.ageMax) return false;
      return true;
    });
    
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const start = (page - 1) * limit;
    
    return maybeError(filtered.slice(start, start + limit));
  },

  swipe: async (targetId: string, action: 'pass' | 'connect'): Promise<{ isMatch: boolean; match?: Match }> => {
    await sleep(200, 400);
    
    const user = mockStore.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const swipe: SwipeAction = {
      id: generateId('swipe'),
      userId: user.id,
      targetId,
      action,
      timestamp: Date.now(),
    };
    mockStore.addSwipe(swipe);
    
    // Check for mutual match (mock logic: some profiles have hasLikedYou=true)
    const targetProfile = mockStore.getProfileById(targetId);
    const isMatch = action === 'connect' && targetProfile?.hasLikedYou === true;
    
    let match: Match | undefined;
    if (isMatch) {
      match = {
        id: generateId('match'),
        userId: user.id,
        targetId,
        action: 'connect',
        isMutual: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockStore.addMatch(match);
      
      // Create conversation
      const conversations = mockStore.getConversations();
      conversations.push({
        id: generateId('conv'),
        matchId: match.id,
        participants: [user.id, targetId],
        lastMessageAt: Date.now(),
        unreadCount: 0,
      });
      localStorage.setItem('gk_conversations', JSON.stringify(conversations));
      
      // Add notification
      mockStore.addNotification({
        id: generateId('notif'),
        type: 'match',
        title: 'New Match!',
        body: `You and ${targetProfile?.displayName} liked each other!`,
        read: false,
        createdAt: Date.now(),
      });
    }
    
    return maybeError({ isMatch, match });
  },

  undoSwipe: async (): Promise<{ success: boolean }> => {
    await sleep(200, 400);
    
    const swipes = mockStore.getSwipes();
    const user = mockStore.getUser();
    
    const lastSwipe = swipes
      .filter(s => s.userId === user?.id)
      .sort((a, b) => b.timestamp - a.timestamp)[0];
    
    if (!lastSwipe || Date.now() - lastSwipe.timestamp > 3000) {
      return { success: false };
    }
    
    const filtered = swipes.filter(s => s.id !== lastSwipe.id);
    localStorage.setItem('gk_swipes', JSON.stringify(filtered));
    
    return maybeError({ success: true });
  },

  boost: async (): Promise<{ success: boolean }> => {
    await sleep(300, 500);
    return maybeError({ success: true });
  },
};

// Matches API
export const matchesApi = {
  list: async (): Promise<Array<{ match: Match; profile: StoredProfile }>> => {
    await sleep(300, 600);
    
    const user = mockStore.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const matches = mockStore.getMatches().filter(m => 
      m.userId === user.id || m.targetId === user.id
    );
    
    const result = matches.map(match => {
      const otherId = match.userId === user.id ? match.targetId : match.userId;
      const profile = mockStore.getProfileById(otherId);
      return { match, profile: profile! };
    }).filter(m => m.profile);
    
    return maybeError(result);
  },

  unmatch: async (matchId: string): Promise<{ success: boolean }> => {
    await sleep(200, 400);
    
    const matches = mockStore.getMatches();
    const filtered = matches.filter(m => m.id !== matchId);
    localStorage.setItem('gk_matches', JSON.stringify(filtered));
    
    return maybeError({ success: true });
  },
};

// Messages API
export const messagesApi = {
  list: async (conversationId: string): Promise<StoredMessage[]> => {
    await sleep(300, 500);
    return maybeError(mockStore.getMessagesByConversationId(conversationId));
  },

  send: async (conversationId: string, content: string, type: 'text' | 'video' = 'text'): Promise<StoredMessage> => {
    await sleep(400, 800);
    
    const user = mockStore.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const conv = mockStore.getConversationById(conversationId);
    if (!conv) throw new Error('Conversation not found');
    
    const message: StoredMessage = {
      id: generateId('msg'),
      matchId: conv.matchId,
      senderId: user.id,
      content,
      type,
      expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
      isDeleted: false,
      isRead: false,
      createdAt: new Date(),
    };
    
    mockStore.addMessage(message);
    
    // Update conversation unread count for other participant
    const otherParticipant = conv.participants.find(p => p !== user.id);
    if (otherParticipant) {
      mockStore.updateConversation(conversationId, {
        unreadCount: conv.unreadCount + 1,
      });
    }
    
    // Add notification
    const profile = mockStore.getProfileById(user.id);
    mockStore.addNotification({
      id: generateId('notif'),
      type: 'message',
      title: 'New Message',
      body: `${profile?.displayName || 'Someone'} sent you a message`,
      read: false,
      createdAt: Date.now(),
    });
    
    // Simulate typing indicator from other side (mock auto-reply after 2s)
    setTimeout(() => {
      const autoReplies = [
        'That\'s interesting! Tell me more.',
        'Haha, I totally get that!',
        'Same! We should grab coffee sometime.',
        'Really? I\'ve been wanting to try that too.',
      ];
      
      const reply: StoredMessage = {
        id: generateId('msg'),
        matchId: conv.matchId,
        senderId: otherParticipant!,
        content: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        type: 'text',
        expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
        isDeleted: false,
        isRead: false,
        createdAt: new Date(),
      };
      
      mockStore.addMessage(reply);
    }, 2000);
    
    return maybeError(message);
  },

  markRead: async (conversationId: string): Promise<{ success: boolean }> => {
    await sleep(200, 400);
    
    const user = mockStore.getUser();
    if (!user) throw new Error('Not authenticated');
    
    mockStore.markMessagesRead(conversationId, user.id);
    return maybeError({ success: true });
  },

  typing: async (conversationId: string, isTyping: boolean): Promise<void> => {
    // No-op in mock, just simulate delay
    await sleep(100, 200);
  },
};

// Reports API
export const reportsApi = {
  submit: async (data: {
    reportedUserId: string;
    reason: string;
    details?: string;
  }): Promise<Report> => {
    await sleep(500, 1000);
    
    const user = mockStore.getUser();
    if (!user) throw new Error('Not authenticated');
    
    const report: Report = {
      id: generateId('report'),
      reporterId: user.id,
      reportedUserId: data.reportedUserId,
      reason: data.reason,
      details: data.details,
      status: 'pending',
      createdAt: new Date(),
    };
    
    mockStore.addReport(report);
    return maybeError(report);
  },

  list: async (): Promise<Report[]> => {
    await sleep(300, 500);
    return maybeError(mockStore.getReports());
  },
};

// Notifications API
export const notificationsApi = {
  list: async (): Promise<NotificationItem[]> => {
    await sleep(200, 400);
    return maybeError(mockStore.getNotifications());
  },

  markAllRead: async (): Promise<{ success: boolean }> => {
    await sleep(200, 400);
    mockStore.markAllNotificationsRead();
    return maybeError({ success: true });
  },
};

// Verification API
export const verificationApi = {
  start: async (): Promise<{ sessionId: string }> => {
    await sleep(500, 800);
    return maybeError({ sessionId: generateId('ver-session') });
  },

  status: async (): Promise<{ status: 'pending' | 'verified' | 'failed' }> => {
    await sleep(300, 500);
    
    const user = mockStore.getUser();
    return maybeError({ status: user?.verification?.status || 'pending' });
  },
};

// Subscription API
export const subscriptionApi = {
  plans: async (): Promise<Array<{
    id: string;
    name: string;
    price: number;
    interval: 'month' | 'year';
    features: string[];
  }>> => {
    await sleep(200, 400);
    
    return maybeError([
      {
        id: 'basic',
        name: 'Free',
        price: 0,
        interval: 'month',
        features: ['Limited swipes per day', 'Standard matching', 'Basic filters'],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 9.99,
        interval: 'month',
        features: ['Unlimited swipes', 'See who liked you', 'Advanced filters', 'Priority support', 'Super Likes'],
      },
      {
        id: 'elite',
        name: 'Elite',
        price: 24.99,
        interval: 'month',
        features: ['Everything in Premium', 'Profile boosts', 'Read receipts', 'Incognito mode', 'VIP badge'],
      },
    ]);
  },

  checkout: async (planId: string): Promise<{ checkoutUrl: string }> => {
    await sleep(500, 800);
    return maybeError({ checkoutUrl: '#' });
  },

  manage: async (): Promise<{ portalUrl: string }> => {
    await sleep(300, 500);
    return maybeError({ portalUrl: '#' });
  },

  status: async (): Promise<{ plan: string; status: string; expiresAt?: Date }> => {
    await sleep(200, 400);
    
    const user = mockStore.getUser();
    return maybeError({
      plan: user?.subscription?.plan || 'basic',
      status: user?.subscription?.status || 'trial',
      expiresAt: user?.subscription?.expiresAt,
    });
  },
};

// Preferences API
export const preferencesApi = {
  get: async (): Promise<{
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    interestedIn: string[];
    showOnFeed: boolean;
    showDistance: boolean;
    showAge: boolean;
    notifications: {
      newMatches: boolean;
      messages: boolean;
      likes: boolean;
      marketing: boolean;
    };
  }> => {
    await sleep(200, 400);
    return maybeError(mockStore.getPreferences());
  },

  update: async (prefs: Partial<{
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    interestedIn: string[];
    showOnFeed: boolean;
    showDistance: boolean;
    showAge: boolean;
    notifications: {
      newMatches: boolean;
      messages: boolean;
      likes: boolean;
      marketing: boolean;
    };
  }>): Promise<{ success: boolean }> => {
    await sleep(300, 500);
    
    const current = mockStore.getPreferences();
    mockStore.setPreferences({ ...current, ...prefs } as any);
    
    return maybeError({ success: true });
  },
};

// Waitlist API
export const waitlistApi = {
  join: async (email: string, featureKey: string): Promise<{ success: boolean }> => {
    await sleep(300, 500);
    
    const entry: WaitlistEntry = {
      email,
      featureKey,
      joinedAt: Date.now(),
    };
    
    mockStore.addToWaitlist(entry);
    return maybeError({ success: true });
  },
};

// Main API export
export const api = {
  auth: authApi,
  profile: profileApi,
  feed: feedApi,
  matches: matchesApi,
  messages: messagesApi,
  reports: reportsApi,
  notifications: notificationsApi,
  verification: verificationApi,
  subscription: subscriptionApi,
  preferences: preferencesApi,
  waitlist: waitlistApi,
};

export default api;
