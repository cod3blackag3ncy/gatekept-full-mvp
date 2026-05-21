'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Heart, MessageCircle, User, Flame, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { mockStore } from '@/lib/mockStore';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const unreadCount = mockStore.getUnreadNotificationsCount();

  const navItems = [
    { icon: Flame, label: 'Feed', href: '/feed' },
    { icon: Heart, label: 'Matches', href: '/matches' },
    { icon: MessageCircle, label: 'Messages', href: '/messages' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  const isActive = (href: string) => {
    if (href === '/feed') return pathname === '/feed' || pathname === '/';
    return pathname.startsWith(href);
  };

  // Don't show shell on auth pages
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname?.includes('/reset-password') || pathname?.includes('/verify-email');
  const isOnboarding = pathname?.includes('/onboarding');
  const isLanding = pathname === '/';
  
  if (isAuthPage || isOnboarding || isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <button 
            onClick={() => router.push('/feed')}
            className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent"
          >
            Gatekept
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/notifications')}
              className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gray-300" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] font-medium flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => router.push('/profile')}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 overflow-hidden border border-white/10"
              aria-label="My Profile"
            >
              {user?.profile?.photos?.[0] ? (
                <img 
                  src={user.profile.photos[0]} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                  {user?.profile?.displayName?.[0] || 'U'}
                </div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14 pb-20">
        {children}
      </main>

      {/* Bottom Tab Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/5 pb-safe">
        <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  active 
                    ? 'text-rose-400' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                aria-label={item.label}
              >
                <item.icon className={`w-6 h-6 ${active ? 'fill-current' : ''}`} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
