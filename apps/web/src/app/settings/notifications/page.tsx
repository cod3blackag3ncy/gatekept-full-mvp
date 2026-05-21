'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, MessageSquare, Heart, Mail, Save } from 'lucide-react';
import { mockStore } from '@/lib/mockStore';
import { api } from '@/lib/api';

interface NotificationSettings {
  newMatches: boolean;
  messages: boolean;
  likes: boolean;
  marketing: boolean;
}

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

export default function NotificationsSettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<NotificationSettings>({
    newMatches: true,
    messages: true,
    likes: true,
    marketing: false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = mockStore.getPreferences();
    setSettings(prefs.notifications);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.preferences.update({ notifications: settings });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const update = (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Notifications</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto">
        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-4 divide-y divide-white/5">
          <Toggle
            enabled={settings.newMatches}
            onChange={(v) => update('newMatches', v)}
            label="New Matches"
            description="When someone matches with you"
            icon={<Heart className="w-5 h-5 text-rose-400" />}
          />
          <Toggle
            enabled={settings.messages}
            onChange={(v) => update('messages', v)}
            label="Messages"
            description="New messages from matches"
            icon={<MessageSquare className="w-5 h-5 text-blue-400" />}
          />
          <Toggle
            enabled={settings.likes}
            onChange={(v) => update('likes', v)}
            label="Likes"
            description="When someone likes your profile"
            icon={<Bell className="w-5 h-5 text-purple-400" />}
          />
          <Toggle
            enabled={settings.marketing}
            onChange={(v) => update('marketing', v)}
            label="Marketing Emails"
            description="Tips, promotions, and updates"
            icon={<Mail className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all"
        >
          <Save className="w-5 h-5" />
          {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
