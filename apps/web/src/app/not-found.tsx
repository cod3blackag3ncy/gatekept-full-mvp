'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-500/20 flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-rose-400" />
      </div>

      <h1 className="text-3xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-gray-400 text-center max-w-xs mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link
        href="/feed"
        className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 font-semibold text-white hover:opacity-90 transition-opacity"
      >
        Back to Feed
      </Link>
    </div>
  );
}
