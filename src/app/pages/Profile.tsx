import { useParams } from 'react-router';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Profile() {
  const { username } = useParams();
  const isOwnProfile = !username || username === 'currentuser';
  const isVerifiedOrganizer = username === 'organizer_pro';

  const profileData = {
    username: username || 'currentuser',
    displayName: isVerifiedOrganizer ? 'Pro Organizer' : 'Car Enthusiast',
    avatar: isVerifiedOrganizer ? 'PO' : 'CE',
    coverImage: 'https://images.unsplash.com/photo-1664329182873-449e6a282384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNhciUyMHBhdHRlcm4lMjBiYW5uZXJ8ZW58MXx8fHwxNzc1MDI5MjE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    posts: 12,
    followers: 234,
    following: 89,
    carProfile: {
      make: 'BMW',
      model: 'M3 Competition',
      year: 2024,
      color: 'Alpine White',
    },
  };

  const userPosts = [
    'https://images.unsplash.com/photo-1765597119545-6b481bd14d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzcG9ydHMlMjBjYXIlMjBmcm9udHxlbnwxfHx8fDE3NzQ5NzUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1752462091434-f204aad93153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzUwMjkxNTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1716066242980-c864821b1b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwbHV4dXJ5JTIwc2VkYW58ZW58MXx8fHwxNzc0OTY4NTQ4fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1717954864026-538ebacfe601?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG11c2NsZSUyMGNhcnxlbnwxfHx8fDE3NzUwMjkxNTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
  ];

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
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
            >
              Edit Profile
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-8 pb-8 border-b border-white/[0.07]">
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

        {/* Posts Grid */}
        <div>
          <h3 className="mb-4">Posts</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {userPosts.map((postUrl, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                <img src={postUrl} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
