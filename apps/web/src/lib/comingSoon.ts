// Coming Soon feature registry
// All backend-dependent features tracked here with ETAs and explanations

export interface ComingSoonFeature {
  eta: string;
  why: string;
  description?: string;
}

export const COMING_SOON: Record<string, ComingSoonFeature> = {
  'identity-verification': {
    eta: 'Q3 2026',
    why: 'Stripe Identity integration pending compliance review',
    description: 'Government ID + selfie verification powered by Stripe Identity',
  },
  'payments': {
    eta: 'Q3 2026',
    why: 'Stripe Checkout integration',
    description: 'Premium and Elite subscription tiers with Stripe billing',
  },
  'video-messaging': {
    eta: 'Q4 2026',
    why: 'WebRTC infrastructure setup',
    description: 'Record and send ephemeral video messages to matches',
  },
  'voice-notes': {
    eta: 'Q4 2026',
    why: 'Audio recording pipeline',
    description: 'Send voice notes alongside text messages',
  },
  'super-like': {
    eta: 'Q3 2026',
    why: 'Tied to premium subscription launch',
    description: 'Stand out to someone you really like',
  },
  'incognito-mode': {
    eta: 'Q4 2026',
    why: 'Premium feature - requires privacy infrastructure',
    description: 'Browse without appearing in others\' feeds',
  },
  'data-export': {
    eta: 'Q4 2026',
    why: 'GDPR compliance tooling',
    description: 'Download all your data in standard format',
  },
  'push-notifications': {
    eta: 'Q3 2026',
    why: 'Service worker + VAPID key setup',
    description: 'Native push notifications for matches and messages',
  },
  'social-login': {
    eta: 'Q3 2026',
    why: 'OAuth provider integrations',
    description: 'Sign in with Google, Apple, or Meta',
  },
  'quiet-hours': {
    eta: 'Q4 2026',
    why: 'Scheduler service setup',
    description: 'Pause notifications during set hours',
  },
  'panic-button': {
    eta: 'Q3 2026',
    why: 'T&S workflow integration',
    description: 'Emergency safety feature with location sharing',
  },
  'photo-messages': {
    eta: 'Q4 2026',
    why: 'Cloudflare R2 image upload pipeline',
    description: 'Send photos in conversations (with safety screening)',
  },
  'live-video-chat': {
    eta: 'Q1 2027',
    why: 'WebRTC + TURN servers',
    description: 'Face-to-face video calls with matches',
  },
  'story-mode': {
    eta: 'Q1 2027',
    why: 'Video story infrastructure',
    description: 'Share 24-hour ephemeral video stories',
  },
  'ai-matching': {
    eta: 'Q2 2027',
    why: 'ML model training and deployment',
    description: 'Smarter matching based on conversation patterns',
  },
};

export function getComingSoonFeature(key: string): ComingSoonFeature | undefined {
  return COMING_SOON[key];
}

export function getAllComingSoonFeatures(): Array<{ key: string } & ComingSoonFeature> {
  return Object.entries(COMING_SOON).map(([key, feature]) => ({
    key,
    ...feature,
  }));
}
