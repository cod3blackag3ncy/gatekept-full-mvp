'use client';

import { useState } from 'react';
import { Sparkles, Mail, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getComingSoonFeature } from '@/lib/comingSoon';
import { api } from '@/lib/api';

interface ComingSoonProps {
  title?: string;
  description?: string;
  featureKey: string;
  icon?: React.ReactNode;
  showEmailCapture?: boolean;
  eta?: string;
}

export function ComingSoon({
  title,
  description,
  featureKey,
  icon,
  showEmailCapture = true,
  eta,
}: ComingSoonProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const feature = getComingSoonFeature(featureKey);
  const displayEta = eta || feature?.eta || 'Coming soon';
  const displayTitle = title || 'Coming Soon';
  const displayDescription = description || feature?.description || feature?.why || 'This feature is under development.';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    
    try {
      await api.waitlist.join(email, featureKey);
      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8">
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl opacity-50">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/20 via-purple-500/20 to-rose-500/20 animate-pulse" />
      </div>
      
      <div className="relative">
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-purple-500/20 border border-rose-500/20">
          {icon || <Sparkles className="w-8 h-8 text-rose-400" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center text-white mb-2">
          {displayTitle}
        </h3>

        {/* ETA Badge */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-sm text-rose-400">
            <Clock className="w-3.5 h-3.5" />
            ETA: {displayEta}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-center mb-6">
          {displayDescription}
        </p>

        {/* Reason */}
        {feature?.why && feature.why !== displayDescription && (
          <div className="flex items-start gap-2 mb-6 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-200">{feature.why}</p>
          </div>
        )}

        {/* Email Capture */}
        {showEmailCapture && !isSubmitted && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>
            
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
            >
              {isLoading ? 'Joining...' : 'Notify Me When Ready'}
            </button>
          </form>
        )}

        {/* Success State */}
        {isSubmitted && (
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <p className="text-green-400 font-medium">You&apos;re on the list! 🎉</p>
            <p className="text-sm text-gray-500 mt-1">We&apos;ll email you when this feature launches.</p>
          </div>
        )}
      </div>
    </div>
  );
}
