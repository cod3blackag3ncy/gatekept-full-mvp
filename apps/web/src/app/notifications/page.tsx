'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart, MessageCircle, Star, Bell, CheckCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { EmptyState } from '@/components/EmptyState';
import { api } from '@/lib/api';

interface NotificationItem {
  id: string;
  type: 'match' | 'message' | 'like' | 'system';
  title: string;
  body: string;
  read: boolean;
  createdAt: number;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  match: <Heart className="w-5 h-5 text-rose-400" />,
  message: <MessageCircle className="w-5 h-5 text-blue-400" />,
  like: <Star className="w-5 h-5 text-yellow-400" />,
  system: <Bell className="w-5 h-5 text-gray-400" />,
};

const TYPE_BG: Record<string, string> = {
  match: 'bg-rose-500/10',
  message: 'bg-blue-500/10',
  like: 'bg-yellow-500/10',
  system: 'bg-white/5',
};

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    api.notifications.list().then((items) => {
      setNotifications(items);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [isAuthenticated]);

  const handleMarkAllRead = async () => {
    await api.notifications.markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.push('/feed')} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Notifications</h1>
          {unreadCount > 0 ? (
            <button
              onClick={handleMarkAllRead}
              className="text-rose-400 hover:text-rose-300 text-xs font-medium flex items-center gap-1"
            >
              <CheckCheck className="w-4 h-4" />
              Read all
            </button>
          ) : (
            <div className="w-14" />
          )}
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-md mx-auto">
        {notifications.length === 0 ? (
          <div className="mt-20">
            <EmptyState
              icon={Bell}
              title="No notifications"
              description="You're all caught up! New notifications will appear here."
            />
          </div>
        ) : (
          <div className="space-y-2">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`relative flex items-start gap-3 p-4 rounded-xl border transition-colors ${
                  notif.read
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/[0.08] border-white/15'
                }`}
              >
                {/* Unread dot */}
                {!notif.read && (
                  <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-rose-500" />
                )}

                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${TYPE_BG[notif.type]} flex items-center justify-center`}>
                  {TYPE_ICONS[notif.type]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-4">
                  <p className={`text-sm font-medium ${notif.read ? 'text-gray-300' : 'text-white'}`}>
                    {notif.title}
                  </p>
                  <p className="text-sm text-gray-400 mt-0.5">{notif.body}</p>
                  <p className="text-xs text-gray-500 mt-1">{timeAgo(notif.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
