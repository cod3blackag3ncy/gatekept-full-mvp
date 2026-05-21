'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield, UserCheck, AlertTriangle, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const sections = [
  {
    icon: <UserCheck className="w-6 h-6 text-green-400" />,
    title: 'Meeting Safely',
    tips: [
      'Always meet in a public place for the first few dates',
      'Tell a friend or family member where you\'re going and who you\'re meeting',
      'Arrange your own transportation to and from the date',
      'Don\'t feel pressured to go somewhere private',
      'Trust your instincts — if something feels off, leave',
      'Video chat before meeting in person to verify identity',
    ],
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    title: 'Protecting Your Info',
    tips: [
      'Don\'t share your full name, address, or workplace right away',
      'Keep financial information private — never send money to someone you haven\'t met',
      'Use the in-app messaging before sharing your phone number',
      'Be cautious of anyone who asks too many personal questions too quickly',
      'Watch for signs of catfishing: blurry photos, avoids video calls, too-good-to-be-true stories',
    ],
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-amber-400" />,
    title: 'Reporting Issues',
    tips: [
      'Report anyone who makes you feel uncomfortable or unsafe',
      'Block users who harass, threaten, or send inappropriate content',
      'Screenshot concerning messages before reporting',
      'Our team reviews all reports within 24 hours',
      'Reports are confidential — the other person won\'t know who reported them',
    ],
  },
  {
    icon: <Phone className="w-6 h-6 text-rose-400" />,
    title: 'Emergency Resources',
    tips: [
      'Emergency Services: 911',
      'National Domestic Violence Hotline: 1-800-799-7233',
      'Crisis Text Line: Text HOME to 741741',
      'RAINN Sexual Assault Hotline: 1-800-656-4673',
      'If you\'re in immediate danger, call 911 first',
    ],
  },
];

export default function SafetyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Safety Tips</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-600/20 border border-rose-500/20 mb-4">
            <Shield className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Safety Matters</h2>
          <p className="text-gray-400">
            We want you to have a great experience. Here are some tips to stay safe while dating.
          </p>
        </div>

        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-white/5">{section.icon}</div>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
            <ul className="space-y-3">
              {section.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-rose-400 mt-1">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Link
          href="/help"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors"
        >
          Need more help?
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
