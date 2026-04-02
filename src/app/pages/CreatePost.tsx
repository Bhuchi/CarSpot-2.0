import { useState } from 'react';
import { Upload, X, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { AIBlurBadge } from '../components/AIBlurBadge';

export function CreatePost() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [matchedPosts, setMatchedPosts] = useState(2); // Mock matched posts out of 5

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
  };

  const handlePublish = () => {
    console.log('Publishing post...');
    // In real app, would submit to backend
  };

  const progressPercentage = (matchedPosts / 5) * 100;
  const isEligible = matchedPosts >= 5;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="mb-8">Create Post</h2>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Upload Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Zone */}
          {!uploadedImage ? (
            <label className="block border-2 border-dashed border-white/20 rounded-xl p-16 text-center hover:border-[#A3E635]/50 transition-colors cursor-pointer bg-[#0B1120]">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              <Upload className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-lg text-white/80 mb-2">Click or drag photo to upload</p>
              <p className="text-sm text-white/40">PNG, JPG up to 10MB</p>
            </label>
          ) : (
            <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
              <div className="relative">
                <img src={uploadedImage} alt="Uploaded car" className="w-full aspect-[4/3] object-cover" />
                <AIBlurBadge />
                <button
                  onClick={handleReset}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#A3E635]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div>
                  <h4 className="mb-1">Photo clarity</h4>
                  <p className="text-sm text-[#6B7280]">
                    Use well-lit photos with the car clearly visible for best results
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#A3E635]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-[#A3E635]" />
                </div>
                <div>
                  <h4 className="mb-1">Swipe to rate</h4>
                  <p className="text-sm text-[#6B7280]">Rate other cars to build your reputation and unlock features</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          {uploadedImage && (
            <div className="flex gap-3">
              <Button
                onClick={handlePublish}
                className="flex-1 bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
              >
                Publish Post
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
              >
                Reset
              </Button>
            </div>
          )}
        </div>

        {/* Right Panel - Posting Status */}
        <div className="space-y-6">
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <h4 className="mb-4">Posting Status</h4>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B7280]">Matched Posts</span>
                  <span className="font-medium">{matchedPosts}/5</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-[#1E293B]" />
              </div>

              <div
                className={`p-4 rounded-lg ${
                  isEligible ? 'bg-[#A3E635]/20 border border-[#A3E635]/30' : 'bg-[#F59E0B]/20 border border-[#F59E0B]/30'
                }`}
              >
                <p className={`text-sm ${isEligible ? 'text-[#A3E635]' : 'text-[#F59E0B]'}`}>
                  {isEligible
                    ? '✓ You can post unlimited content'
                    : `Rate ${5 - matchedPosts} more cars to unlock unlimited posting`}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.07]">
                <h4 className="text-sm mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Total Posts</span>
                    <span>12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Total Ratings</span>
                    <span>34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Avg Given</span>
                    <span>7.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
