import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { CalendarCheck, CheckCircle, ExternalLink, MapPin, Trash2, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { getEvents, getJoinedEventIds } from '../lib/events';
import {
  deleteCreatedPost,
  getCreatedPosts,
  getFeedPosts,
  getSavedPostIds,
  getSavedPosts,
  saveSavedPostIds,
} from '../lib/posts';

export function Profile() {
  const { username } = useParams();
  const isOwnProfile = !username || username === 'currentuser';
  const isVerifiedOrganizer = username === 'organizer_pro';
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'events'>('posts');
  const [savedPosts, setSavedPosts] = useState(() => getSavedPosts());
  const [userPosts, setUserPosts] = useState(() => isOwnProfile ? getCreatedPosts() : getFeedPosts());
  const [pendingDeletePostId, setPendingDeletePostId] = useState<string | null>(null);
  const [joinedEvents] = useState(() => {
    const joinedEventIds = getJoinedEventIds();
    return getEvents().filter((event) => joinedEventIds.has(event.id));
  });

  const profileData = {
    username: username || 'currentuser',
    displayName: isVerifiedOrganizer ? 'Pro Organizer' : 'Car Enthusiast',
    avatar: isVerifiedOrganizer ? 'PO' : 'CE',
    coverImage: 'https://images.unsplash.com/photo-1664329182873-449e6a282384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNhciUyMHBhdHRlcm4lMjBiYW5uZXJ8ZW58MXx8fHwxNzc1MDI5MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    posts: userPosts.length,
    followers: 234,
    following: 89,
    carProfile: {
      make: 'BMW',
      model: 'M3 Competition',
      year: 2024,
      color: 'Alpine White',
    },
  };

  const handleRemoveSavedPost = (postId: string) => {
    const nextSavedPostIds = getSavedPostIds();
    nextSavedPostIds.delete(postId);
    saveSavedPostIds(nextSavedPostIds);
    setSavedPosts(getSavedPosts());
  };

  const handleConfirmDeletePost = () => {
    if (!isOwnProfile || !pendingDeletePostId) return;
    const nextPosts = deleteCreatedPost(pendingDeletePostId);
    setUserPosts(nextPosts);
    setSavedPosts(getSavedPosts());
    setPendingDeletePostId(null);
  };

  const pendingDeletePost = userPosts.find((post) => post.id === pendingDeletePostId);

  return (
    <div className="pb-12">
      {/* Cover Banner */}
      <div className="h-64 relative">
        <img src={profileData.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080D1A]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-20 relative">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-[#A3E635] rounded-full flex items-center justify-center border-4 border-[#080D1A]">
              <span className="text-black font-bold text-3xl">{profileData.avatar}</span>
            </div>
            {isVerifiedOrganizer && (
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#A3E635] rounded-full flex items-center justify-center border-2 border-[#080D1A]">
                <CheckCircle className="w-5 h-5 text-black" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2>@{profileData.username}</h2>
              {isVerifiedOrganizer && (
                <span className="px-3 py-1 bg-[#A3E635]/20 text-[#A3E635] text-sm rounded-full">
                  Verified Organizer
                </span>
              )}
            </div>
            <p className="text-[#6B7280]">{profileData.displayName}</p>
          </div>

          {isOwnProfile && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => setActiveTab('events')}
              >
                <CalendarCheck className="w-4 h-4 mr-2" />
                Joined Events
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-6 pb-6 border-b border-white/[0.07]">
          <div className="text-center">
            <div className="text-2xl font-bold">{profileData.posts}</div>
            <div className="text-sm text-[#6B7280]">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profileData.followers}</div>
            <div className="text-sm text-[#6B7280]">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profileData.following}</div>
            <div className="text-sm text-[#6B7280]">Following</div>
          </div>
        </div>

        {/* Car Profile Card */}
        <div className="mb-8">
          <h3 className="mb-4">Car Profile</h3>
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Make & Model</div>
                <div className="font-medium">{profileData.carProfile.make} {profileData.carProfile.model}</div>
              </div>
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Year</div>
                <div className="font-medium">{profileData.carProfile.year}</div>
              </div>
              <div>
                <div className="text-sm text-[#6B7280] mb-1">Color</div>
                <div className="font-medium">{profileData.carProfile.color}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts / Saved Tabs */}
        <div className="flex border-b border-white/[0.07] mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'posts'
                ? 'text-white'
                : 'text-[#6B7280] hover:text-white/80'
            }`}
          >
            Posts
            {activeTab === 'posts' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3E635]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'saved'
                ? 'text-white'
                : 'text-[#6B7280] hover:text-white/80'
            }`}
          >
            Saved
            {activeTab === 'saved' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3E635]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'events'
                ? 'text-white'
                : 'text-[#6B7280] hover:text-white/80'
            }`}
          >
            Joined Events
            {activeTab === 'events' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A3E635]" />
            )}
          </button>
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          userPosts.length === 0 ? (
            <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-12 text-center">
              <p className="text-[#6B7280]">No posts yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {userPosts.map((post, index) => (
                <div key={post.id} className="group relative aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity">
                  <img src={post.imageUrl} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      size="sm"
                      aria-label="Delete post"
                      onClick={() => setPendingDeletePostId(post.id)}
                      className="absolute top-2 right-2 h-9 w-9 p-0 border-[#EF4444]/40 bg-black/70 text-[#FCA5A5] hover:bg-[#EF4444] hover:text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          savedPosts.length === 0 ? (
            <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-12 text-center">
              <p className="text-[#6B7280] mb-4">No saved posts yet</p>
              <Button asChild className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                <Link to="/">Explore Feed</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <img
                      src={post.imageUrl}
                      alt="Saved car"
                      className="w-full sm:w-48 h-48 object-cover"
                    />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <div className="font-medium mb-1">@{post.username}</div>
                        <div className="text-sm text-[#6B7280]">Saved from feed</div>
                        <div className="text-xs text-white/40 mt-1">Rate this car to reveal the average</div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1 border-white/10 text-white hover:bg-white/5"
                        >
                          <Link to="/">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Post
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveSavedPost(post.id)}
                          className="border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )
        )}

        {/* Joined Events Tab */}
        {activeTab === 'events' && (
          joinedEvents.length === 0 ? (
            <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-12 text-center">
              <p className="text-[#6B7280] mb-4">No joined events yet</p>
              <Button asChild className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                <Link to="/events">Browse Events</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {joinedEvents.map((event) => (
                <article key={event.id} className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img src={event.coverImage} alt={event.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-3">{event.name}</h3>
                    <div className="space-y-2 text-sm text-[#6B7280] mb-4">
                      <div className="flex items-center gap-2">
                        <CalendarCheck className="w-4 h-4 text-[#A3E635]" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#A3E635]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#A3E635]" />
                        <span>{event.registered}/{event.capacity} joined</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                      <Link to={`/events/${event.id}`}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Event
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )
        )}
      </div>

      <AlertDialog open={Boolean(pendingDeletePostId)} onOpenChange={(open) => !open && setPendingDeletePostId(null)}>
        <AlertDialogContent className="bg-[#0F172A] border-white/[0.07] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B7280]">
              Are you sure you want to delete this post? It will be removed from your profile, the feed, and saved posts.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {pendingDeletePost && (
            <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg overflow-hidden">
              <img src={pendingDeletePost.imageUrl} alt="Post selected for deletion" className="w-full h-40 object-cover" />
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/5">
              Keep Post
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#EF4444] text-white hover:bg-[#DC2626]"
              onClick={handleConfirmDeletePost}
            >
              Delete Post
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
