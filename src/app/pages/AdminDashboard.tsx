import { Link } from 'react-router';
import { Users, FileText, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const newUsersData = [
  { month: 'Oct', users: 120 },
  { month: 'Nov', users: 180 },
  { month: 'Dec', users: 240 },
  { month: 'Jan', users: 320 },
  { month: 'Feb', users: 380 },
  { month: 'Mar', users: 450 },
];

const moderationQueue = [
  { id: '1', type: 'post', user: 'carspotter_23', reason: 'Inappropriate content', status: 'pending' },
  { id: '2', type: 'user', user: 'spammer_bot', reason: 'Spam activity', status: 'pending' },
  { id: '3', type: 'comment', user: 'angry_user', reason: 'Harassment', status: 'pending' },
];

const recentRatings = [
  { user: 'carspotter_23', rating: 9, target: 'BMW M3', time: '2m ago' },
  { user: 'luxury_rides', rating: 8, target: 'Porsche 911', time: '5m ago' },
  { user: 'speed_demon', rating: 7, target: 'Nissan GT-R', time: '12m ago' },
];

export function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,847', change: '+12%', icon: Users, color: '#A3E635' },
    { label: 'Total Posts', value: '3,421', change: '+8%', icon: FileText, color: '#10B981' },
    { label: 'Pending Moderation', value: '23', change: '-5%', icon: AlertCircle, color: '#F59E0B' },
    { label: 'Active Events', value: '12', change: '+3', icon: TrendingUp, color: '#3B82F6' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="mb-8">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <span className="text-sm text-[#A3E635]">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-[#6B7280]">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* New Users Chart */}
        <div className="lg:col-span-2 bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
          <h3 className="mb-6">New Users</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={newUsersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="users" stroke="#A3E635" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Ratings Sidebar */}
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
          <h3 className="mb-6">Recent Ratings</h3>
          <div className="space-y-4">
            {recentRatings.map((rating, index) => (
              <div key={index} className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">@{rating.user}</span>
                  <span className="text-lg font-bold text-[#A3E635]">{rating.rating}/10</span>
                </div>
                <div className="text-sm text-[#6B7280]">{rating.target}</div>
                <div className="text-xs text-[#6B7280] mt-2">{rating.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <div className="mt-8 bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3>Moderation Queue</h3>
          <Link to="/admin/posts">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              View All
            </Button>
          </Link>
        </div>
        <div className="space-y-3">
          {moderationQueue.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
              <Badge className="bg-[#F59E0B] text-black">{item.type}</Badge>
              <div className="flex-1">
                <div className="font-medium">@{item.user}</div>
                <div className="text-sm text-[#6B7280]">{item.reason}</div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                  Review
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
