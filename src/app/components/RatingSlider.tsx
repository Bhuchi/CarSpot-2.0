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
  const [currentRating, setCurrentRating] = useState(userRating || 5);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(e.target.value);
    setCurrentRating(newRating);
    if (!userRating && onRate) {
      onRate(newRating);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragPosition(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (isDragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const thumbPosition = ((currentRating - 1) / 9) * rect.width;
      setDragPosition({
        x: rect.left + thumbPosition,
        y: rect.top - 40, // Position above the slider
      });
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
          <a href="/login" className="text-[#A3E635] hover:underline">
            Log in
          </a>{' '}
          to rate this car
        </div>
      </div>
    );
  }

  if (userRating) {
    // Rated state - locked
    return (
      <div className="py-4">
        <div className="text-sm text-[#6B7280] mb-2">Your Rating: {userRating}/10</div>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={userRating}
            disabled
            className="w-full h-2 bg-[#1E293B] rounded-lg appearance-none cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#A3E635] [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-[#A3E635] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, #A3E635 0%, #A3E635 ${
                ((userRating - 1) / 9) * 100
              }%, #1E293B ${((userRating - 1) / 9) * 100}%, #1E293B 100%)`,
            }}
          />
          <div className="flex justify-between text-xs text-[#6B7280] mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
        {communityAverage && (
          <div className="flex items-center gap-2 mt-3 text-sm">
            <Star className="w-4 h-4 text-[#A3E635] fill-[#A3E635]" />
            <span>Community Average: {communityAverage.toFixed(1)}</span>
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs ${
                Math.abs(userRating - communityAverage) <= 1
                  ? 'bg-[#A3E635]/20 text-[#A3E635]'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {Math.abs(userRating - communityAverage) <= 1 ? 'Matched' : 'Not matched'}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Unrated state
  return (
    <div className="py-4">
      <div className="text-sm text-[#6B7280] mb-2">Rate this car (1-10)</div>
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
      <div className="text-xs text-white/40 mt-2">Rate to reveal community average</div>
    </div>
  );
}