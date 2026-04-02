import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Link } from 'react-router';

export function InteractionHelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 bg-[#A3E635] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="Interaction help"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <HelpCircle className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Help Card */}
      {isOpen && (
        <div className="fixed bottom-44 md:bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] bg-[#0F172A] border border-[#A3E635]/30 rounded-xl shadow-2xl z-40 animate-in fade-in zoom-in-95 duration-300">
          <div className="p-4">
            <h3 className="text-[#A3E635] mb-3">Quick Interaction Guide</h3>
            
            <div className="space-y-3 text-sm">
              <div className="bg-[#0B1120] rounded-lg p-3">
                <div className="font-semibold text-white mb-1">🖱️ Slider Drag</div>
                <div className="text-white/70 text-xs">
                  Drag the rating slider to see your score above the thumb in real-time
                </div>
              </div>

              <div className="bg-[#0B1120] rounded-lg p-3">
                <div className="font-semibold text-white mb-1">👆 Image Swipe</div>
                <div className="text-white/70 text-xs">
                  Swipe right on post images to quick-rate. Distance = score (1-10)
                </div>
              </div>

              <div className="bg-[#0B1120] rounded-lg p-3">
                <div className="font-semibold text-white mb-1">📱 Sidebar Toggle</div>
                <div className="text-white/70 text-xs">
                  Click the chevron at bottom-left to expand/collapse sidebar (desktop)
                </div>
              </div>
            </div>

            <Link 
              to="/interaction-demo"
              onClick={() => setIsOpen(false)}
              className="block mt-4 text-center py-2 px-4 bg-[#A3E635] text-black rounded-lg font-medium hover:bg-[#A3E635]/90 transition-colors"
            >
              Full Documentation →
            </Link>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
