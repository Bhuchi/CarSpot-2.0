import { Star, Upload } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function ComponentLibrary() {
  return (
    <div className="p-12 space-y-16">
      <div>
        <h1 className="mb-2">CarSpot 2.0 Component Library</h1>
        <p className="text-[#6B7280]">Design system components with Inter font and lime-green accent</p>
      </div>

      {/* Buttons */}
      <section>
        <h3 className="mb-6">Buttons</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <Button className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">Primary Button</Button>
            <Button className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90" disabled>
              Primary Disabled
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              Ghost Outline
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" disabled>
              Ghost Disabled
            </Button>
          </div>
          <div className="flex gap-4 items-center">
            <Button className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90">Destructive</Button>
            <Button className="bg-[#EF4444] text-white hover:bg-[#EF4444]/90" disabled>
              Destructive Disabled
            </Button>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h3 className="mb-6">Status Badges</h3>
        <div className="flex gap-3">
          <Badge className="bg-[#A3E635] text-black">Published</Badge>
          <Badge className="bg-[#F59E0B] text-black">Pending</Badge>
          <Badge className="bg-[#EF4444] text-white">Rejected</Badge>
          <Badge className="bg-[#6B7280] text-white">Deleted</Badge>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h3 className="mb-6">Card Styles</h3>
        <div className="grid grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <h4 className="mb-2">Standard Card</h4>
            <p className="text-[#6B7280] text-sm">
              Background #0F172A with 1px border at rgba(255,255,255,0.07)
            </p>
          </div>
          <div className="bg-[#0B1120] border border-white/[0.07] rounded-xl p-6">
            <h4 className="mb-2">Alt Card</h4>
            <p className="text-[#6B7280] text-sm">Background #0B1120 for beneath-card areas</p>
          </div>
        </div>
      </section>

      {/* AI Censorship Badge */}
      <section>
        <h3 className="mb-6">AI Censorship Component</h3>
        <div className="max-w-md relative">
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
              {/* Simulated blurred plate area */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-10 bg-black" />
              {/* AI Badge */}
              <div className="absolute bottom-3 left-3">
                <Badge className="bg-[#A3E635] text-black text-xs">Plates and faces auto-blurred</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Zone */}
      <section>
        <h3 className="mb-6">Upload Zone</h3>
        <div className="max-w-md">
          <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-[#A3E635]/50 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <p className="text-white/60">Click or drag photo to upload</p>
          </div>
        </div>
      </section>

      {/* Rating Slider States */}
      <section>
        <h3 className="mb-6">Rating Slider (1-10)</h3>
        <div className="space-y-6 max-w-md">
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <p className="text-sm text-[#6B7280] mb-3">Unrated State</p>
            <input type="range" min="1" max="10" className="w-full accent-[#A3E635]" />
            <p className="text-xs text-white/40 mt-2">Rate to reveal average</p>
          </div>
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <p className="text-sm text-[#6B7280] mb-3">Rated State (Locked)</p>
            <input type="range" min="1" max="10" value="8" className="w-full accent-[#A3E635]" disabled />
            <div className="flex items-center gap-2 mt-2">
              <Star className="w-4 h-4 text-[#A3E635] fill-[#A3E635]" />
              <span className="text-sm">Community Average: 7.8</span>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Scale */}
      <section>
        <h3 className="mb-6">Typography Scale</h3>
        <div className="space-y-4">
          <div>
            <h1>Heading 1 (28px bold)</h1>
          </div>
          <div>
            <h2>Heading 2 (24px bold)</h2>
          </div>
          <div>
            <h3>Section Title (20px semi-bold)</h3>
          </div>
          <div>
            <h4>Subsection (18px semi-bold)</h4>
          </div>
          <div>
            <p>Body text (14-15px regular) with normal weight for reading</p>
          </div>
          <div>
            <p className="text-xs text-[#6B7280]">Meta text (12px) in #6B7280</p>
          </div>
        </div>
      </section>
    </div>
  );
}
