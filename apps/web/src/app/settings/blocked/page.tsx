'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, UserX, ShieldOff } from 'lucide-react';
import { mockStore } from '@/lib/mockStore';

interface BlockedUser {
  id: string;
  name: string;
}

export default function BlockedUsersPage() {
  const router = useRouter();
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);

  useEffect(() => {
    loadBlocked();
  }, []);

  const loadBlocked = () => {
    const ids = mockStore.getBlockedUsers();
    const users = ids.map(id => {
      const profile = mockStore.getProfileById(id);
      return { id, name: profile?.displayName || `User ${id.slice(0, 8)}` };
    });
    setBlockedUsers(users);
  };

  const handleUnblock = (userId: string) => {
    mockStore.unblockUser(userId);
    loadBlocked();
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Blocked Users</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto">
        {blockedUsers.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
              <ShieldOff className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No Blocked Users</h2>
            <p className="text-gray-400">
              You haven&apos;t blocked anyone yet. Blocked users won&apos;t be able to see your profile or message you.
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 divide-y divide-white/5">
            {blockedUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <UserX className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="font-medium text-white">{user.name}</span>
                </div>
                <button
                  onClick={() => handleUnblock(user.id)}
                  className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
