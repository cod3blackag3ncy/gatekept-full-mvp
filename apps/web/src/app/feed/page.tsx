'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Heart, MessageCircle, User, Shield, Volume2, VolumeX, Flag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ReportModal } from '@/components/ReportModal';
import type { FeedProfile } from '@/lib/types';

// Mock feed data with real video URLs
const mockProfiles: FeedProfile[] = [
  {
    id: 'mock-1',
    displayName: 'Sarah',
    age: 26,
    bio: 'Coffee lover and weekend hiker. Looking for someone to explore the city with.',
    location: 'San Francisco, CA',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-track-32812-large.mp4',
    interests: ['coffee', 'hiking', 'photography'],
    distance: 3,
  },
  {
    id: 'mock-2',
    displayName: 'James',
    age: 29,
    bio: 'Software engineer by day, musician by night. Let\'s grab drinks!',
    location: 'Los Angeles, CA',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-playing-guitar-and-singing-1634-large.mp4',
    interests: ['music', 'coding', 'travel'],
    distance: 8,
  },
  {
    id: 'mock-3',
    displayName: 'Emma',
    age: 27,
    bio: 'Art lover, yoga enthusiast, dog mom. Swipe right for good vibes.',
    location: 'New York, NY',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-doing-yoga-stretches-on-the-floor-at-home-4650-large.mp4',
    interests: ['art', 'yoga', 'dogs'],
    distance: 12,
  },
  {
    id: 'mock-4',
    displayName: 'Michael',
    age: 31,
    bio: 'Fitness junkie, amateur chef, adventure seeker.',
    location: 'Austin, TX',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-out-with-dumbbells-at-the-gym-4529-large.mp4',
    interests: ['fitness', 'cooking', 'travel'],
    distance: 5,
  },
  {
    id: 'mock-5',
    displayName: 'Olivia',
    age: 24,
    bio: 'Bookworm, tea drinker, sunset chaser.',
    location: 'Seattle, WA',
    photos: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-reading-a-book-by-the-window-3429-large.mp4',
    interests: ['reading', 'tea', 'hiking'],
    distance: 7,
  },
  {
    id: 'mock-6',
    displayName: 'William',
    age: 30,
    bio: 'Just moved here! Show me around? Love trying new restaurants.',
    location: 'Miami, FL',
    photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-preparing-a-delicious-salad-at-home-4296-large.mp4',
    interests: ['food', 'travel', 'beach'],
    distance: 2,
  },
  {
    id: 'mock-7',
    displayName: 'Ava',
    age: 28,
    bio: 'Dog lover, nature photographer, coffee addict.',
    location: 'Denver, CO',
    photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-playing-with-her-dog-in-a-park-4686-large.mp4',
    interests: ['dogs', 'photography', 'coffee'],
    distance: 15,
  },
  {
    id: 'mock-8',
    displayName: 'Lucas',
    age: 32,
    bio: 'Gamer, tech enthusiast, pizza connoisseur.',
    location: 'Chicago, IL',
    photos: ['https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-gaming-keyboard-4332-large.mp4',
    interests: ['gaming', 'tech', 'food'],
    distance: 10,
  },
];

export default function FeedPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSwipe = useCallback((action: 'pass' | 'connect') => {
    if (currentIndex >= mockProfiles.length) return;
    
    const profile = mockProfiles[currentIndex];
    
    // Animate
    setSwipeDirection(action === 'connect' ? 'right' : 'left');
    
    setTimeout(() => {
      setSwipeDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 300);
  }, [currentIndex]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchEndX.current - touchStartX.current;
    
    if (Math.abs(diff) > 100) {
      handleSwipe(diff > 0 ? 'connect' : 'pass');
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (currentIndex >= mockProfiles.length) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center">
            <Heart className="w-12 h-12 text-rose-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">No more profiles</h2>
          <p className="text-gray-400 max-w-sm">Check back later for more matches in your area</p>
          <button 
            onClick={() => setCurrentIndex(0)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const profile = mockProfiles[currentIndex];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            Gatekept
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/messages')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push('/profile')}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Report button */}
      <button
        onClick={() => setShowReport(true)}
        className="fixed top-20 right-4 z-40 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
      >
        <Flag className="w-3 h-3 inline mr-1" />
        Report
      </button>

      {/* Profile Card */}
      <div 
        className="h-screen flex flex-col relative"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className={`flex-1 relative transition-all duration-300 ${
            swipeDirection === 'left' ? '-translate-x-full opacity-0 rotate-12' : 
            swipeDirection === 'right' ? 'translate-x-full opacity-0 -rotate-12' : ''
          }`}
        >
          {/* Video Background */}
          <div className="absolute inset-0 bg-gray-900">
            {profile.videoUrl ? (
              <VideoPlayer 
                src={profile.videoUrl} 
                isMuted={isMuted}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={profile.photos[0]}
                alt={profile.displayName}
                className="w-full h-full object-cover"
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>

          {/* Mute toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-24 left-4 z-30 p-3 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Profile Info */}
          <div className="absolute bottom-32 left-0 right-0 p-6">
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-4xl font-bold text-white">
                  {profile.displayName}, {profile.age}
                </h2>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">Verified</span>
                </div>
              </div>
              
              <p className="text-gray-200 text-lg mb-2 leading-relaxed">{profile.bio}</p>
              <p className="text-gray-400 text-sm mb-4">{profile.distance} miles away • {profile.location}</p>
              
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span 
                    key={interest}
                    className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90 border border-white/10"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-8 px-4">
            <button
              onClick={() => handleSwipe('pass')}
              className="w-20 h-20 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center hover:bg-gray-700/80 transition-all active:scale-95"
            >
              <X className="w-8 h-8 text-gray-400" />
            </button>
            
            <button
              onClick={() => handleSwipe('connect')}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all active:scale-95"
            >
              <Heart className="w-8 h-8 text-white fill-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Badge */}
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-xs text-rose-400">
        Demo Mode - Sample Video Profiles
      </div>

      {/* Report Modal */}
      {showReport && (
        <ReportModal
          userId={profile.id}
          userName={profile.displayName}
          onClose={() => setShowReport(false)}
        />
      )}
    </div>
  );
}


