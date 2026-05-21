'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function DmcaPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10 px-4 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <button onClick={() => router.back()} className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">DMCA Policy</h1>
          <div className="w-5" />
        </div>
      </header>

      <div className="pt-20 pb-8 px-4 max-w-2xl mx-auto prose prose-invert prose-sm">
        <p className="text-sm text-gray-500 mb-6">Effective Date: January 1, 2026</p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Overview</h2>
        <p className="text-gray-300 leading-relaxed">
          Gatekept respects the intellectual property rights of others and expects users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&quot;DMCA&quot;), we will respond to notices of alleged copyright infringement that comply with the DMCA and are properly submitted to our designated copyright agent.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Filing a DMCA Takedown Notice</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          If you believe that content hosted on Gatekept infringes your copyright, please submit a written notification containing the following:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
          <li>A physical or electronic signature of the copyright owner or authorized agent</li>
          <li>Identification of the copyrighted work claimed to have been infringed</li>
          <li>Identification of the material that is claimed to be infringing, with enough detail to locate it on the Service (e.g., URL or screenshot)</li>
          <li>Your contact information (name, address, phone number, email)</li>
          <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law</li>
          <li>A statement, under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or authorized to act on behalf of the owner</li>
        </ol>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Counter-Notification</h2>
        <p className="text-gray-300 leading-relaxed mb-3">
          If you believe your content was wrongly removed due to a DMCA takedown, you may submit a counter-notification containing:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
          <li>Your physical or electronic signature</li>
          <li>Identification of the material that was removed and its prior location</li>
          <li>A statement under penalty of perjury that you believe the material was removed by mistake or misidentification</li>
          <li>Your name, address, and phone number, and a statement consenting to the jurisdiction of the federal district court for the judicial district in which your address is located</li>
        </ol>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Repeat Infringers</h2>
        <p className="text-gray-300 leading-relaxed">
          Gatekept will, in appropriate circumstances, terminate the accounts of users who are repeat copyright infringers. We determine repeat infringement on a case-by-case basis.
        </p>

        <h2 className="text-xl font-bold text-white mt-8 mb-3">Designated Copyright Agent</h2>
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-gray-300 space-y-1">
          <p><strong className="text-white">Gatekept DMCA Agent</strong></p>
          <p>Email: <a href="mailto:dmca@gatekept.app" className="text-rose-400 hover:text-rose-300">dmca@gatekept.app</a></p>
          <p>Address: Gatekept Inc., DMCA Agent, 123 Market Street, San Francisco, CA 94105</p>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          Please note: Submitting a false DMCA takedown notice may result in liability for damages under Section 512(f) of the DMCA.
        </p>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          Last updated: January 2026
        </div>
      </div>
    </div>
  );
}
