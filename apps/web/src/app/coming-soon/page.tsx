'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { getAllComingSoonFeatures } from '@/lib/comingSoon';

export default function ComingSoonPage() {
  const router = useRouter();
  const features = getAllComingSoonFeatures();

  // Group by ETA quarter
  const grouped = features.reduce<Record<string, typeof features>>((acc, feature) => {
    const quarter = feature.eta;
    if (!acc[quarter]) acc[quarter] = [];
    acc[quarter].push(feature);
    return acc;
  }, {});

  const sortedQuarters = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Roadmap</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-600/20 border border-rose-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">What&apos;s Coming</h2>
          <p className="text-gray-400">
            Features we&apos;re building to make Gatekept even better.
          </p>
        </div>

        <div className="space-y-8">
          {sortedQuarters.map((quarter) => (
            <div key={quarter}>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-rose-400" />
                <h3 className="text-lg font-semibold text-rose-400">{quarter}</h3>
              </div>
              <div className="grid gap-3">
                {grouped[quarter].map((feature) => (
                  <div
                    key={feature.key}
                    className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-white mb-1">
                          {feature.key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </h4>
                        {feature.description && (
                          <p className="text-sm text-gray-400 mb-2">{feature.description}</p>
                        )}
                        <p className="text-xs text-gray-500">{feature.why}</p>
                      </div>
                      <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400">
                        {feature.eta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
