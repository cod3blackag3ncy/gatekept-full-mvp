'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Privacy Policy</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto prose prose-invert prose-sm">
        <p className="text-sm text-gray-500 mb-6">Effective Date: January 1, 2026</p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Information We Collect</h2>
        <p className="text-gray-300 leading-relaxed mb-3">We collect the following types of information:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong className="text-white">Account Information:</strong> Name, email address, date of birth, gender, and profile photos/videos you provide during registration</li>
          <li><strong className="text-white">Profile Data:</strong> Bio, interests, preferences, and other information you choose to share</li>
          <li><strong className="text-white">Usage Data:</strong> How you interact with the Service, including swipes, matches, messages, and feature usage</li>
          <li><strong className="text-white">Device Information:</strong> Device type, operating system, browser, IP address, and mobile device identifiers</li>
          <li><strong className="text-white">Location Data:</strong> Approximate location based on IP address or, with your consent, precise GPS location</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>To provide, maintain, and improve the Service</li>
          <li>To match you with other users based on your preferences</li>
          <li>To send notifications about matches, messages, and account activity</li>
          <li>To detect and prevent fraud, abuse, and security incidents</li>
          <li>To comply with legal obligations</li>
          <li>To send marketing communications (with your consent)</li>
          <li>To conduct research and analytics to improve user experience</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">3. How We Share Your Information</h2>
        <p className="text-gray-300 leading-relaxed mb-3">We may share your information with:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong className="text-white">Other Users:</strong> Your profile information is visible to other users as part of the matching experience</li>
          <li><strong className="text-white">Service Providers:</strong> Third-party vendors who help us operate the Service (hosting, analytics, payment processing)</li>
          <li><strong className="text-white">Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety</li>
          <li><strong className="text-white">Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
        <p className="text-gray-300 leading-relaxed mt-3">We do not sell your personal information to third parties.</p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">4. Data Retention</h2>
        <p className="text-gray-300 leading-relaxed">
          We retain your personal information for as long as your account is active or as needed to provide the Service. When you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by law or for legitimate business purposes (e.g., fraud prevention, legal claims).
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">5. Your Rights</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          Depending on your location, you may have the following rights:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
          <li><strong className="text-white">Correction:</strong> Request correction of inaccurate data</li>
          <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data</li>
          <li><strong className="text-white">Portability:</strong> Request a portable copy of your data</li>
          <li><strong className="text-white">Opt-out:</strong> Opt out of marketing communications at any time</li>
          <li><strong className="text-white">Restrict Processing:</strong> Request restriction of data processing in certain circumstances</li>
        </ul>

        <h3 className="text-lg font-semibold text-white mt-6 mb-2">CCPA Notice (California Residents)</h3>
        <p className="text-gray-300 leading-relaxed">
          California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To exercise your CCPA rights, contact us at privacy@gatekept.app.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6 mb-2">GDPR Notice (European Residents)</h3>
        <p className="text-gray-300 leading-relaxed">
          If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR). Our legal basis for processing your data includes consent, contractual necessity, and legitimate interests. You have the right to lodge a complaint with your local data protection authority.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">6. Security</h2>
        <p className="text-gray-300 leading-relaxed">
          We implement industry-standard security measures to protect your personal information, including encryption in transit and at rest, access controls, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">7. Children&apos;s Privacy</h2>
        <p className="text-gray-300 leading-relaxed">
          Gatekept is not intended for users under 18. We do not knowingly collect personal information from anyone under 18. If we learn that we have collected data from a minor, we will delete it promptly.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">8. Contact Us</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have questions about this Privacy Policy or wish to exercise your rights, contact us at:{' '}
          <a href="mailto:privacy@gatekept.app" className="text-rose-400 hover:text-rose-300">
            privacy@gatekept.app
          </a>
        </p>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          Last updated: January 2026
        </div>
      </div>
    </div>
  );
}
