'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

import { api } from '@/lib/api';

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    api.auth.verifyEmail(params.token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'));
  }, [params.token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-900 via-slate-900 to-black">
      <div className="w-full max-w-sm text-center space-y-6">
        {status === 'loading' && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-rose-400 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white">Verifying your email...</h1>
            <p className="text-gray-400">Just a moment while we confirm your email address.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Email verified! 🎉</h1>
            <p className="text-gray-400">Your email has been confirmed. You can now start using Gatekept.</p>
            
            <button
              onClick={() => router.push('/feed')}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl transition-all"
            >
              Start Exploring
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Verification failed</h1>
            <p className="text-gray-400">The verification link may have expired or is invalid.</p>
            
            <div className="space-y-3">
              <button
                onClick={() => router.push('/login')}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl transition-all"
              >
                Go to Login
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all"
              >
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
