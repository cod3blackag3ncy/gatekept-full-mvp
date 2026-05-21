'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, CheckCircle, Crown, ChevronRight, Bell, Shield, Ban, SlidersHorizontal, CreditCard, LifeBuoy, Heart, LogOut, Settings, Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const profile = user?.profile;
  const isVerified = user?.verification?.status === 'verified';
  const isPremium = user?.subscription?.plan === 'premium';

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const settingsLinks = [
    { label: 'Notifications', href: '/settings/notifications', icon: Bell },
    { label: 'Privacy', href: '/settings/privacy', icon: Shield },
    { label: 'Blocked Users', href: '/settings/blocked', icon: Ban },
    { label: 'Preferences', href: '/preferences', icon: SlidersHorizontal },
    { label: 'Subscription', href: '/subscription', icon: CreditCard },
    { label: 'Safety', href: '/safety', icon: Heart },
    { label: 'Help & Support', href: '/help', icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button
            onClick={() => router.push('/feed')}
            className="text-gray-400 hover:text-white"
          >
            ← Back
          </button>
          <h1 className="text-lg font-semibold">My Profile</h1>
          <div className="w-8" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-md mx-auto">
        {/* Profile Video */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6">
          {profile?.videoUrl ? (
            <video
              src={profile.videoUrl}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : profile?.photos?.[0] ? (
            <img src={profile.photos[0]} alt={profile.displayName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-600" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <button
            onClick={() => setIsRecording(!isRecording)}
            className="absolute bottom-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>

          {/* Verification Badge */}
          {isVerified && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-400 font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {profile?.displayName || 'User'}{profile?.age ? `, ${profile.age}` : ''}
              </h2>
              {profile?.location && (
                <p className="text-gray-400">{profile.location}</p>
              )}
            </div>

            {isPremium && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-medium">Premium</span>
              </div>
            )}
          </div>

          {profile?.bio && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-gray-300">{profile.bio}</p>
            </div>
          )}

          {profile?.interests && profile.interests.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-white/10 text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}

          {/* Photos grid */}
          {profile?.photos && profile.photos.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {profile.photos.map((photo, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={photo} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 space-y-3">
            <button
              onClick={() => router.push('/profile/edit')}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>

            {/* Settings section */}
            {showSettings && (
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden divide-y divide-white/5">
                {settingsLinks.map(({ label, href, icon: Icon }) => (
                  <button
                    key={href}
                    onClick={() => router.push(href)}
                    className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-rose-400" />
                      <span className="text-sm">{label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full py-3.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
