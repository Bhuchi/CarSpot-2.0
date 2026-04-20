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
  const startYRef = useRef(0);
  const isHorizontalRef = useRef<boolean | null>(null); // null = not yet determined
  const swipeProgressRef = useRef(0); // mirror of state for use inside listeners
  const isSwipingRef = useRef(false);
  const isConfirmedRef = useRef(false);

  const SWIPE_THRESHOLD = 0.6;

  const calculateSwipeProgress = (deltaX: number, containerWidth: number) =>
    Math.max(0, Math.min(1, deltaX / containerWidth));

  const confirmRating = (progress: number) => {
    isConfirmedRef.current = true;
    setIsConfirmed(true);
    const normalized = (progress - SWIPE_THRESHOLD) / (1 - SWIPE_THRESHOLD);
    const rating = Math.max(1, Math.min(10, Math.round(normalized * 9) + 1));
    setTimeout(() => {
      onSwipeRate?.(rating);
      setSwipeProgress(0);
      swipeProgressRef.current = 0;
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

      // Only lock & prevent scroll for horizontal swipes
      if (isHorizontalRef.current && deltaX > 0) {
        e.preventDefault(); // stops page scroll
        const progress = calculateSwipeProgress(deltaX, containerRef.current.offsetWidth);
        swipeProgressRef.current = progress;
        setSwipeProgress(progress);
      }
    };

    const onTouchEnd = () => {
      if (!isSwipingRef.current) return;
      isSwipingRef.current = false;
      setIsSwiping(false);
      isHorizontalRef.current = null;

      if (swipeProgressRef.current >= SWIPE_THRESHOLD) {
        confirmRating(swipeProgressRef.current);
      } else {
        setSwipeProgress(0);
        swipeProgressRef.current = 0;
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
    startXRef.current = e.clientX;
    isSwipingRef.current = true;
    setIsSwiping(true);
  };

  useEffect(() => {
    if (!isSwiping) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const deltaX = e.clientX - startXRef.current;
      if (deltaX > 0) {
        const progress = calculateSwipeProgress(deltaX, containerRef.current.offsetWidth);
        swipeProgressRef.current = progress;
        setSwipeProgress(progress);
      }
    };

    const onMouseUp = () => {
      isSwipingRef.current = false;
      setIsSwiping(false);
      if (swipeProgressRef.current >= SWIPE_THRESHOLD) {
        confirmRating(swipeProgressRef.current);
      } else {
        setSwipeProgress(0);
        swipeProgressRef.current = 0;
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

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
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
          className="absolute inset-0 bg-[#A3E635] flex items-center justify-center transition-all duration-300"
          style={{ opacity: isConfirmed ? 1 : overlayOpacity * 0.85 }}
        >
          <div
            className="flex flex-col items-center gap-2 transition-transform duration-200"
            style={{ transform: `scale(${iconScale})` }}
          >
            <ThumbsUp className="w-20 h-20 text-black" strokeWidth={2.5} />
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
              <>Release to rate {Math.max(1, Math.min(10, Math.round(((swipeProgress - SWIPE_THRESHOLD) / (1 - SWIPE_THRESHOLD)) * 9) + 1))}/10</>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
