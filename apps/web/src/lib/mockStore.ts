// Mock localStorage-backed store for Gatekept
// All data persists to localStorage for demo/testing purposes

import { User, Profile, Match, Message, Report, Notification } from '@/lib/types';

// Types specific to mock store
export interface StoredProfile extends Profile {
  hasLikedYou?: boolean;
}

export interface SwipeAction {
  id: string;
  userId: string;
  targetId: string;
  action: 'pass' | 'connect';
  timestamp: number;
}

export interface Conversation {
  id: string;
  matchId: string;
  participants: string[];
  lastMessageAt: number;
  unreadCount: number;
}

export interface StoredMessage extends Message {
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'match' | 'message' | 'like' | 'system';
  title: string;
  body: string;
  read: boolean;
  createdAt: number;
  data?: Record<string, any>;
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

export interface WaitlistEntry {
  email: string;
  featureKey: string;
  joinedAt: number;
}

// Store keys
const KEYS = {
  CURRENT_USER: 'gk_user',
  PROFILES: 'gk_profiles',
  MATCHES: 'gk_matches',
  SWIPES: 'gk_swipes',
  CONVERSATIONS: 'gk_conversations',
  MESSAGES: 'gk_messages',
  REPORTS: 'gk_reports',
  NOTIFICATIONS: 'gk_notifications',
  WAITLIST: 'gk_waitlist',
  BLOCKED: 'gk_blocked',
  PREFERENCES: 'gk_preferences',
  ONBOARDING_STEP: 'gk_onboarding_step',
  AGE_CONFIRMED: 'gk_age_confirmed',
  SEEDED: 'gk_seeded',
};

// Seed data for profiles
const SEED_PROFILES: StoredProfile[] = [
  {
    id: 'profile-sarah',
    userId: 'user-sarah',
    displayName: 'Sarah',
    bio: 'Coffee lover and weekend hiker. Looking for someone to explore the city with. I make a mean pour-over and know all the best trails.',
    age: 26,
    gender: 'female',
    location: 'San Francisco, CA',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-track-32812-large.mp4',
    interests: ['coffee', 'hiking', 'photography', 'yoga'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: true,
  },
  {
    id: 'profile-james',
    userId: 'user-james',
    displayName: 'James',
    bio: 'Software engineer by day, musician by night. Let\'s grab drinks and talk about code or chords!',
    age: 29,
    gender: 'male',
    location: 'Los Angeles, CA',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-guitar-and-singing-1634-large.mp4',
    interests: ['music', 'coding', 'travel', 'concerts'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-emma',
    userId: 'user-emma',
    displayName: 'Emma',
    bio: 'Art lover, yoga enthusiast, dog mom. Swipe right for good vibes and better conversation.',
    age: 27,
    gender: 'female',
    location: 'New York, NY',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-stretches-on-the-floor-at-home-4650-large.mp4',
    interests: ['art', 'yoga', 'dogs', 'meditation'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: true,
  },
  {
    id: 'profile-michael',
    userId: 'user-michael',
    displayName: 'Michael',
    bio: 'Fitness junkie, amateur chef, adventure seeker. Currently training for my first marathon.',
    age: 31,
    gender: 'male',
    location: 'Austin, TX',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-with-dumbbells-at-the-gym-4529-large.mp4',
    interests: ['fitness', 'cooking', 'travel', 'running'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-olivia',
    userId: 'user-olivia',
    displayName: 'Olivia',
    bio: 'Bookworm, tea drinker, sunset chaser. Looking for someone to read beside and adventure with.',
    age: 24,
    gender: 'female',
    location: 'Seattle, WA',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-reading-a-book-by-the-window-3429-large.mp4',
    interests: ['reading', 'tea', 'hiking', 'photography'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-william',
    userId: 'user-william',
    displayName: 'William',
    bio: 'Just moved here! Show me around? Love trying new restaurants and discovering hidden gems.',
    age: 30,
    gender: 'male',
    location: 'Miami, FL',
    photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-preparing-a-delicious-salad-at-home-4296-large.mp4',
    interests: ['food', 'travel', 'beach', 'cooking'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: true,
  },
  {
    id: 'profile-ava',
    userId: 'user-ava',
    displayName: 'Ava',
    bio: 'Dog lover, nature photographer, coffee addict. My pup and I are a package deal!',
    age: 28,
    gender: 'female',
    location: 'Denver, CO',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-playing-with-her-dog-in-a-park-4686-large.mp4',
    interests: ['dogs', 'photography', 'coffee', 'hiking'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-lucas',
    userId: 'user-lucas',
    displayName: 'Lucas',
    bio: 'Gamer, tech enthusiast, pizza connoisseur. Yes, pineapple belongs on pizza. Fight me.',
    age: 32,
    gender: 'male',
    location: 'Chicago, IL',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-gaming-keyboard-4332-large.mp4',
    interests: ['gaming', 'tech', 'food', 'streaming'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-sophia',
    userId: 'user-sophia',
    displayName: 'Sophia',
    bio: 'Dancer, dreamer, doer. Living life one pirouette at a time. Looking for a partner on and off the dance floor.',
    age: 25,
    gender: 'female',
    location: 'Boston, MA',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-dance-routine-in-a-studio-4201-large.mp4',
    interests: ['dancing', 'fitness', 'music', 'art'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: true,
  },
  {
    id: 'profile-ethan',
    userId: 'user-ethan',
    displayName: 'Ethan',
    bio: 'Architect by profession, sketch artist by passion. Let\'s explore the city\'s best buildings together.',
    age: 33,
    gender: 'male',
    location: 'Portland, OR',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-drawing-on-a-sketchbook-1060-large.mp4',
    interests: ['architecture', 'art', 'travel', 'design'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-mia',
    userId: 'user-mia',
    displayName: 'Mia',
    bio: 'Surfer, scientist, storyteller. Currently getting my PhD in marine biology. Ocean lover through and through.',
    age: 29,
    gender: 'female',
    location: 'San Diego, CA',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-on-the-beach-with-her-surfboard-4222-large.mp4',
    interests: ['surfing', 'science', 'travel', 'ocean'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: false,
  },
  {
    id: 'profile-noah',
    userId: 'user-noah',
    displayName: 'Noah',
    bio: 'Chef with a passion for sustainable cuisine. Farmers market regular. Let me cook you dinner.',
    age: 34,
    gender: 'male',
    location: 'Nashville, TN',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-cutting-vegetables-in-a-kitchen-4286-large.mp4',
    interests: ['cooking', 'food', 'gardening', 'music'],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    hasLikedYou: true,
  },
];

// Seed conversations for demo user
const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    matchId: 'match-1',
    participants: ['demo-user', 'profile-sarah'],
    lastMessageAt: Date.now() - 1000 * 60 * 30, // 30 min ago
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    matchId: 'match-2',
    participants: ['demo-user', 'profile-emma'],
    lastMessageAt: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    matchId: 'match-3',
    participants: ['demo-user', 'profile-william'],
    lastMessageAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    unreadCount: 1,
  },
];

const SEED_MESSAGES: StoredMessage[] = [
  // Conversation with Sarah
  {
    id: 'msg-1',
    matchId: 'match-1',
    senderId: 'profile-sarah',
    content: 'Hey! Love your profile. How\'s your week going?',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'msg-2',
    matchId: 'match-1',
    senderId: 'demo-user',
    content: 'Going great! Just got back from a hike. How about you?',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 40),
  },
  {
    id: 'msg-3',
    matchId: 'match-1',
    senderId: 'profile-sarah',
    content: 'Nice! I\'m planning a hike this weekend. Any trail recommendations?',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: 'msg-4',
    matchId: 'match-1',
    senderId: 'profile-sarah',
    content: 'Also, are you free for coffee sometime?',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 29),
  },
  // Conversation with Emma
  {
    id: 'msg-5',
    matchId: 'match-2',
    senderId: 'profile-emma',
    content: 'Hi there! I noticed we both love art. Have you been to any good galleries lately?',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: 'msg-6',
    matchId: 'match-2',
    senderId: 'demo-user',
    content: 'Yes! Just visited the MoMA last week. It was incredible.',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  // Conversation with William
  {
    id: 'msg-7',
    matchId: 'match-3',
    senderId: 'profile-william',
    content: 'Hey! Welcome to Miami! I\'d love to show you around. What kind of food do you like?',
    type: 'text',
    expiresAt: new Date(Date.now() + 72 * 60 * 60 * 1000),
    isDeleted: false,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25),
  },
];

const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'match',
    title: 'New Match!',
    body: 'You and Sarah liked each other!',
    read: false,
    createdAt: Date.now() - 1000 * 60 * 30,
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New Message',
    body: 'Sarah sent you a message',
    read: false,
    createdAt: Date.now() - 1000 * 60 * 28,
  },
  {
    id: 'notif-3',
    type: 'like',
    title: 'Someone likes you',
    body: 'William liked your profile',
    read: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Welcome to Gatekept',
    body: 'Thanks for joining! Complete your profile to get started.',
    read: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];

const DEFAULT_PREFERENCES: Preferences = {
  ageMin: 21,
  ageMax: 38,
  maxDistance: 50,
  interestedIn: ['male', 'female', 'nonbinary', 'other'],
  showOnFeed: true,
  showDistance: true,
  showAge: true,
  notifications: {
    newMatches: true,
    messages: true,
    likes: true,
    marketing: false,
  },
};

// Store functions
export const mockStore = {
  // Initialize seed data
  init: () => {
    if (typeof window === 'undefined') return;
    
    const alreadySeeded = localStorage.getItem(KEYS.SEEDED);
    if (alreadySeeded) return;

    localStorage.setItem(KEYS.PROFILES, JSON.stringify(SEED_PROFILES));
    localStorage.setItem(KEYS.CONVERSATIONS, JSON.stringify(SEED_CONVERSATIONS));
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(SEED_MESSAGES));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(DEFAULT_PREFERENCES));
    localStorage.setItem(KEYS.MATCHES, JSON.stringify([
      { id: 'match-1', userId: 'demo-user', targetId: 'profile-sarah', action: 'connect', isMutual: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'match-2', userId: 'demo-user', targetId: 'profile-emma', action: 'connect', isMutual: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 'match-3', userId: 'demo-user', targetId: 'profile-william', action: 'connect', isMutual: true, createdAt: new Date(), updatedAt: new Date() },
    ]));
    localStorage.setItem(KEYS.SEEDED, 'true');
  },

  // Clear all data
  clear: () => {
    if (typeof window === 'undefined') return;
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  },

  // User
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: User | null) => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  },

  // Profiles
  getProfiles: (): StoredProfile[] => {
    if (typeof window === 'undefined') return SEED_PROFILES;
    const data = localStorage.getItem(KEYS.PROFILES);
    return data ? JSON.parse(data) : SEED_PROFILES;
  },
  getProfileById: (id: string): StoredProfile | undefined => {
    return mockStore.getProfiles().find(p => p.id === id || p.userId === id);
  },

  // Matches
  getMatches: (): Match[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.MATCHES);
    return data ? JSON.parse(data) : [];
  },
  addMatch: (match: Match) => {
    const matches = mockStore.getMatches();
    matches.push(match);
    localStorage.setItem(KEYS.MATCHES, JSON.stringify(matches));
  },

  // Swipes
  getSwipes: (): SwipeAction[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.SWIPES);
    return data ? JSON.parse(data) : [];
  },
  addSwipe: (swipe: SwipeAction) => {
    const swipes = mockStore.getSwipes();
    swipes.push(swipe);
    localStorage.setItem(KEYS.SWIPES, JSON.stringify(swipes));
  },

  // Conversations
  getConversations: (): Conversation[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.CONVERSATIONS);
    return data ? JSON.parse(data) : [];
  },
  getConversationById: (id: string): Conversation | undefined => {
    return mockStore.getConversations().find(c => c.id === id);
  },
  updateConversation: (id: string, updates: Partial<Conversation>) => {
    const conversations = mockStore.getConversations();
    const idx = conversations.findIndex(c => c.id === id);
    if (idx >= 0) {
      conversations[idx] = { ...conversations[idx], ...updates };
      localStorage.setItem(KEYS.CONVERSATIONS, JSON.stringify(conversations));
    }
  },

  // Messages
  getMessages: (): StoredMessage[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.MESSAGES);
    return data ? JSON.parse(data) : [];
  },
  getMessagesByConversationId: (conversationId: string): StoredMessage[] => {
    const conv = mockStore.getConversationById(conversationId);
    if (!conv) return [];
    return mockStore.getMessages()
      .filter(m => m.matchId === conv.matchId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },
  addMessage: (message: StoredMessage) => {
    const messages = mockStore.getMessages();
    messages.push(message);
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(messages));
    
    // Update conversation last message time
    const conv = mockStore.getConversations().find(c => c.matchId === message.matchId);
    if (conv) {
      mockStore.updateConversation(conv.id, { lastMessageAt: Date.now() });
    }
  },
  markMessagesRead: (conversationId: string, userId: string) => {
    const conv = mockStore.getConversationById(conversationId);
    if (!conv) return;
    
    const messages = mockStore.getMessages();
    const updated = messages.map(m => {
      if (m.matchId === conv.matchId && m.senderId !== userId) {
        return { ...m, isRead: true };
      }
      return m;
    });
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(updated));
    
    // Reset unread count
    mockStore.updateConversation(conversationId, { unreadCount: 0 });
  },

  // Reports
  getReports: (): Report[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.REPORTS);
    return data ? JSON.parse(data) : [];
  },
  addReport: (report: Report) => {
    const reports = mockStore.getReports();
    reports.push(report);
    localStorage.setItem(KEYS.REPORTS, JSON.stringify(reports));
  },

  // Notifications
  getNotifications: (): NotificationItem[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [];
  },
  addNotification: (notification: NotificationItem) => {
    const notifications = mockStore.getNotifications();
    notifications.unshift(notification);
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },
  markAllNotificationsRead: () => {
    const notifications = mockStore.getNotifications().map(n => ({ ...n, read: true }));
    localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  },
  getUnreadNotificationsCount: (): number => {
    return mockStore.getNotifications().filter(n => !n.read).length;
  },

  // Waitlist
  getWaitlist: (): WaitlistEntry[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.WAITLIST);
    return data ? JSON.parse(data) : [];
  },
  addToWaitlist: (entry: WaitlistEntry) => {
    const waitlist = mockStore.getWaitlist();
    if (!waitlist.some(e => e.email === entry.email && e.featureKey === entry.featureKey)) {
      waitlist.push(entry);
      localStorage.setItem(KEYS.WAITLIST, JSON.stringify(waitlist));
    }
  },

  // Blocked users
  getBlockedUsers: (): string[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(KEYS.BLOCKED);
    return data ? JSON.parse(data) : [];
  },
  blockUser: (userId: string) => {
    const blocked = mockStore.getBlockedUsers();
    if (!blocked.includes(userId)) {
      blocked.push(userId);
      localStorage.setItem(KEYS.BLOCKED, JSON.stringify(blocked));
    }
  },
  unblockUser: (userId: string) => {
    const blocked = mockStore.getBlockedUsers();
    const filtered = blocked.filter(id => id !== userId);
    localStorage.setItem(KEYS.BLOCKED, JSON.stringify(filtered));
  },

  // Preferences
  getPreferences: (): Preferences => {
    if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
    const data = localStorage.getItem(KEYS.PREFERENCES);
    return data ? JSON.parse(data) : DEFAULT_PREFERENCES;
  },
  setPreferences: (prefs: Preferences) => {
    localStorage.setItem(KEYS.PREFERENCES, JSON.stringify(prefs));
  },

  // Onboarding step
  getOnboardingStep: (): number => {
    if (typeof window === 'undefined') return 1;
    const data = localStorage.getItem(KEYS.ONBOARDING_STEP);
    return data ? parseInt(data, 10) : 1;
  },
  setOnboardingStep: (step: number) => {
    localStorage.setItem(KEYS.ONBOARDING_STEP, step.toString());
  },

  // Age confirmed
  getAgeConfirmed: (): boolean => {
    if (typeof window === 'undefined') return false;
    const data = localStorage.getItem(KEYS.AGE_CONFIRMED);
    return data === 'true';
  },
  setAgeConfirmed: (confirmed: boolean) => {
    localStorage.setItem(KEYS.AGE_CONFIRMED, confirmed ? 'true' : 'false');
  },
};

// Initialize on import (client-side only)
if (typeof window !== 'undefined') {
  mockStore.init();
}

export default mockStore;
