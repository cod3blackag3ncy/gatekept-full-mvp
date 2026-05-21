'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Shield, Video, Lock, ChevronDown, X, Check } from 'lucide-react';
import { mockStore } from '@/lib/mockStore';
import { ComingSoon } from '@/components/ComingSoon';

const FAQS = [
  {
    question: 'How is Gatekept different from other dating apps?',
    answer: 'We use a three-gate system: video-first profiles, verified identities, and ephemeral messaging. This creates a safer, more authentic dating experience where you actually see and hear people before matching.',
  },
  {
    question: 'Is Gatekept free to use?',
    answer: 'Yes! The core experience is completely free. We offer Premium and Elite subscriptions for power users who want features like unlimited swipes, Super Likes, and incognito mode.',
  },
  {
    question: 'How does video verification work?',
    answer: 'We use Stripe Identity to verify government IDs and match them with live selfies. This ensures everyone is who they say they are, dramatically reducing fake profiles.',
  },
  {
    question: 'What happens to my messages after 72 hours?',
    answer: 'All video messages auto-delete after 72 hours. This encourages authentic conversation and reduces the pressure of permanent digital footprints.',
  },
  {
    question: 'Can I use Gatekept on desktop?',
    answer: 'Gatekept is mobile-first, but you can install it as a PWA on any device. We\'re working on a full desktop experience for later this year.',
  },
];

export default function LandingPage() {
  const router = useRouter();
  const [showAgeGate, setShowAgeGate] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // Check if age already confirmed
    if (!mockStore.getAgeConfirmed()) {
      setShowAgeGate(true);
    }
  }, []);

  const confirmAge = () => {
    mockStore.setAgeConfirmed(true);
    setShowAgeGate(false);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-couple-walking-in-a-park-at-sunset-3446-large.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Now in Beta
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Dating, but you{' '}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              actually mean it
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            Video-first profiles. Verified identities. Real connections.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
            >
              Sign In
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Must be 18+ to use Gatekept
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How it works
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Three gates. Three steps to authentic connection.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: 'Video First',
                description: 'See people in motion before you match. No more misleading photos.',
              },
              {
                icon: Shield,
                title: 'Verified IDs',
                description: 'Government ID verification ensures everyone is who they say they are.',
              },
              {
                icon: Lock,
                title: 'Ephemeral Messages',
                description: 'Video messages auto-delete after 72 hours. Just like real life.',
              },
            ].map((step, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="py-24 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Trust & Safety
          </h2>
          <p className="text-gray-400 text-center mb-16">
            Your safety is our priority
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Verified Profiles',
                description: 'Every user goes through ID verification. Say goodbye to catfishing.',
              },
              {
                title: 'Video-First',
                description: 'See and hear people before matching. Authenticity built in.',
              },
              {
                title: '72-Hour Moderation',
                description: 'Reports reviewed within 24 hours. Problem users banned fast.',
              },
              {
                title: 'Block & Report',
                description: 'One-tap blocking and reporting on every profile and message.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-black border border-white/10">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to find someone real?
          </h2>
          <p className="text-gray-400">
            Join thousands of people who are done with games and ready for genuine connection.
          </p>
          <button
            onClick={() => router.push('/register')}
            className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              <span className="font-bold">Gatekept</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <button onClick={() => router.push('/legal/terms')} className="hover:text-white">
                Terms
              </button>
              <button onClick={() => router.push('/legal/privacy')} className="hover:text-white">
                Privacy
              </button>
              <button onClick={() => router.push('/legal/community-guidelines')} className="hover:text-white">
                Guidelines
              </button>
              <button onClick={() => router.push('/coming-soon')} className="hover:text-white">
                Roadmap
              </button>
            </div>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-8">
            © 2026 Gatekept. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Age Gate Modal */}
      {showAgeGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="w-full max-w-sm text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-rose-500/20 flex items-center justify-center">
              <Lock className="w-10 h-10 text-rose-400" />
            </div>
            
            <h2 className="text-2xl font-bold">Age Verification Required</h2>
            
            <p className="text-gray-400">
              Gatekept is exclusively for adults 18 years or older. By continuing, you confirm that you meet this requirement.
            </p>

            <div className="space-y-3">
              <button
                onClick={confirmAge}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl"
              >
                I am 18 or older
              </button>
              <button
                onClick={() => router.push('https://www.google.com')}
                className="w-full py-4 bg-white/5 text-gray-400 font-medium rounded-xl"
              >
                I am under 18
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
