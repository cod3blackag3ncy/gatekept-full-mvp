'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Shield, ChevronRight, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  const router = useRouter();

  const handleVideoCapture = () => {
    setIsRecording(true);
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false);
      setHasVideo(true);
    }, 2000);
  };

  const handleVerification = () => {
    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
    }, 3000);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-black flex flex-col p-4">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
            <Camera className="w-10 h-10 text-rose-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center mb-4">
            Record your profile video
          </h1>
          
          <p className="text-gray-400 text-center mb-8">
            Show your personality! This video will be your profile.
          </p>
          
          <div className="w-full aspect-[3/4] rounded-2xl bg-gray-900 border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden">
            {hasVideo ? (
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
                <video 
                  src="https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-camera-on-a-running-track-32812-large.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <button 
                    onClick={() => setHasVideo(false)}
                    className="flex-1 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm"
                  >
                    Retake
                  </button>
                </div>
              </div>
            ) : (
              <>
                {isRecording ? (
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500 animate-pulse" />
                    <p className="text-white">Recording...</p>
                  </div>
                ) : (
                  <button
                    onClick={handleVideoCapture}
                    className="w-24 h-24 rounded-full border-4 border-rose-500 flex items-center justify-center hover:bg-rose-500/20 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-500" />
                  </button>
                )}
              </>
            )}
          </div>
          
          <button
            onClick={() => hasVideo && setStep(2)}
            disabled={!hasVideo}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="py-4 text-center">
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col p-4">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
          <Shield className="w-10 h-10 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-4">
          Verify your identity
        </h1>
        
        <p className="text-gray-400 text-center mb-8">
          Gatekept is a verified community. Please complete identity verification.
        </p>
        
        {!isVerified ? (
          <>
            <div className="w-full p-6 rounded-2xl bg-gray-900 border border-white/10 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
                <div>
                  <p className="font-medium text-white">Government ID</p>
                  <p className="text-sm text-gray-400">Driver\'s license or passport</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-xl">📸</span>
                </div>
                <div>
                  <p className="font-medium text-white">Live photo</p>
                  <p className="text-sm text-gray-400">Quick selfie to verify you match</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleVerification}
              disabled={isVerifying}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                'Start Verification'
              )}
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-2">Verified! 🎉</h2>
            
            <p className="text-gray-400 mb-8">You\'re now part of the Gatekept community.</p>
            
            <button
              onClick={() => router.push('/feed')}
              className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-xl"
            >
              Start Exploring
            </button>
          </div>
        )}
      </div>
      
      <div className="py-4 text-center">
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-rose-500" />
        </div>
      </div>
    </div>
  );
}
