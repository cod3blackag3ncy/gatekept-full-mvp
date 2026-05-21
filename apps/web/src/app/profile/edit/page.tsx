'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

export default function EditProfilePage() {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState('other');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user, isAuthenticated, isLoading: authLoading, refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user?.profile) {
      setDisplayName(user.profile.displayName || '');
      setBio(user.profile.bio || '');
      setAge(user.profile.age || 25);
      setGender(user.profile.gender || 'other');
      setLocation(user.profile.location || '');
      setPhotos(user.profile.photos || []);
    }
  }, [user]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      await api.profile.update({ displayName, bio, age, gender: gender as any, location, photos });
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // silent
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const photoSlots = Array.from({ length: 6 }, (_, i) => photos[i] || null);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.push('/profile')} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Edit Profile</h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="text-rose-400 hover:text-rose-300 disabled:opacity-50 font-medium text-sm"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save'}
          </button>
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-md mx-auto space-y-6">
        {saved && (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm text-center">
            Profile saved successfully!
          </div>
        )}

        {/* Photo Grid */}
        <div>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Photos</h2>
          <div className="grid grid-cols-3 gap-2">
            {photoSlots.map((photo, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
              >
                {photo ? (
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-6 h-6 text-gray-600" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Tap to add or change photos (demo)</p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={300}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors resize-none"
              placeholder="Tell people about yourself..."
            />
            <p className="text-xs text-gray-500 mt-1">{bio.length}/300</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min={18}
                max={99}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-rose-500/50 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-rose-500/50 transition-colors appearance-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </div>
  );
}
