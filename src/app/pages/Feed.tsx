import { useState } from 'react';
import { Search, Bookmark, Share2, Flag, Info } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { RatingSlider } from '../components/RatingSlider';
import { AIBlurBadge, AIBlurOverlay } from '../components/AIBlurBadge';
import { ReportModal } from '../components/ReportModal';
import { SwipeablePostImage } from '../components/SwipeablePostImage';
import { Link } from 'react-router';

interface Post {
  id: string;
  imageUrl: string;
  username: string;
  userAvatar: string;
  userRating?: number;
  communityAverage?: number;
  hasAIBlur?: boolean;
  timestamp: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1765597119545-6b481bd14d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzcG9ydHMlMjBjYXIlMjBmcm9udHxlbnwxfHx8fDE3NzQ5NzUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'carspotter_23',
    userAvatar: 'CS',
    userRating: 9,
    communityAverage: 8.7,
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1716066242980-c864821b1b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwbHV4dXJ5JTIwc2VkYW58ZW58MXx8fHwxNzc0OTY4NTQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'luxury_rides',
    userAvatar: 'LR',
    hasAIBlur: true,
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1752462091434-f204aad93153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzUwMjkxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'speed_demon',
    userAvatar: 'SD',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1717954864026-538ebacfe601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG11c2NsZSUyMGNhcnxlbnwxfHx8fDE3NzUwMjkxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'muscle_mania',
    userAvatar: 'MM',
    userRating: 7,
    communityAverage: 8.2,
    timestamp: '2 days ago',
  },
];

export function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn] = useState(true); // Mock logged in state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportPostId, setReportPostId] = useState('');
  const [posts, setPosts] = useState(mockPosts);

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

  return (
    <div className="max-w-[560px] mx-auto px-6 py-12">
      {/* Interaction Instructions */}
      <div className="mb-6 bg-[#A3E635]/10 border border-[#A3E635]/20 rounded-xl p-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-[#A3E635]">✨ New Rating Interactions</h3>
          <Link to="/interaction-demo">
            <Button variant="ghost" size="sm" className="text-[#A3E635] hover:bg-[#A3E635]/10 -mt-1">
              <Info className="w-4 h-4 mr-1" />
              Learn More
            </Button>
          </Link>
        </div>
        <div className="text-sm text-white/80 space-y-1">
          <p>• <strong>Swipe right on images</strong> to quick-rate (distance = score)</p>
          <p>• <strong>Drag the slider</strong> to see live rating value above thumb</p>
          <p>• <strong>Toggle the sidebar</strong> (desktop) to see push layout in action</p>
        </div>
      </div>

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
              {post.hasAIBlur && (
                <>
                  <AIBlurOverlay className="bottom-12 left-1/2 -translate-x-1/2 w-32 h-10" />
                  <AIBlurBadge />
                </>
              )}
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
                  className="flex-1 border-white/10 text-white hover:bg-white/5"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
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