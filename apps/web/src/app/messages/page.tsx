'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Video, Clock, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { mockStore, type Conversation, type StoredProfile } from '@/lib/mockStore';

interface ConversationDisplay {
  conversation: Conversation;
  profile: StoredProfile;
  lastMessage: string;
  timeLabel: string;
}

function formatTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export default function MessagesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [items, setItems] = useState<ConversationDisplay[]>([]);

  useEffect(() => {
    const conversations = mockStore.getConversations();
    const displays: ConversationDisplay[] = [];

    for (const conv of conversations) {
      const otherId = conv.participants.find(p => p !== 'demo-user' && p !== user?.id) || conv.participants[1];
      const profile = mockStore.getProfileById(otherId);
      if (!profile) continue;

      const messages = mockStore.getMessagesByConversationId(conv.id);
      const last = messages[messages.length - 1];
      const lastMessage = last?.content || 'No messages yet';

      displays.push({
        conversation: conv,
        profile,
        lastMessage,
        timeLabel: formatTime(conv.lastMessageAt),
      });
    }

    displays.sort((a, b) => b.conversation.lastMessageAt - a.conversation.lastMessageAt);
    setItems(displays);
  }, [user]);

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

      <div className="pt-20 pb-8 max-w-md mx-auto">
        {items.length > 0 ? (
          <div className="divide-y divide-white/5">
            {items.map(({ conversation, profile, lastMessage, timeLabel }) => (
              <button
                key={conversation.id}
                onClick={() => router.push(`/messages/${conversation.id}`)}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-white/5 transition-colors text-left"
              >
                {/* Profile Photo */}
                <div className="relative flex-shrink-0">
                  <img
                    src={profile.photos?.[0] || ''}
                    alt={profile.displayName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/10"
                  />
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold">{conversation.unreadCount}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold truncate ${conversation.unreadCount > 0 ? 'text-white' : 'text-gray-300'}`}>
                      {profile.displayName}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{timeLabel}</span>
                  </div>
                  <p className={`text-sm truncate ${conversation.unreadCount > 0 ? 'text-gray-200' : 'text-gray-500'}`}>
                    {lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
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
          </div>
        )}
      </div>
    </div>
  );
}
