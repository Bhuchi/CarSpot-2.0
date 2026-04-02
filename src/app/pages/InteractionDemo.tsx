import { ArrowRight, MousePointerClick, Hand, Menu } from 'lucide-react';

export function InteractionDemo() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="mb-4">CarSpot 2.0 — Interaction Design</h1>
        <p className="text-lg text-white/70">
          Advanced gesture-based interactions and responsive layout patterns
        </p>
      </div>

      <div className="space-y-12">
        {/* Rating Slider */}
        <section className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#A3E635] rounded-xl flex items-center justify-center flex-shrink-0">
              <MousePointerClick className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">Rating Slider — Drag Gesture</h2>
              <p className="text-white/70">
                Enhanced slider interaction with real-time visual feedback
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Implementation Details</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="text-[#A3E635]">•</span>
                  <span><strong className="text-white">Resting State:</strong> Thumb positioned at midpoint (5/10)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A3E635]">•</span>
                  <span><strong className="text-white">Active Drag:</strong> Floating label appears above thumb showing current value</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A3E635]">•</span>
                  <span><strong className="text-white">Live Fill:</strong> Lime-green track expands/contracts in real-time</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A3E635]">•</span>
                  <span><strong className="text-white">Released State:</strong> Locks position, reveals community average</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Technical Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white font-medium mb-1">Mouse & Touch Support</div>
                  <div className="text-white/60">Works on desktop and mobile devices</div>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Fixed Positioning</div>
                  <div className="text-white/60">Label stays above thumb during scroll</div>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">State Management</div>
                  <div className="text-white/60">Tracks drag state with useRef hooks</div>
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Smooth Animations</div>
                  <div className="text-white/60">Fade-in and zoom-in on label appearance</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Swipe Gesture */}
        <section className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#A3E635] rounded-xl flex items-center justify-center flex-shrink-0">
              <Hand className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">Image Swipe — Quick Rate Gesture</h2>
              <p className="text-white/70">
                Swipeable post images with progressive overlay feedback
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Interaction States</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#1E293B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Idle State</div>
                    <div className="text-sm text-white/60">Image at rest, cursor shows grab icon</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#A3E635]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👍</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Mid-Swipe (50%)</div>
                    <div className="text-sm text-white/60">Green overlay at half opacity, thumbs-up icon scales</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#A3E635] rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Confirmed (80%+)</div>
                    <div className="text-sm text-white/60">Full overlay, snaps to rated state</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Swipe Mechanics</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-3 bg-[#0F172A] rounded-lg">
                  <span className="text-white/70">Swipe Threshold</span>
                  <span className="font-mono text-[#A3E635]">60% of card width</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#0F172A] rounded-lg">
                  <span className="text-white/70">Rating Mapping</span>
                  <span className="font-mono text-[#A3E635]">Distance × 10 = Score (1-10)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#0F172A] rounded-lg">
                  <span className="text-white/70">Overlay Opacity</span>
                  <span className="font-mono text-[#A3E635]">20% → 80% (scales linearly)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#0F172A] rounded-lg">
                  <span className="text-white/70">Icon Scale</span>
                  <span className="font-mono text-[#A3E635]">0.5 → 1.0 (grows with swipe)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar Layout */}
        <section className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#A3E635] rounded-xl flex items-center justify-center flex-shrink-0">
              <Menu className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
              <h2 className="mb-2">Sidebar — Push Layout Behavior</h2>
              <p className="text-white/70">
                Content shifts horizontally, never obscured by sidebar
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Layout Specifications</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Collapsed Width</span>
                    <span className="font-mono text-[#A3E635]">60px</span>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-[#060B16] to-transparent rounded" style={{ width: '60px' }}></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Expanded Width</span>
                    <span className="font-mono text-[#A3E635]">220px</span>
                  </div>
                  <div className="h-12 bg-gradient-to-r from-[#060B16] to-transparent rounded" style={{ width: '220px' }}></div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Transition Duration</span>
                    <span className="font-mono text-[#A3E635]">250ms ease-in-out</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-[#A3E635] via-[#A3E635]/50 to-transparent rounded"></div>
                </div>
              </div>
            </div>

            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Push vs. Overlay Comparison</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0F172A] rounded-lg border-2 border-[#A3E635]">
                  <div className="text-[#A3E635] font-bold mb-2">✓ Push Layout (Implemented)</div>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• Sidebar sits beside content</li>
                    <li>• Content shifts right when expanded</li>
                    <li>• Content reflows within narrower space</li>
                    <li>• Uses flexbox, not fixed positioning</li>
                  </ul>
                </div>
                <div className="p-4 bg-[#0F172A] rounded-lg border-2 border-red-500/30">
                  <div className="text-red-400 font-bold mb-2">✗ Overlay Layout (Avoided)</div>
                  <ul className="text-sm text-white/60 space-y-1">
                    <li>• Sidebar renders above content</li>
                    <li>• Content stays static behind it</li>
                    <li>• Content obscured during expansion</li>
                    <li>• Uses fixed positioning over content</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#0B1120] rounded-lg p-6">
              <h4 className="text-[#A3E635] mb-3">Try It Now</h4>
              <p className="text-sm text-white/60 mb-4">
                On desktop, click the chevron icon at the bottom of the sidebar to toggle between collapsed (60px) and expanded (220px) states. Watch how the main content smoothly shifts to the right without being covered.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <ArrowRight className="w-4 h-4" />
                <span>Look for the <span className="text-[#A3E635]">chevron button</span> in the bottom-left corner</span>
              </div>
            </div>
          </div>
        </section>

        {/* Component Files */}
        <section className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8">
          <h2 className="mb-6">Implementation Files</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-[#0B1120] rounded-lg">
              <div>
                <div className="font-medium font-mono text-sm text-[#A3E635]">/src/app/components/RatingSlider.tsx</div>
                <div className="text-xs text-white/60 mt-1">Enhanced slider with drag gesture and floating label</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0B1120] rounded-lg">
              <div>
                <div className="font-medium font-mono text-sm text-[#A3E635]">/src/app/components/SwipeablePostImage.tsx</div>
                <div className="text-xs text-white/60 mt-1">Swipeable image with progressive overlay and rating mapping</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0B1120] rounded-lg">
              <div>
                <div className="font-medium font-mono text-sm text-[#A3E635]">/src/app/components/Layout.tsx</div>
                <div className="text-xs text-white/60 mt-1">Sidebar with push layout behavior using flexbox</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0B1120] rounded-lg">
              <div>
                <div className="font-medium font-mono text-sm text-[#A3E635]">/src/styles/theme.css</div>
                <div className="text-xs text-white/60 mt-1">Animation utilities for fade-in and zoom effects</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testing Guide */}
        <section className="bg-[#A3E635]/10 border border-[#A3E635]/20 rounded-xl p-8">
          <h2 className="text-[#A3E635] mb-6">Testing Guide</h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold text-white mb-2">1. Rating Slider Drag Gesture</div>
              <ul className="space-y-1 text-white/80 ml-4">
                <li>• Go to the Feed page</li>
                <li>• Find an unrated post (posts 2 or 3)</li>
                <li>• Click and drag the slider thumb</li>
                <li>• Observe the floating value label above the thumb</li>
                <li>• Release to lock the rating</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">2. Image Swipe Gesture</div>
              <ul className="space-y-1 text-white/80 ml-4">
                <li>• On the same unrated post, click/touch the image</li>
                <li>• Drag right (don't use the slider this time)</li>
                <li>• Watch the green overlay fade in progressively</li>
                <li>• See the thumbs-up icon scale with swipe distance</li>
                <li>• Release past 60% to confirm rating</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-white mb-2">3. Sidebar Push Layout</div>
              <ul className="space-y-1 text-white/80 ml-4">
                <li>• On desktop, locate the chevron button at the bottom of the sidebar</li>
                <li>• Click to toggle between 60px and 220px widths</li>
                <li>• Observe the main content shifting right (not being covered)</li>
                <li>• Note the 250ms smooth transition</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
