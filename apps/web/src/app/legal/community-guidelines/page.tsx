'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, UserCheck, Heart, ShieldAlert, Camera, Flag, Gavel } from 'lucide-react';

const guidelines = [
  {
    icon: <UserCheck className="w-6 h-6 text-green-400" />,
    title: 'Be Authentic',
    points: [
      'Use your real name and recent photos that clearly show your face',
      'Be honest about your age, interests, and intentions',
      'Don\'t create fake or misleading profiles',
      'Don\'t impersonate another person or use someone else\'s photos',
      'Your video introduction should be genuinely you — no filters that alter your appearance',
    ],
  },
  {
    icon: <Heart className="w-6 h-6 text-rose-400" />,
    title: 'Respect Others',
    points: [
      'Treat everyone with dignity and respect, even if you\'re not interested',
      'Be mindful of different backgrounds, cultures, and perspectives',
      'Respect boundaries — if someone says no, accept it gracefully',
      'Don\'t pressure anyone into sharing personal information or meeting up',
      'Be kind in how you decline or unmatch — ghosting hurts',
    ],
  },
  {
    icon: <ShieldAlert className="w-6 h-6 text-amber-400" />,
    title: 'No Harassment',
    points: [
      'Zero tolerance for threats, hate speech, or discriminatory language',
      'Don\'t send unsolicited sexual or explicit content',
      'Don\'t stalk, intimidate, or repeatedly contact someone who has blocked you',
      'Don\'t share private conversations or screenshots without consent',
      'Bullying, body-shaming, and derogatory comments will result in a ban',
    ],
  },
  {
    icon: <Camera className="w-6 h-6 text-blue-400" />,
    title: 'Photo & Video Rules',
    points: [
      'All photos and videos must be of you (not celebrities, memes, or other people)',
      'No nudity, sexually explicit content, or graphic violence',
      'No photos of minors (even your own children) for privacy and safety reasons',
      'No images promoting drugs, weapons, or illegal activities',
      'No commercial or promotional content',
    ],
  },
  {
    icon: <Flag className="w-6 h-6 text-purple-400" />,
    title: 'Reporting',
    points: [
      'Report any profiles or behavior that violates these guidelines',
      'Reports are confidential — the reported user won\'t know who reported them',
      'Our Trust & Safety team reviews every report within 24 hours',
      'False reporting to harass other users is itself a violation',
      'If you\'re in immediate danger, contact local emergency services first',
    ],
  },
  {
    icon: <Gavel className="w-6 h-6 text-red-400" />,
    title: 'Consequences',
    points: [
      'Violations may result in warnings, temporary suspensions, or permanent bans',
      'Severe violations (threats, harassment, exploitation) result in immediate permanent bans',
      'Banned users may not create new accounts',
      'We cooperate with law enforcement when required',
      'Appeals can be submitted to appeals@gatekept.app within 30 days',
    ],
  },
];

export default function CommunityGuidelinesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Community Guidelines</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Our Community Standards</h2>
          <p className="text-gray-400">
            Gatekept is built on authenticity, respect, and safety. These guidelines help keep our community a great place to connect.
          </p>
        </div>

        <div className="space-y-6">
          {guidelines.map((section) => (
            <div
              key={section.title}
              className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white/5">{section.icon}</div>
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </div>
              <ul className="space-y-3">
                {section.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-rose-400 mt-1">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          Last updated: January 2026
        </div>
      </div>
    </div>
  );
}
