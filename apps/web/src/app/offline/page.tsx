'use client';

import { CloudOff, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <CloudOff className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">You&apos;re Offline</h1>
        <p className="text-gray-400 mb-8">
          It looks like you&apos;ve lost your internet connection. Check your network settings and try again.
        </p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
