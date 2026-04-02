import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

interface Event {
  id: string;
  name: string;
  coverImage: string;
  organizer: string;
  organizerVerified: boolean;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'SoCal Cars & Coffee',
    coverImage: 'https://images.unsplash.com/photo-1692133208294-7e181628ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWV0JTIwcGFya2luZyUyMGxvdHxlbnwxfHx8fDE3NzUwMjkyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'organizer_pro',
    organizerVerified: true,
    date: 'Apr 15, 2026',
    time: '8:00 AM',
    location: 'Irvine Spectrum Center',
    capacity: 200,
    registered: 156,
  },
  {
    id: '2',
    name: 'Sunset Drive Meetup',
    coverImage: 'https://images.unsplash.com/photo-1753047144334-ef092bb219e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJzJTIwZ2F0aGVyaW5nJTIwc3Vuc2V0fGVufDF8fHx8MTc3NTAyOTI2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'cruisemaster',
    organizerVerified: true,
    date: 'Apr 18, 2026',
    time: '6:00 PM',
    location: 'Malibu Coast',
    capacity: 50,
    registered: 42,
  },
  {
    id: '3',
    name: 'Import Tuner Showcase',
    coverImage: 'https://images.unsplash.com/photo-1646527825440-7239c534f3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzaG93JTIwZXZlbnR8ZW58MXx8fHwxNzc1MDI5MjY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: 'tuner_nation',
    organizerVerified: false,
    date: 'Apr 22, 2026',
    time: '10:00 AM',
    location: 'Long Beach Convention Center',
    capacity: 500,
    registered: 287,
  },
];

export function EventsFeed() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2>Upcoming Car Meets</h2>
        <Link to="/create-event">
          <Button className="bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
            Create Event
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setFilter('upcoming')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'upcoming'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter('past')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'past'
              ? 'bg-[#A3E635] text-black'
              : 'bg-[#0F172A] text-white/60 hover:text-white border border-white/[0.07]'
          }`}
        >
          Past
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {mockEvents.map((event) => {
          const capacityPercentage = (event.registered / event.capacity) * 100;
          return (
            <Link key={event.id} to={`/events/${event.id}`}>
              <article className="bg-[#0F172A] border border-white/[0.07] rounded-xl overflow-hidden hover:border-[#A3E635]/30 transition-colors group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={event.coverImage}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-3">{event.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-[#A3E635] rounded-full flex items-center justify-center text-xs">
                      <span className="text-black font-semibold">
                        {event.organizer[0].toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-[#6B7280]">@{event.organizer}</span>
                    {event.organizerVerified && (
                      <CheckCircle className="w-4 h-4 text-[#A3E635]" />
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#6B7280]" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-[#6B7280]" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-[#6B7280]">Capacity</span>
                      </div>
                      <span className="font-medium">{event.registered}/{event.capacity}</span>
                    </div>
                    <Progress value={capacityPercentage} className="h-2 bg-[#1E293B]" />
                  </div>

                  <Button className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90">
                    RSVP
                  </Button>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
