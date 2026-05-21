'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  isMuted: boolean;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export function VideoPlayer({
  src,
  isMuted,
  className = '',
  autoPlay = true,
  loop = true,
  playsInline = true,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    
    if (autoPlay) {
      video.play().catch((err) => {
        console.log('Autoplay prevented:', err);
      });
    }
  }, [isMuted, autoPlay]);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError('Failed to load video');
  };

  if (error) {
    return (
      <div className={`${className} bg-gray-800 flex items-center justify-center`}>
        <div className="text-center p-4">
          <p className="text-gray-400 text-sm">Video unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/20 border-t-rose-500 rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline={playsInline}
        preload="auto"
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoadedData={handleLoaded}
        onError={handleError}
      />
    </div>
  );
}
