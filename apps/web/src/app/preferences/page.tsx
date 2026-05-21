'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Check } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
];

export default function PreferencesPage() {
  const [ageMin, setAgeMin] = useState(21);
  const [ageMax, setAgeMax] = useState(38);
  const [maxDistance, setMaxDistance] = useState(50);
  const [interestedIn, setInterestedIn] = useState<string[]>([]);
  const [showOnFeed, setShowOnFeed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    api.preferences.get().then((prefs) => {
      setAgeMin(prefs.ageMin);
      setAgeMax(prefs.ageMax);
      setMaxDistance(prefs.maxDistance);
      setInterestedIn(prefs.interestedIn);
      setShowOnFeed(prefs.showOnFeed);
      setIsLoading(false);
    }).catch(() => setIsLoading(false));
  }, [isAuthenticated]);

  const toggleGender = (value: string) => {
    setInterestedIn((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      await api.preferences.update({ ageMin, ageMax, maxDistance, interestedIn, showOnFeed });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // silent
    } finally {
      setIsSaving(false);
    }
  };

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
          <h1 className="text-lg font-semibold">Discovery Preferences</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-md mx-auto space-y-6">
        {saved && (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
            Preferences saved!
          </div>
        )}

        {/* Age Range */}
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">
          <h2 className="font-semibold text-white">Age Range</h2>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Min</label>
              <input
                type="number"
                value={ageMin}
                onChange={(e) => setAgeMin(Number(e.target.value))}
                min={18}
                max={ageMax}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-center focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>
            <span className="text-gray-500 mt-5">—</span>
            <div className="flex-1">
              <label className="block text-xs text-gray-400 mb-1">Max</label>
              <input
                type="number"
                value={ageMax}
                onChange={(e) => setAgeMax(Number(e.target.value))}
                min={ageMin}
                max={99}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-center focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Distance */}
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Maximum Distance</h2>
            <span className="text-rose-400 font-medium">{maxDistance} mi</span>
          </div>
          <input
            type="range"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            min={1}
            max={100}
            className="w-full accent-rose-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>1 mi</span>
            <span>100 mi</span>
          </div>
        </div>

        {/* Interested In */}
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 space-y-3">
          <h2 className="font-semibold text-white">Interested In</h2>
          <div className="space-y-2">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => toggleGender(opt.value)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-colors ${
                  interestedIn.includes(opt.value)
                    ? 'bg-rose-500/10 border-rose-500/30 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <span>{opt.label}</span>
                {interestedIn.includes(opt.value) && <Check className="w-4 h-4 text-rose-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Show on Feed Toggle */}
        <div className="p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10">
          <button
            onClick={() => setShowOnFeed(!showOnFeed)}
            className="w-full flex items-center justify-between"
          >
            <div>
              <h2 className="font-semibold text-white text-left">Show on Feed</h2>
              <p className="text-sm text-gray-400">Let others discover your profile</p>
            </div>
            <div
              className={`w-12 h-7 rounded-full relative transition-colors ${
                showOnFeed ? 'bg-rose-500' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                  showOnFeed ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}
