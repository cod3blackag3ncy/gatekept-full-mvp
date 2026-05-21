'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { EmptyState } from '@/components/EmptyState';
import { mockStore } from '@/lib/mockStore';

interface MatchCard {
  matchId: string;
  conversationId?: string;
  profileId: string;
  displayName: string;
  age: number;
  photo: string;
  isNew: boolean;
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const allMatches = mockStore.getMatches();
    const conversations = mockStore.getConversations();

    const cards: MatchCard[] = allMatches.map((m) => {
      const otherId = m.userId === user?.id ? m.targetId : m.userId;
      const profile = mockStore.getProfileById(otherId);
      const conv = conversations.find(
        (c) => c.matchId === m.id
      );
      const createdTime = new Date(m.createdAt).getTime();
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

      return {
        matchId: m.id,
        conversationId: conv?.id,
        profileId: profile?.id || otherId,
        displayName: profile?.displayName || 'Unknown',
        age: profile?.age || 0,
        photo: profile?.photos?.[0] || '',
        isNew: createdTime > oneDayAgo,
      };
    });

    setMatches(cards);
    setIsLoading(false);
  }, [isAuthenticated, user]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const newMatches = matches.filter((m) => m.isNew);
  const olderMatches = matches.filter((m) => !m.isNew);

  const handleMatchClick = (match: MatchCard) => {
    if (match.conversationId) {
      router.push(`/messages/${match.conversationId}`);
    } else {
      router.push('/messages');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.push('/feed')} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Matches</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-md mx-auto">
        {matches.length === 0 ? (
          <div className="mt-20">
            <EmptyState
              icon={Heart}
              title="No matches yet"
              description="Keep swiping on the feed to find your perfect match!"
              action={{ label: 'Go to Feed', onClick: () => router.push('/feed') }}
            />
          </div>
        ) : (
          <>
            {/* New Matches */}
            {newMatches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider">
                    New Matches
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {newMatches.map((match) => (
                    <button
                      key={match.matchId}
                      onClick={() => handleMatchClick(match)}
                      className="relative rounded-xl overflow-hidden aspect-[3/4] group"
                    >
                      <img
                        src={match.photo}
                        alt={match.displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-semibold text-left">
                          {match.displayName}, {match.age}
                        </p>
                      </div>
                      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-rose-500 ring-2 ring-black" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Older Matches */}
            {olderMatches.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Matches
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {olderMatches.map((match) => (
                    <button
                      key={match.matchId}
                      onClick={() => handleMatchClick(match)}
                      className="relative rounded-xl overflow-hidden aspect-[3/4] group"
                    >
                      <img
                        src={match.photo}
                        alt={match.displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-semibold text-left">
                          {match.displayName}, {match.age}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
