import { useState } from 'react';
import { useParams } from 'react-router';
import { Calendar, MapPin, Users, CheckCircle, Shield, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

export function EventDetail() {
  const { id } = useParams();
  const [joined, setJoined] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const event = {
    id: id,
    name: 'SoCal Cars & Coffee',
    coverImage: 'https://images.unsplash.com/photo-1692133208294-7e181628ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBtZWV0JTIwcGFya2luZyUyMGxvdHxlbnwxfHx8fDE3NzUwMjkyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    organizer: {
      username: 'organizer_pro',
      avatar: 'OP',
      verified: true,
    },
    date: 'Apr 15, 2026',
    time: '8:00 AM - 12:00 PM',
    location: 'Irvine Spectrum Center, 71 Fortune Dr, Irvine, CA',
    capacity: 200,
    registered: 156,
    description: 'Join us for the monthly SoCal Cars & Coffee meetup! All car enthusiasts welcome.',
    rules: [
      'No burnouts or aggressive driving in the parking area',
      'Respect all attendees and their vehicles',
      'Follow organizer and security instructions',
      'Keep the area clean',
    ],
    sponsors: ['AutoZone', 'Shell', 'Michelin'],
  };

  const capacityPercentage = (event.registered / event.capacity) * 100;
  const isFull = event.registered >= event.capacity;

  const handleConfirm = () => {
    setJoined(true);
    setModalOpen(false);
  };

  return (
    <div className="pb-12">
      {/* Hero Banner */}
      <div className="h-96 relative">
        <img src={event.coverImage} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#080D1A]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-32 relative">
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8 mb-6">
          <h1 className="mb-6">{event.name}</h1>

          {/* Organizer Card */}
          <div className="bg-[#0B1120] border border-white/[0.07] rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#A3E635] rounded-full flex items-center justify-center relative">
                <span className="text-black font-bold">{event.organizer.avatar}</span>
                {event.organizer.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#A3E635] rounded-full flex items-center justify-center border-2 border-[#0B1120]">
                    <CheckCircle className="w-3 h-3 text-black" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm text-[#6B7280]">Organized by</div>
                <div className="font-medium">@{event.organizer.username}</div>
              </div>
              {event.organizer.verified && (
                <div className="ml-auto">
                  <span className="px-3 py-1 bg-[#A3E635]/20 text-[#A3E635] text-sm rounded-full">
                    Verified Organizer
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Event Info Pills */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0B1120] border border-white/[0.07] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#A3E635]" />
                <div>
                  <div className="text-sm text-[#6B7280]">Date & Time</div>
                  <div className="font-medium">{event.date}</div>
                  <div className="text-sm">{event.time}</div>
                </div>
              </div>
            </div>
            <div className="bg-[#0B1120] border border-white/[0.07] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#A3E635]" />
                <div>
                  <div className="text-sm text-[#6B7280]">Location</div>
                  <div className="font-medium">{event.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="mb-3">About</h3>
            <p className="text-[#6B7280]">{event.description}</p>
          </div>

          {/* Rules */}
          <div className="bg-[#0B1120] border border-white/[0.07] rounded-xl p-6 mb-6">
            <h4 className="mb-4">Event Rules</h4>
            <ul className="space-y-2">
              {event.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="text-[#A3E635] mt-0.5">•</span>
                  <span className="text-[#6B7280]">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Capacity Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#6B7280]" />
                <span className="font-medium">Event Capacity</span>
              </div>
              <span className="font-medium">{event.registered}/{event.capacity}</span>
            </div>
            <Progress value={capacityPercentage} className="h-3 bg-[#1E293B]" />
          </div>

          {/* Permits Verified */}
          <div className="flex items-center gap-2 p-4 bg-[#A3E635]/10 border border-[#A3E635]/30 rounded-lg mb-6">
            <Shield className="w-5 h-5 text-[#A3E635]" />
            <span className="text-sm text-[#A3E635] font-medium">Permits Verified</span>
          </div>

          {/* Join this event */}
          <h4 className="mb-3 text-white/80">Join this event</h4>
          {isFull ? (
            <Button disabled className="w-full bg-[#1E293B] text-white/40 cursor-not-allowed h-12">
              Full
            </Button>
          ) : joined ? (
            <Button
              className="w-full bg-[#166534] text-[#A3E635] border border-[#A3E635]/40 hover:bg-[#166534]/80 cursor-default h-12"
            >
              Joined ✓
            </Button>
          ) : (
            <Button
              className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90 h-12"
              onClick={() => setModalOpen(true)}
            >
              Join Event
            </Button>
          )}
        </div>

        {/* Sponsors */}
        {event.sponsors.length > 0 && (
          <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-6">
            <h4 className="mb-4">Sponsored by</h4>
            <div className="flex flex-wrap gap-4">
              {event.sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="bg-[#0B1120] border border-white/[0.07] rounded-lg px-6 py-3"
                >
                  <span className="font-medium">{sponsor}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Your Spot Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative bg-[#0F172A] border border-white/[0.07] rounded-xl p-8 w-full max-w-md">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="mb-2">Confirm Your Spot</h3>
            <p className="text-[#6B7280] mb-6">
              You're about to join <span className="text-white font-medium">{event.name}</span> on{' '}
              {event.date} at {event.time.split(' - ')[0]}.
            </p>

            <div className="bg-[#0B1120] border border-white/[0.07] rounded-lg p-4 mb-6 space-y-2 text-sm">
              <div className="flex gap-2">
                <Calendar className="w-4 h-4 text-[#A3E635] mt-0.5 flex-shrink-0" />
                <span>{event.date}, {event.time}</span>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-[#A3E635] mt-0.5 flex-shrink-0" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/5"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
                onClick={handleConfirm}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
