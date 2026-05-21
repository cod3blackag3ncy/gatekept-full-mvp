'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, HelpCircle, Mail, Shield, FileText, Scale } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    q: 'How does Gatekept work?',
    a: 'Gatekept uses short video introductions to help you make authentic connections. Browse profiles with video intros, swipe to connect, and start chatting with your matches. Our video-first approach helps you get a real sense of someone before meeting.',
  },
  {
    q: 'How do I verify my profile?',
    a: 'Go to your profile settings and tap "Verify." You\'ll be asked to take a selfie that matches your profile photos. Verified profiles get a blue checkmark and are shown more often in the feed. Verification is coming soon via Stripe Identity.',
  },
  {
    q: 'What happens when I match with someone?',
    a: 'When two people both swipe "Connect" on each other, it\'s a match! You\'ll both receive a notification and can start messaging right away. Messages expire after 72 hours of inactivity to encourage real conversation.',
  },
  {
    q: 'How do I report or block someone?',
    a: 'Tap the three-dot menu on any profile or conversation and select "Report" or "Block." Reports are reviewed by our team within 24 hours. Blocked users cannot see your profile or contact you.',
  },
  {
    q: 'Can I undo a swipe?',
    a: 'Currently, swipes cannot be undone. Take your time reviewing each profile before making your decision. A rewind feature is planned for premium subscribers.',
  },
  {
    q: 'How do I delete my account?',
    a: 'Go to Settings > Privacy > Delete Account. You\'ll be asked to confirm via email. Account deletion is permanent and removes all your data, matches, and messages within 30 days.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="font-medium text-white pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-400 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Help & FAQ</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-600/20 border border-rose-500/20 mb-4">
            <HelpCircle className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">How Can We Help?</h2>
          <p className="text-gray-400">Find answers to common questions below.</p>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 px-5">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* Contact Support */}
        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-5">
          <h3 className="text-lg font-semibold mb-2">Still Need Help?</h3>
          <p className="text-sm text-gray-400 mb-4">
            Our support team typically responds within 24 hours.
          </p>
          <a
            href="mailto:support@gatekept.app"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all"
          >
            <Mail className="w-5 h-5" />
            support@gatekept.app
          </a>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 p-5">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="space-y-2">
            <Link href="/safety" className="flex items-center gap-3 py-2 text-gray-300 hover:text-white transition-colors">
              <Shield className="w-5 h-5 text-rose-400" />
              Safety Tips
            </Link>
            <Link href="/legal/terms" className="flex items-center gap-3 py-2 text-gray-300 hover:text-white transition-colors">
              <FileText className="w-5 h-5 text-blue-400" />
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="flex items-center gap-3 py-2 text-gray-300 hover:text-white transition-colors">
              <Scale className="w-5 h-5 text-purple-400" />
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
