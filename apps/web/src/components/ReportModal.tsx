'use client';

import { useState } from 'react';
import { X, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReportModalProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

const reportReasons = [
  { id: 'inappropriate', label: 'Inappropriate content', description: 'Nudity, sexual content, or violence' },
  { id: 'fake', label: 'Fake profile', description: 'Person is not who they claim to be' },
  { id: 'spam', label: 'Spam or scam', description: 'Trying to sell something or asking for money' },
  { id: 'harassment', label: 'Harassment', description: 'Abusive or threatening behavior' },
  { id: 'underage', label: 'Underage user', description: 'Person appears to be under 18' },
  { id: 'other', label: 'Other', description: 'Something else' },
];

export function ReportModal({ userId, userName, onClose }: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedReason) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Report submitted:', {
      reportedUserId: userId,
      reason: selectedReason,
      details,
      timestamp: new Date().toISOString(),
    });
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    // Auto-close after 2 seconds
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-gray-900 rounded-2xl border border-white/10 overflow-hidden">
        {isSubmitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Report Submitted</h3>
            <p className="text-gray-400">Thank you for helping keep Gatekept safe.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Report {userName}</h3>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-start gap-3 mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">
                  Your report helps keep our community safe. We\'ll review this within 24 hours.
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400 mb-3">Why are you reporting this user?</p>
                
                {reportReasons.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedReason === reason.id
                        ? 'bg-rose-500/20 border-rose-500/50'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <p className="font-medium text-white">{reason.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{reason.description}</p>
                  </button>
                ))}
              </div>
              
              {selectedReason && (
                <div className="mt-4">
                  <label className="block text-sm text-gray-400 mb-2">
                    Additional details (optional)
                  </label>
                  <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us more about what happened..."
                    className="w-full h-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 resize-none"
                  />
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleSubmit}
                disabled={!selectedReason || isLoading}
                className="w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {isLoading ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
