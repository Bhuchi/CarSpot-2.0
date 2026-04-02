import { useState, useRef, useEffect } from 'react';
import { ThumbsUp } from 'lucide-react';

interface SwipeablePostImageProps {
  imageUrl: string;
  alt: string;
  hasRated: boolean;
  onSwipeRate?: (rating: number) => void;
  children?: React.ReactNode;
}

export function SwipeablePostImage({ imageUrl, alt, hasRated, onSwipeRate, children }: SwipeablePostImageProps) {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);

  const SWIPE_THRESHOLD = 0.6; // 60% of card width

  const calculateSwipeProgress = (deltaX: number, containerWidth: number) => {
    const progress = Math.max(0, Math.min(1, deltaX / containerWidth));
    return progress;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (hasRated || isConfirmed) return;
    startXRef.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (hasRated || isConfirmed) return;
    startXRef.current = e.clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping || !containerRef.current) return;
    currentXRef.current = e.touches[0].clientX;
    const deltaX = currentXRef.current - startXRef.current;
    
    if (deltaX > 0) { // Only allow right swipe
      const containerWidth = containerRef.current.offsetWidth;
      const progress = calculateSwipeProgress(deltaX, containerWidth);
      setSwipeProgress(progress);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSwiping || !containerRef.current) return;
    currentXRef.current = e.clientX;
    const deltaX = currentXRef.current - startXRef.current;
    
    if (deltaX > 0) { // Only allow right swipe
      const containerWidth = containerRef.current.offsetWidth;
      const progress = calculateSwipeProgress(deltaX, containerWidth);
      setSwipeProgress(progress);
    }
  };

  const handleEnd = () => {
    if (!isSwiping) return;
    
    if (swipeProgress >= SWIPE_THRESHOLD) {
      // Confirmed rating
      setIsConfirmed(true);
      // Map swipe progress to rating (1-10)
      const rating = Math.max(1, Math.min(10, Math.round(swipeProgress * 10)));
      
      setTimeout(() => {
        if (onSwipeRate) {
          onSwipeRate(rating);
        }
        setSwipeProgress(0);
        setIsConfirmed(false);
      }, 500);
    } else {
      // Snap back
      setSwipeProgress(0);
    }
    
    setIsSwiping(false);
  };

  useEffect(() => {
    if (isSwiping) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const handleGlobalMouseUp = () => handleEnd();
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isSwiping, swipeProgress]);

  const overlayOpacity = swipeProgress;
  const iconScale = 0.5 + (swipeProgress * 0.5); // Scale from 0.5 to 1

  return (
    <div
      ref={containerRef}
      className={`relative aspect-[4/3] overflow-hidden ${hasRated ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
    >
      <img 
        src={imageUrl} 
        alt={alt} 
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />
      
      {/* Already rated overlay hint */}
      {hasRated && (
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="text-white text-xs font-medium">
            ✓ Already rated
          </div>
        </div>
      )}
      
      {/* Swipe overlay */}
      {(swipeProgress > 0 || isConfirmed) && (
        <div
          className="absolute inset-0 bg-[#A3E635] flex items-center justify-center transition-all duration-300"
          style={{
            opacity: isConfirmed ? 1 : overlayOpacity * 0.85,
          }}
        >
          <div
            className="flex flex-col items-center gap-2 transition-transform duration-200"
            style={{
              transform: `scale(${iconScale})`,
            }}
          >
            <ThumbsUp 
              className="w-20 h-20 text-black"
              strokeWidth={2.5}
            />
            {isConfirmed && (
              <div className="text-black font-bold text-xl animate-in fade-in zoom-in duration-300">
                Rated!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress indicator */}
      {isSwiping && swipeProgress > 0 && !isConfirmed && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="text-white text-sm font-medium">
            {swipeProgress < SWIPE_THRESHOLD ? (
              <>Swipe {Math.round((SWIPE_THRESHOLD - swipeProgress) * 100)}% more</>
            ) : (
              <>Release to rate {Math.round(swipeProgress * 10)}/10</>
            )}
          </div>
        </div>
      )}

      {/* Children (AI Blur badges, etc.) */}
      {children}
    </div>
  );
}