import type { User, Profile, Verification, Subscription, Match, Message } from '@gatekept/shared';

// In-memory storage for mock mode
const users = new Map<string, User>();
const profiles = new Map<string, Profile>();
const verifications = new Map<string, Verification>();
const subscriptions = new Map<string, Subscription>();
const matches = new Map<string, Match>();
const messages = new Map<string, Message>();

// Generate demo profiles
const interests = [
  'hiking', 'photography', 'coffee', 'travel', 'cooking', 'yoga', 'music',
  'art', 'sports', 'reading', 'movies', 'gaming', 'fitness', 'dogs', 'cats'
];

const bios = [
  'Adventure seeker looking for someone to explore the world with.',
  'Coffee enthusiast and amateur photographer. Let\'s grab a drink!',
  'Dog lover, hiker, and part-time chef. Swipe right for good vibes.',
  'Just moved here and looking to meet new people. Show me around?',
  'Musician by night, software engineer by day.',
  'Beach lover, sunset chaser, wine drinker.',
  'Looking for someone to binge-watch shows with.',
  'Fitness is my passion, but so is pizza.',
];

const locations = [
  'San Francisco, CA', 'Los Angeles, CA', 'New York, NY', 'Chicago, IL',
  'Austin, TX', 'Seattle, WA', 'Denver, CO', 'Miami, FL'
];

const names = [
  { name: 'Sarah', gender: 'female' },
  { name: 'Emma', gender: 'female' },
  { name: 'Olivia', gender: 'female' },
  { name: 'Ava', gender: 'female' },
  { name: 'Sophia', gender: 'female' },
  { name: 'James', gender: 'male' },
  { name: 'William', gender: 'male' },
  { name: 'Benjamin', gender: 'male' },
  { name: 'Lucas', gender: 'male' },
  { name: 'Henry', gender: 'male' },
];

export function generateMockProfiles(count: number = 20): Profile[] {
  const mockProfiles: Profile[] = [];
  
  for (let i = 0; i < count; i++) {
    const nameData = names[i % names.length];
    const age = Math.floor(Math.random() * 15) + 23; // 23-38
    const profileId = `mock-profile-${i}`;
    const userId = `mock-user-${i}`;
    
    const profile: Profile = {
      id: profileId,
      userId,
      displayName: nameData.name,
      bio: bios[i % bios.length],
      age,
      gender: nameData.gender as any,
      location: locations[i % locations.length],
      photos: [`https://i.pravatar.cc/400?img=${i + 10}`],
      videoUrl: `https://player.vimeo.com/external/371844854.sd.mp4?s=253f0b0438469841191f1645&f=1`,
      interests: interests.slice(i % 5, (i % 5) + 5),
      isActive: true,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    };
    
    profiles.set(profileId, profile);
    mockProfiles.push(profile);
    
    // Create associated user
    const user: User = {
      id: userId,
      email: `${nameData.name.toLowerCase()}${i}@mock.com`,
      passwordHash: '',
      createdAt: profile.createdAt,
      updatedAt: new Date(),
      profile,
      verification: {
        id: `mock-verification-${i}`,
        userId,
        status: 'verified',
        provider: 'mock',
        providerId: `mock-verification-${i}`,
        verifiedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      subscription: {
        id: `mock-subscription-${i}`,
        userId,
        status: 'active',
        plan: 'premium',
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    };
    
    users.set(userId, user);
  }
  
  return mockProfiles;
}

export function getMockUsers() {
  return Array.from(users.values());
}

export function getMockProfiles() {
  return Array.from(profiles.values());
}

export function getMockUserById(id: string): User | null {
  return users.get(id) || null;
}

export function getMockUserByEmail(email: string): User | null {
  return Array.from(users.values()).find(u => u.email === email) || null;
}

export function addMockUser(user: User) {
  users.set(user.id, user);
  if (user.profile) {
    profiles.set(user.profile.id, user.profile);
  }
  if (user.verification) {
    verifications.set(user.verification.id, user.verification);
  }
  if (user.subscription) {
    subscriptions.set(user.subscription.id, user.subscription);
  }
}

export function updateMockUser(userId: string, data: Partial<User>) {
  const user = users.get(userId);
  if (user) {
    Object.assign(user, data, { updatedAt: new Date() });
    users.set(userId, user);
  }
  return user;
}

export function updateMockProfile(userId: string, data: Partial<Profile>) {
  const profile = Array.from(profiles.values()).find(p => p.userId === userId);
  if (profile) {
    Object.assign(profile, data, { updatedAt: new Date() });
    profiles.set(profile.id, profile);
    
    // Update user's profile reference
    const user = users.get(userId);
    if (user) {
      user.profile = profile;
      users.set(userId, user);
    }
  }
  return profile;
}

export function getMockMatches(userId: string): Match[] {
  return Array.from(matches.values()).filter(m => 
    m.userId === userId || m.targetId === userId
  );
}

export function addMockMatch(match: Match) {
  matches.set(match.id, match);
}

export function getMockMessages(matchId: string): Message[] {
  return Array.from(messages.values())
    .filter(m => m.matchId === matchId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function addMockMessage(message: Message) {
  messages.set(message.id, message);
}

export function deleteMockMessage(messageId: string) {
  messages.delete(messageId);
}

// Initialize with demo profiles
generateMockProfiles(20);
