'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Crown, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ComingSoon } from '@/components/ComingSoon';
import { api } from '@/lib/api';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
}

const PLAN_ICONS: Record<string, React.ReactNode> = {
  basic: <Zap className="w-6 h-6 text-gray-400" />,
  premium: <Crown className="w-6 h-6 text-yellow-400" />,
  elite: <Sparkles className="w-6 h-6 text-purple-400" />,
};

const PLAN_STYLES: Record<string, { ring: string; badge: string; bg: string }> = {
  basic: { ring: 'border-white/10', badge: 'text-gray-400', bg: 'bg-white/5' },
  premium: { ring: 'border-yellow-500/30', badge: 'text-yellow-400', bg: 'bg-yellow-500/5' },
  elite: { ring: 'border-purple-500/30', badge: 'text-purple-400', bg: 'bg-purple-500/5' },
};

export default function SubscriptionPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlan, setCurrentPlan] = useState('basic');
  const [isLoading, setIsLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    Promise.all([api.subscription.plans(), api.subscription.status()])
      .then(([planList, status]) => {
        setPlans(planList);
        setCurrentPlan(status.plan);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [isAuthenticated]);

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
          <button onClick={() => router.push('/profile')} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Subscription</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-md mx-auto space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            Unlock More
          </h2>
          <p className="text-gray-400 mt-1">Choose the plan that fits your vibe</p>
        </div>

        {plans.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const style = PLAN_STYLES[plan.id] || PLAN_STYLES.basic;

          return (
            <div
              key={plan.id}
              className={`relative rounded-xl border p-5 ${style.bg} backdrop-blur-xl ${
                isCurrent ? 'ring-2 ring-rose-500/50 ' + style.ring : style.ring
              }`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-4 px-3 py-0.5 bg-rose-500 rounded-full text-xs font-medium text-white">
                  Current Plan
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${style.bg} border ${style.ring} flex items-center justify-center`}>
                  {PLAN_ICONS[plan.id]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{plan.name}</h3>
                  <p className="text-sm text-gray-400">
                    {plan.price === 0 ? 'Free forever' : `$${plan.price.toFixed(2)}/mo`}
                  </p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {!isCurrent && plan.price > 0 && (
                <button
                  onClick={() => setShowComingSoon(true)}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all"
                >
                  Subscribe to {plan.name}
                </button>
              )}
              {isCurrent && (
                <div className="w-full py-3 text-center text-gray-500 text-sm">Active</div>
              )}
            </div>
          );
        })}

        {/* Coming Soon Modal */}
        {showComingSoon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm">
              <ComingSoon
                title="Payments Coming Soon"
                description="Subscription payments are not yet available in the MVP. Join the waitlist to be notified when they launch!"
                featureKey="payments"
                eta="Q3 2026"
              />
              <button
                onClick={() => setShowComingSoon(false)}
                className="w-full mt-3 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
