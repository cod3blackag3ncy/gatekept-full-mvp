'use client';

// Shimmer animation
function shimmer() {
  return 'animate-pulse bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]';
}

// Feed card skeleton
export function FeedCardSkeleton() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video placeholder */}
      <div className={`absolute inset-0 ${shimmer()}`} />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      
      {/* Info section */}
      <div className="absolute bottom-32 left-0 right-0 p-6">
        <div className="max-w-md mx-auto space-y-4">
          {/* Name & age */}
          <div className={`h-10 w-48 rounded-lg ${shimmer()}`} />
          
          {/* Bio */}
          <div className="space-y-2">
            <div className={`h-4 w-full rounded ${shimmer()}`} />
            <div className={`h-4 w-3/4 rounded ${shimmer()}`} />
          </div>
          
          {/* Interests */}
          <div className="flex gap-2">
            <div className={`h-8 w-20 rounded-full ${shimmer()}`} />
            <div className={`h-8 w-24 rounded-full ${shimmer()}`} />
            <div className={`h-8 w-16 rounded-full ${shimmer()}`} />
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-8">
        <div className={`w-20 h-20 rounded-full ${shimmer()}`} />
        <div className={`w-20 h-20 rounded-full ${shimmer()}`} />
      </div>
    </div>
  );
}

// Message list skeleton
export function MessageListSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full ${shimmer()}`} />
          <div className="flex-1 space-y-2">
            <div className={`h-4 w-24 rounded ${shimmer()}`} />
            <div className={`h-3 w-full rounded ${shimmer()}`} />
          </div>
          <div className={`h-3 w-12 rounded ${shimmer()}`} />
        </div>
      ))}
    </div>
  );
}

// Profile grid skeleton
export function ProfileGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="aspect-[3/4] rounded-xl overflow-hidden">
          <div className={`w-full h-full ${shimmer()}`} />
        </div>
      ))}
    </div>
  );
}

// Text line skeleton
export function TextSkeleton({ width = '100%', height = '1rem', className = '' }: { 
  width?: string; 
  height?: string;
  className?: string;
}) {
  return (
    <div 
      className={`rounded ${shimmer()} ${className}`}
      style={{ width, height }}
    />
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full ${shimmer()}`} />
        <div className="flex-1 space-y-2">
          <div className={`h-4 w-32 rounded ${shimmer()}`} />
          <div className={`h-3 w-20 rounded ${shimmer()}`} />
        </div>
      </div>
      <div className={`h-20 w-full rounded-xl ${shimmer()}`} />
    </div>
  );
}
