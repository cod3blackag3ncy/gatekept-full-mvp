'use client';

import { AuthProvider } from '@/hooks/useAuth';
import { AppShell } from '@/components/AppShell';
import { ToastProvider } from '@/components/Toast';
import { AuthGate } from '@/components/AuthGate';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Gatekept" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="bg-black text-white antialiased">
        <ToastProvider>
          <AuthProvider>
            <AuthGate>
              <AppShell>
                {children}
              </AppShell>
            </AuthGate>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
