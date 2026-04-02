import { Trash2, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';

interface SavedPost {
  id: string;
  imageUrl: string;
  username: string;
  savedDate: string;
}

const mockSavedPosts: SavedPost[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1765597119545-6b481bd14d37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzcG9ydHMlMjBjYXIlMjBmcm9udHxlbnwxfHx8fDE3NzQ5NzUwNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'carspotter_23',
    savedDate: 'Saved 2 days ago',
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1752462091434-f204aad93153?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNwb3J0cyUyMGNhcnxlbnwxfHx8fDE3NzUwMjkxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    username: 'speed_demon',
    savedDate: 'Saved 1 week ago',
  },
];

export function Bookmarks() {
  const handleRemove = (postId: string) => {
    console.log(`Removing bookmark ${postId}`);
  };

  const handleViewPost = (postId: string) => {
    console.log(`Viewing post ${postId}`);
  };

  return (
    <div className="max-w-[560px] mx-auto px-6 py-12">
      <h2 className="mb-8">Saved Cars</h2>

      {mockSavedPosts.length === 0 ? (
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-12 text-center">
          <p className="text-[#6B7280] mb-4">No saved posts yet</p>
          <Button className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
            Explore Feed
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {mockSavedPosts.map((post) => (
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
                    <div className="text-sm text-[#6B7280]">{post.savedDate}</div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => handleViewPost(post.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/10 text-white hover:bg-white/5"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Post
                    </Button>
                    <Button
                      onClick={() => handleRemove(post.id)}
                      variant="outline"
                      size="sm"
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
      )}
    </div>
  );
}
