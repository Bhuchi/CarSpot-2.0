import { useState } from 'react';
import { Search, Bookmark, Share2, Flag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RatingSlider } from '../components/RatingSlider';
import { AIBlurBadge } from '../components/AIBlurBadge';
import { ReportModal } from '../components/ReportModal';
import { SwipeablePostImage } from '../components/SwipeablePostImage';
import { getFeedPosts, getSavedPostIds, saveSavedPostIds } from '../lib/posts';

export function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn] = useState(true); // Mock logged in state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportPostId, setReportPostId] = useState('');
  const [posts, setPosts] = useState(() => getFeedPosts());
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(() => getSavedPostIds());

  const handleRate = (postId: string, rating: number) => {
    console.log(`Rated post ${postId} with ${rating}`);
    // Update the post with the rating
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, userRating: rating, communityAverage: (rating + (post.communityAverage || rating)) / 2 }
        : post
    ));
  };

  const handleSwipeRate = (postId: string, rating: number) => {
    console.log(`Swipe rated post ${postId} with ${rating}`);
    handleRate(postId, rating);
  };

  const handleReport = (postId: string) => {
    setReportPostId(postId);
    setReportModalOpen(true);
  };

  const handleSave = (postId: string) => {
    setSavedPostIds((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      saveSavedPostIds(next);
      return next;
    });
  };

  return (
    <div className="max-w-[560px] mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="mb-6">Latest Posts</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#0B1120] border-white/10 text-white placeholder:text-white/40"
          />
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
            {/* User Info */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                <span className="text-black font-semibold text-sm">{post.userAvatar}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">{post.username}</div>
                <div className="text-xs text-[#6B7280]">{post.timestamp}</div>
              </div>
            </div>

            {/* Image with Swipe Gesture */}
            <SwipeablePostImage
              imageUrl={post.imageUrl}
              alt="Car post"
              hasRated={!!post.userRating}
              onSwipeRate={(rating) => handleSwipeRate(post.id, rating)}
            >
              <AIBlurBadge />
            </SwipeablePostImage>

            {/* Content */}
            <div className="p-4">
              <RatingSlider
                postId={post.id}
                userRating={post.userRating}
                communityAverage={post.communityAverage}
                isLoggedIn={isLoggedIn}
                onRate={(rating) => handleRate(post.id, rating)}
              />

              {/* Actions */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.07]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSave(post.id)}
                  className={`flex-1 ${
                    savedPostIds.has(post.id)
                      ? 'border-[#A3E635]/40 bg-[#A3E635]/10 text-[#A3E635] hover:bg-[#A3E635]/15'
                      : 'border-white/10 text-white hover:bg-white/5'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 mr-2 ${savedPostIds.has(post.id) ? 'fill-current' : ''}`} />
                  {savedPostIds.has(post.id) ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-white/10 text-white hover:bg-white/5"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleReport(post.id)}
                  className="border-white/10 text-white/60 hover:bg-white/5"
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        contentType="post"
        contentId={reportPostId}
      />
    </div>
  );
}
