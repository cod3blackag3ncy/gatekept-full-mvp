'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Heart, X, Flag, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { VideoPlayer } from '@/components/VideoPlayer';
import { ReportModal } from '@/components/ReportModal';
import { mockStore } from '@/lib/mockStore';

interface ProfileData {
  id: string;
  displayName: string;
  age: number;
  bio: string;
  location: string;
  photos: string[];
  videoUrl?: string;
  interests: string[];
}

export default function ViewProfilePage() {
  const params = useParams();
  const profileId = params.id as string;
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const p = mockStore.getProfileById(profileId);
    if (p) {
      setProfile({
        id: p.id,
        displayName: p.displayName,
        age: p.age,
        bio: p.bio,
        location: p.location,
        photos: p.photos,
        videoUrl: p.videoUrl,
        interests: p.interests,
      });
    }
    setIsLoading(false);
  }, [isAuthenticated, profileId]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <p className="text-gray-400 mb-4">Profile not found</p>
        <button onClick={() => router.back()} className="text-rose-400 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pb-32">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowReport(true)}
            className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            <Flag className="w-4 h-4 text-red-400" />
          </button>
        </div>
      </header>

      {/* Video */}
      {profile.videoUrl && (
        <div className="relative aspect-[3/4] max-w-md mx-auto">
          <VideoPlayer src={profile.videoUrl} isMuted={isMuted} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
      )}

      {/* Photo Gallery */}
      {profile.photos.length > 0 && (
        <div className="px-4 max-w-md mx-auto mt-4">
          <div className={`grid ${profile.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
            {profile.photos.map((photo, i) => (
              <div key={i} className={`rounded-xl overflow-hidden ${i === 0 && profile.photos.length % 2 !== 0 ? 'col-span-2' : ''}`}>
                <img src={photo} alt={`${profile.displayName} photo ${i + 1}`} className="w-full aspect-square object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Info */}
      <div className="px-4 max-w-md mx-auto mt-6 space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {profile.displayName}, {profile.age}
          </h1>
          {profile.location && (
            <div className="flex items-center gap-1 mt-1 text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{profile.location}</span>
            </div>
          )}
        </div>

        {profile.bio && (
          <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
            <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {profile.interests.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white/90 border border-white/10"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-8 px-4">
        <button
          onClick={() => router.back()}
          className="w-16 h-16 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 flex items-center justify-center hover:bg-gray-700/80 transition-all active:scale-95"
        >
          <X className="w-7 h-7 text-gray-400" />
        </button>
        <button
          onClick={() => router.back()}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all active:scale-95"
        >
          <Heart className="w-7 h-7 text-white fill-white" />
        </button>
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
