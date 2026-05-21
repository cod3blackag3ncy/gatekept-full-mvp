'use client';

import { useRouter } from 'next/navigation';
import { Video, Clock, Send } from 'lucide-react';

export default function MessagesPage() {
  const router = useRouter();

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
          <h1 className="text-lg font-semibold">Messages</h1>
          <div className="w-8" />
        </div>
      </header>

      {/* Empty State */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-20">
        <div className="w-24 h-24 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
          <Video className="w-12 h-12 text-rose-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Video-Only Chat</h2>
        
        <p className="text-gray-400 text-center max-w-xs mb-8">
          No text messages here. Record short video clips to connect with your matches.
        </p>
        
        <div className="w-full max-w-sm space-y-3">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <Clock className="w-5 h-5 text-rose-500" />
            <div>
              <p className="text-sm font-medium">72-Hour Messages</p>
              <p className="text-xs text-gray-400">Videos auto-delete after 3 days</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <Send className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Native Camera Only</p>
              <p className="text-xs text-gray-400">No gallery uploads allowed</p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-gray-500 text-sm">
          Demo Mode - Messaging coming soon
        </p>
      </div>
    </div>
  );
}
