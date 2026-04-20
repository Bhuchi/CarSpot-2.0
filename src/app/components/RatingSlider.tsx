import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

interface RatingSliderProps {
  postId: string;
  userRating?: number;
  communityAverage?: number;
  isLoggedIn: boolean;
  onRate?: (rating: number) => void;
}

export function RatingSlider({ postId, userRating, communityAverage, isLoggedIn, onRate }: RatingSliderProps) {
  const [currentRating, setCurrentRating] = useState(userRating ?? 5);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Sync slider when an external rating arrives (e.g. after swipe-rate)
  useEffect(() => {
    if (userRating !== undefined) setCurrentRating(userRating);
  }, [userRating]);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(e.target.value);
    setCurrentRating(newRating);
    if (onRate) onRate(newRating);
  };

  const handleMouseDown = () => setIsDragging(true);

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragPosition(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isDragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const thumbPosition = ((currentRating - 1) / 9) * rect.width;
      setDragPosition({ x: rect.left + thumbPosition, y: rect.top - 40 });
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setDragPosition(null);
    };
    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchend', handleGlobalMouseUp);
    }
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDragging]);

  if (!isLoggedIn) {
    return (
      <div className="py-4">
        <div className="text-sm text-[#6B7280] mb-2">Rating</div>
        <div className="text-sm text-white/60">
          <a href="/login" className="text-[#A3E635] hover:underline">Log in</a>{' '}
          to rate this car
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="text-sm text-[#6B7280] mb-2">
        {userRating !== undefined
          ? `Your Rating: ${currentRating}/10 — drag to re-rate`
          : 'Rate this car (1–10)'}
      </div>

      <div className="relative" ref={sliderRef}>
        <input
          type="range"
          min="1"
          max="10"
          value={currentRating}
          onChange={handleRatingChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#A3E635] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#A3E635] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          style={{
            background: `linear-gradient(to right, #A3E635 0%, #A3E635 ${
              ((currentRating - 1) / 9) * 100
            }%, #1E293B ${((currentRating - 1) / 9) * 100}%, #1E293B 100%)`,
          }}
        />

        {/* Floating value label during drag */}
        {isDragging && dragPosition && (
          <div
            className="fixed z-50 bg-[#A3E635] text-black px-3 py-1.5 rounded-lg font-semibold text-sm shadow-lg pointer-events-none animate-in fade-in zoom-in-95 duration-150"
            style={{
              left: `${dragPosition.x}px`,
              top: `${dragPosition.y}px`,
              transform: 'translateX(-50%)',
            }}
          >
            {currentRating}
          </div>
        )}

        <div className="flex justify-between text-xs text-[#6B7280] mt-1">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      {communityAverage !== undefined ? (
        <div className="flex items-center gap-2 mt-3 text-sm">
          <Star className="w-4 h-4 text-[#A3E635] fill-[#A3E635]" />
          <span>Community Average: {communityAverage.toFixed(1)}</span>
          <span
            className={`ml-2 px-2 py-0.5 rounded text-xs ${
              Math.abs(currentRating - communityAverage) <= 1
                ? 'bg-[#A3E635]/20 text-[#A3E635]'
                : 'bg-white/10 text-white/60'
            }`}
          >
            {Math.abs(currentRating - communityAverage) <= 1 ? 'Matched' : 'Not matched'}
          </span>
        </div>
      ) : (
        userRating === undefined && (
          <div className="text-xs text-white/40 mt-2">Rate to reveal community average</div>
        )
      )}
    </div>
  );
}
