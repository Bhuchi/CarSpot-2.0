import { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
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

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'organizer' | 'admin';
  posts: number;
  ratings: number;
  joinedAt: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'carspotter_23',
    email: 'carspotter@example.com',
    role: 'user',
    posts: 12,
    ratings: 34,
    joinedAt: '2025-12-15',
  },
  {
    id: '2',
    username: 'organizer_pro',
    email: 'organizer@example.com',
    role: 'organizer',
    posts: 8,
    ratings: 56,
    joinedAt: '2025-11-03',
  },
  {
    id: '3',
    username: 'luxury_rides',
    email: 'luxury@example.com',
    role: 'user',
    posts: 23,
    ratings: 78,
    joinedAt: '2026-01-20',
  },
];

export function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const getRoleBadge = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-[#EF4444] text-white">Admin</Badge>;
      case 'organizer':
        return <Badge className="bg-[#A3E635] text-black">Organizer</Badge>;
      case 'user':
        return <Badge className="bg-[#6B7280] text-white">User</Badge>;
    }
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    console.log(`Changing user ${userId} role to ${newRole}`);
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Deleting user ${userId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="mb-8">Manage Users</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search by username or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#0B1120] border-white/10 text-white placeholder:text-white/40"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-48 bg-[#0B1120] border-white/10">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-[#0F172A] border-white/10">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="organizer">Organizer</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0B1120] border-b border-white/[0.07]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Username</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Role</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Posts</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Ratings</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Joined</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6B7280]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                        <span className="text-black font-semibold text-sm">
                          {user.username[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium">@{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#6B7280]">{user.email}</span>
                  </td>
                  <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4">
                    <span className="text-[#6B7280]">{user.posts}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[#6B7280]">{user.ratings}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#6B7280]">{user.joinedAt}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleChangeRole(user.id, value)}
                      >
                        <SelectTrigger className="w-32 h-9 bg-[#0B1120] border-white/10 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0F172A] border-white/10">
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="organizer">Organizer</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-[#EF4444]/20 text-[#EF4444] hover:bg-[#EF4444]/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
          Previous
        </Button>
        <Button size="sm" className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
          1
        </Button>
        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
          2
        </Button>
        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
          3
        </Button>
        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
          Next
        </Button>
      </div>
    </div>
  );
}
