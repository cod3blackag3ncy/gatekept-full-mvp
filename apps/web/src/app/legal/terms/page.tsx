'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Terms of Service</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto prose prose-invert prose-sm">
        <p className="text-sm text-gray-500 mb-6">Effective Date: January 1, 2026</p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">1. Acceptance of Terms</h2>
        <p className="text-gray-300 leading-relaxed">
          By accessing or using the Gatekept application (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service. We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the updated Terms.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">2. Eligibility</h2>
        <p className="text-gray-300 leading-relaxed">
          You must be at least 18 years of age to use Gatekept. By creating an account, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms. We may require age verification at any time.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">3. Account Registration</h2>
        <p className="text-gray-300 leading-relaxed">
          You must provide accurate, current, and complete information when creating your account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. Gatekept reserves the right to suspend or terminate accounts that contain false or misleading information.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">4. User Conduct</h2>
        <p className="text-gray-300 leading-relaxed mb-3">You agree not to:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
          <li>Harass, threaten, stalk, or intimidate any other user</li>
          <li>Post or transmit content that is defamatory, obscene, pornographic, or otherwise objectionable</li>
          <li>Impersonate any person or entity, or falsely state or misrepresent your identity</li>
          <li>Use the Service to send spam, solicitations, or commercial messages</li>
          <li>Attempt to gain unauthorized access to other users&apos; accounts or our systems</li>
          <li>Use automated means (bots, scrapers, etc.) to access the Service</li>
          <li>Engage in any activity that could damage, disable, or impair the Service</li>
        </ul>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">5. Content</h2>
        <p className="text-gray-300 leading-relaxed">
          You retain ownership of content you upload to Gatekept. By uploading content, you grant Gatekept a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with the Service. You are solely responsible for all content you upload and represent that you have the rights to share it. We may remove content that violates these Terms or our Community Guidelines without notice.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">6. Privacy</h2>
        <p className="text-gray-300 leading-relaxed">
          Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information. By using the Service, you consent to the collection and use of your information as described in the Privacy Policy.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">7. Subscriptions and Payments</h2>
        <p className="text-gray-300 leading-relaxed">
          Gatekept offers free and paid subscription plans. Paid subscriptions automatically renew unless cancelled before the renewal date. Prices are subject to change with 30 days&apos; notice. Refunds are handled in accordance with applicable law and the platform through which you subscribed.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">8. Termination</h2>
        <p className="text-gray-300 leading-relaxed">
          We may suspend or terminate your account at any time, with or without cause, and with or without notice. Upon termination, your right to use the Service ceases immediately. You may delete your account at any time through the app settings. We will delete your personal data within 30 days of account deletion, except where retention is required by law.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">9. Disclaimers</h2>
        <p className="text-gray-300 leading-relaxed">
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. GATEKEPT DOES NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT CONDUCT CRIMINAL BACKGROUND CHECKS ON USERS AND ARE NOT RESPONSIBLE FOR THE CONDUCT OF ANY USER. USE THE SERVICE AT YOUR OWN RISK.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">10. Limitation of Liability</h2>
        <p className="text-gray-300 leading-relaxed">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, GATEKEPT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF THE SERVICE.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">11. Contact</h2>
        <p className="text-gray-300 leading-relaxed">
          If you have questions about these Terms, please contact us at{' '}
          <a href="mailto:legal@gatekept.app" className="text-rose-400 hover:text-rose-300">
            legal@gatekept.app
          </a>.
        </p>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          Last updated: January 2026
        </div>
      </div>
    </div>
  );
}
