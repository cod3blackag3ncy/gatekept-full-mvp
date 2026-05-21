'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { api } from '@/lib/api';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.auth.requestPasswordReset(email);
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-rose-900 via-slate-900 to-black">
      <div className="w-full max-w-sm space-y-8">
        {/* Back button */}
        <button
          onClick={() => router.push('/login')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </button>

        {isSubmitted ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white">Check your email</h1>
            
            <p className="text-gray-400">
              If an account exists for {email}, we&apos;ve sent a link to reset your password.
            </p>

            <button
              onClick={() => router.push('/login')}
              className="w-full py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors"
            >
              Return to login
            </button>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 flex items-center justify-center">
                <Mail className="w-8 h-8 text-rose-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Reset your password</h1>
              <p className="text-gray-400">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50"
              />

              {error && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
