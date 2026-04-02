import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface Post {
  id: string;
  thumbnail: string;
  username: string;
  avgRating: number;
  totalRatings: number;
  status: 'published' | 'pending' | 'rejected' | 'deleted';
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1765597119545-6b481bd14d37?w=200',
    username: 'carspotter_23',
    avgRating: 8.7,
    totalRatings: 45,
    status: 'published',
    createdAt: '2024-03-28',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1716066242980-c864821b1b67?w=200',
    username: 'luxury_rides',
    avgRating: 7.2,
    totalRatings: 23,
    status: 'published',
    createdAt: '2024-03-27',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1752462091434-f204aad93153?w=200',
    username: 'speed_demon',
    avgRating: 0,
    totalRatings: 0,
    status: 'pending',
    createdAt: '2024-03-29',
  },
];

export function AdminPosts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: Post['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-[#A3E635] text-black">Published</Badge>;
      case 'pending':
        return <Badge className="bg-[#F59E0B] text-black">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-[#EF4444] text-white">Rejected</Badge>;
      case 'deleted':
        return <Badge className="bg-[#6B7280] text-white">Deleted</Badge>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="mb-8">Manage Posts</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#0B1120] border-white/10 text-white placeholder:text-white/40"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-[#0B1120] border-white/10">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-[#0F172A] border-white/10">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts Table */}
      <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0B1120] border-b border-white/[0.07]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Thumbnail</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">User</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Avg Rating</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Ratings</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Created</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {mockPosts.map((post) => (
                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <img src={post.thumbnail} alt="Post" className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">@{post.username}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#A3E635]">
                      {post.avgRating > 0 ? post.avgRating.toFixed(1) : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#6B7280]">{post.totalRatings}</span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(post.status)}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">{post.createdAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
