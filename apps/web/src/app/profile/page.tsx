'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Camera, CheckCircle, Crown } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);

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
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          <button 
            onClick={() => setIsRecording(!isRecording)}
            className="absolute bottom-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>
          
          {/* Verification Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-400 font-medium">Verified</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Demo User, 28</h2>
              <p className="text-gray-400">San Francisco, CA</p>
            </div>
            
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-xs text-yellow-400 font-medium">Premium</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-gray-300">This is a demo account for testing the Gatekept video dating experience.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {['hiking', 'photography', 'coffee', 'travel'].map((interest) => (
              <span 
                key={interest}
                className="px-4 py-2 rounded-full bg-white/10 text-sm"
              >
                {interest}
              </span>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
              Edit Profile
            </button>
            
            <button className="w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors">
              Settings
            </button>
            
            <button className="w-full py-3.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-xl font-medium transition-colors">
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Demo Mode - Full profile editing coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
