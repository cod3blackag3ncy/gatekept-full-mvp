'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { mockStore } from '@/lib/mockStore';

interface AuthGateProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

// Public routes that don't require auth
const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email', '/coming-soon', '/legal', '/safety', '/help', '/offline'];
const publicPrefixes = ['/reset-password/', '/verify-email/', '/legal/'];

export function AuthGate({ children, requireOnboarding = true }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Check if current route is public
    const isPublic = publicRoutes.includes(pathname) || 
      publicPrefixes.some(prefix => pathname?.startsWith(prefix));

    if (!isAuthenticated && !isPublic) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && requireOnboarding) {
      const onboardingStep = mockStore.getOnboardingStep();
      const user = mockStore.getUser();
      const onboardingComplete = user?.profile?.videoUrl && user.profile?.bio;
      
      if (!onboardingComplete && pathname !== '/onboarding') {
        router.push('/onboarding');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router, requireOnboarding]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If not authenticated and not on public route, show nothing (redirecting)
  const isPublic = publicRoutes.includes(pathname) || 
    publicPrefixes.some(prefix => pathname?.startsWith(prefix));
  
  if (!isAuthenticated && !isPublic) {
    return null;
  }

  return <>{children}</>;
}
