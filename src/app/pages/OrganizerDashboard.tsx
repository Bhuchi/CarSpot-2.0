import { Link } from 'react-router';
import { Calendar, Users, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export function OrganizerDashboard() {
  const stats = [
    { label: 'Total Events', value: '12', icon: Calendar, color: '#A3E635' },
    { label: 'Total Attendees', value: '1,234', icon: Users, color: '#10B981' },
    { label: 'Active Events', value: '3', icon: TrendingUp, color: '#3B82F6' },
    { label: 'Rewards Given', value: '456', icon: Trophy, color: '#F59E0B' },
  ];

  const events = [
    { id: '1', name: 'SoCal Cars & Coffee', date: 'Apr 15, 2026', attendees: 156, status: 'upcoming' },
    { id: '2', name: 'Sunset Drive Meetup', date: 'Apr 18, 2026', attendees: 42, status: 'upcoming' },
    { id: '3', name: 'Spring Car Show', date: 'Mar 28, 2026', attendees: 203, status: 'completed' },
  ];

  const participants = [
    { id: '1', username: 'carspotter_23', avatar: 'CS', checkedIn: true },
    { id: '2', username: 'luxury_rides', avatar: 'LR', checkedIn: false },
    { id: '3', username: 'speed_demon', avatar: 'SD', checkedIn: true },
    { id: '4', username: 'muscle_mania', avatar: 'MM', checkedIn: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2>Organizer Dashboard</h2>
        <Link to="/create-event">
          <Button className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
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
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-[#6B7280]">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Events List */}
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
          <h3 className="mb-6">Your Events</h3>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="mb-1">{event.name}</h4>
                    <p className="text-sm text-[#6B7280]">{event.date}</p>
                  </div>
                  <Badge
                    className={
                      event.status === 'upcoming'
                        ? 'bg-[#A3E635] text-black'
                        : 'bg-[#6B7280] text-white'
                    }
                  >
                    {event.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#6B7280]" />
                    <span>{event.attendees} attendees</span>
                  </div>
                  {event.status === 'upcoming' && (
                    <Link to={`/live-activities/${event.id}`}>
                      <Button size="sm" className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                        Launch Live
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Participant Check-in */}
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
          <h3 className="mb-6">Participant Check-in</h3>
          <div className="space-y-3">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 bg-[#0B1120] border border-white/[0.07] rounded-lg p-4"
              >
                <div className="w-10 h-10 bg-[#A3E635] rounded-full flex items-center justify-center">
                  <span className="text-black font-semibold text-sm">{participant.avatar}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium">@{participant.username}</div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={participant.checkedIn}
                    className="w-5 h-5 accent-[#A3E635] rounded"
                    onChange={() => {}}
                  />
                  <span className="text-sm">{participant.checkedIn ? 'Checked in' : 'Check in'}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
