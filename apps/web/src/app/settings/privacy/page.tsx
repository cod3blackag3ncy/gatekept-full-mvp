'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, MapPin, Calendar, Save, Trash2 } from 'lucide-react';
import { mockStore } from '@/lib/mockStore';
import { api } from '@/lib/api';
import { ComingSoon } from '@/components/ComingSoon';

function Toggle({ enabled, onChange, label, description, icon }: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5">
          {icon}
        </div>
        <div>
          <p className="font-medium text-white">{label}</p>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative w-12 h-7 rounded-full transition-colors ${
          enabled ? 'bg-rose-500' : 'bg-white/10'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export default function PrivacySettingsPage() {
  const router = useRouter();
  const [showOnFeed, setShowOnFeed] = useState(true);
  const [showDistance, setShowDistance] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = mockStore.getPreferences();
    setShowOnFeed(prefs.showOnFeed);
    setShowDistance(prefs.showDistance);
    setShowAge(prefs.showAge);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.preferences.update({ showOnFeed, showDistance, showAge });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    alert('Account deletion requires email confirmation. This feature will send a confirmation link to your registered email.');
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Privacy</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto space-y-6">
        {/* Visibility Settings */}
        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 divide-y divide-white/5">
          <Toggle
            enabled={showOnFeed}
            onChange={(v) => { setShowOnFeed(v); setSaved(false); }}
            label="Show on Feed"
            description="Let others discover your profile"
            icon={<Eye className="w-5 h-5 text-rose-400" />}
          />
          <Toggle
            enabled={showDistance}
            onChange={(v) => { setShowDistance(v); setSaved(false); }}
            label="Show Distance"
            description="Display how far away you are"
            icon={<MapPin className="w-5 h-5 text-blue-400" />}
          />
          <Toggle
            enabled={showAge}
            onChange={(v) => { setShowAge(v); setSaved(false); }}
            label="Show Age"
            description="Display your age on your profile"
            icon={<Calendar className="w-5 h-5 text-purple-400" />}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
        </button>

        {/* Data Export */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Data Export</h2>
          <ComingSoon featureKey="data-export" />
        </div>

        {/* Delete Account */}
        <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-4">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium rounded-xl transition-colors"
          >
            <Trash2 className="w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
