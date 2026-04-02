import { Badge } from './ui/badge';

interface AIBlurBadgeProps {
  show?: boolean;
}

export function AIBlurBadge({ show = true }: AIBlurBadgeProps) {
  if (!show) return null;

  return (
    <div className="absolute bottom-3 left-3 z-10">
      <Badge className="bg-[#A3E635] text-black text-xs font-medium shadow-lg">
        Plates and faces auto-blurred
      </Badge>
    </div>
  );
}

interface AIBlurOverlayProps {
  className?: string;
}

export function AIBlurOverlay({ className = '' }: AIBlurOverlayProps) {
  return (
    <div
      className={`absolute bg-black ${className}`}
      aria-label="Blurred license plate region"
    />
  );
}
