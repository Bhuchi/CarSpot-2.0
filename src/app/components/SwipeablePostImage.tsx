import { useState, useRef, useEffect } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface SwipeablePostImageProps {
  imageUrl: string;
  alt: string;
  hasRated: boolean;
  onSwipeRate?: (rating: number) => void;
  children?: React.ReactNode;
}

export function SwipeablePostImage({ imageUrl, alt, hasRated, onSwipeRate, children }: SwipeablePostImageProps) {
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'like' | 'unlike' | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalRef = useRef<boolean | null>(null); // null = not yet determined
  const swipeProgressRef = useRef(0); // mirror of state for use inside listeners
  const swipeDirectionRef = useRef<'like' | 'unlike' | null>(null);
  const isSwipingRef = useRef(false);
  const isConfirmedRef = useRef(false);
  const onSwipeRateRef = useRef(onSwipeRate);

  const SWIPE_THRESHOLD = 0.6;

  const calculateSwipeProgress = (deltaX: number, containerWidth: number) =>
    Math.max(0, Math.min(1, Math.abs(deltaX) / containerWidth));

  useEffect(() => {
    onSwipeRateRef.current = onSwipeRate;
  }, [onSwipeRate]);

  const setSwipeState = (progress: number, direction: 'like' | 'unlike') => {
    swipeProgressRef.current = progress;
    swipeDirectionRef.current = direction;
    setSwipeProgress(progress);
    setSwipeDirection(direction);
  };

  const clearSwipeState = () => {
    swipeProgressRef.current = 0;
    swipeDirectionRef.current = null;
    setSwipeProgress(0);
    setSwipeDirection(null);
  };

  const confirmRating = (progress: number, direction: 'like' | 'unlike') => {
    isConfirmedRef.current = true;
    setIsConfirmed(true);
    setSwipeDirection(direction);
    const normalized = (progress - SWIPE_THRESHOLD) / (1 - SWIPE_THRESHOLD);
    const likedRating = Math.max(1, Math.min(10, Math.round(normalized * 9) + 1));
    const rating = direction === 'like' ? likedRating : 1;
    setTimeout(() => {
      onSwipeRateRef.current?.(rating);
      clearSwipeState();
      setIsConfirmed(false);
      isConfirmedRef.current = false;
    }, 500);
  };

  // Attach non-passive touch listeners so preventDefault() actually works
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (isConfirmedRef.current) return;
      startXRef.current = e.touches[0].clientX;
      startYRef.current = e.touches[0].clientY;
      isHorizontalRef.current = null;
      isSwipingRef.current = true;
      setIsSwiping(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isSwipingRef.current || !containerRef.current) return;
      const deltaX = e.touches[0].clientX - startXRef.current;
      const deltaY = e.touches[0].clientY - startYRef.current;

      // Determine swipe direction on first significant move
      if (isHorizontalRef.current === null && (Math.abs(deltaX) > 4 || Math.abs(deltaY) > 4)) {
        isHorizontalRef.current = Math.abs(deltaX) > Math.abs(deltaY);
      }

      // Only lock & prevent scroll for horizontal swipes.
      if (isHorizontalRef.current) {
        e.preventDefault(); // stops page scroll
        const progress = calculateSwipeProgress(deltaX, containerRef.current.offsetWidth);
        setSwipeState(progress, deltaX >= 0 ? 'like' : 'unlike');
      }
    };

    const onTouchEnd = () => {
      if (!isSwipingRef.current) return;
      isSwipingRef.current = false;
      setIsSwiping(false);
      isHorizontalRef.current = null;

      if (swipeProgressRef.current >= SWIPE_THRESHOLD && swipeDirectionRef.current) {
        confirmRating(swipeProgressRef.current, swipeDirectionRef.current);
      } else {
        clearSwipeState();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  // Mouse support (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isConfirmed) return;
    e.preventDefault();
    startXRef.current = e.clientX;
    isSwipingRef.current = true;
    setIsSwiping(true);
  };

  useEffect(() => {
    if (!isSwiping) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      const progress = calculateSwipeProgress(deltaX, containerRef.current.offsetWidth);
      setSwipeState(progress, deltaX >= 0 ? 'like' : 'unlike');
    };

    const onMouseUp = () => {
      isSwipingRef.current = false;
      setIsSwiping(false);
      if (swipeProgressRef.current >= SWIPE_THRESHOLD && swipeDirectionRef.current) {
        confirmRating(swipeProgressRef.current, swipeDirectionRef.current);
      } else {
        clearSwipeState();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isSwiping]);

  const overlayOpacity = swipeProgress;
  const iconScale = 0.5 + swipeProgress * 0.5;
  const isUnlikeSwipe = swipeDirection === 'unlike';

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      style={{
        overscrollBehaviorX: 'contain',
        touchAction: 'pan-y',
        userSelect: 'none',
      }}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />

      {/* Already rated hint */}
      {hasRated && (
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="text-white text-xs font-medium">✓ Already rated</div>
        </div>
      )}

      {/* Swipe overlay */}
      {(swipeProgress > 0 || isConfirmed) && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isUnlikeSwipe ? 'bg-[#EF4444]' : 'bg-[#A3E635]'
          }`}
          style={{ opacity: isConfirmed ? 1 : overlayOpacity * 0.85 }}
        >
          <div
            className="flex flex-col items-center gap-2 transition-transform duration-200"
            style={{ transform: `scale(${iconScale})` }}
          >
            {isUnlikeSwipe ? (
              <ThumbsDown className="w-20 h-20 text-white" strokeWidth={2.5} />
            ) : (
              <ThumbsUp className="w-20 h-20 text-black" strokeWidth={2.5} />
            )}
            {isConfirmed && (
              <div className={`${isUnlikeSwipe ? 'text-white' : 'text-black'} font-bold text-xl animate-in fade-in zoom-in duration-300`}>
                {isUnlikeSwipe ? 'No rated' : 'Rated!'}
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
            ) : isUnlikeSwipe ? (
              <>Release for no rated</>
            ) : (
              <>Release to rate {Math.max(1, Math.min(10, Math.round(((swipeProgress - SWIPE_THRESHOLD) / (1 - SWIPE_THRESHOLD)) * 9) + 1))}/10</>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
