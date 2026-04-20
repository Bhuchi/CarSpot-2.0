import { useState } from 'react';
import { Link } from 'react-router';
import { Calendar, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import {
  getEvents,
  getJoinedEventIds,
  saveJoinedEventIds,
  updateEventRegistration,
} from '../lib/events';
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

export function EventsFeed() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [events, setEvents] = useState(() => getEvents());
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(() => getJoinedEventIds());
  const [pendingCancelEventId, setPendingCancelEventId] = useState<string | null>(null);

  const handleJoin = (e: React.MouseEvent, eventId: string, isFull: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFull || joinedEvents.has(eventId)) return;

    setEvents(updateEventRegistration(eventId, 1));
    setJoinedEvents((prev) => {
      const next = new Set(prev).add(eventId);
      saveJoinedEventIds(next);
      return next;
    });
  };

  const handleCancelRequest = (e: React.MouseEvent, eventId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setPendingCancelEventId(eventId);
  };

  const handleCancelJoin = () => {
    if (!pendingCancelEventId) return;

    setEvents(updateEventRegistration(pendingCancelEventId, -1));
    setJoinedEvents((prev) => {
      const next = new Set(prev);
      next.delete(pendingCancelEventId);
      saveJoinedEventIds(next);
      return next;
    });
    setPendingCancelEventId(null);
  };

  const pendingCancelEvent = events.find((event) => event.id === pendingCancelEventId);

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
        {events.map((event) => {
          const capacityPercentage = (event.registered / event.capacity) * 100;
          const isFull = event.registered >= event.capacity;
          const isJoined = joinedEvents.has(event.id);

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

                  {isJoined ? (
                    <Button
                      className="w-full bg-[#3F1D1D] text-[#FCA5A5] border border-[#EF4444]/40 hover:bg-[#4B1F1F]"
                      onClick={(e) => handleCancelRequest(e, event.id)}
                    >
                      Cancel Join
                    </Button>
                  ) : isFull ? (
                    <Button disabled className="w-full bg-[#1E293B] text-white/40 cursor-not-allowed">
                      Full
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-[#A3E635] text-black hover:bg-[#A3E635]/90"
                      onClick={(e) => handleJoin(e, event.id, isFull)}
                    >
                      Join Event
                    </Button>
                  )}
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <AlertDialog open={Boolean(pendingCancelEventId)} onOpenChange={(open) => !open && setPendingCancelEventId(null)}>
        <AlertDialogContent className="bg-[#0F172A] border-white/[0.07] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel your join?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B7280]">
              Are you sure you want to cancel your spot for{' '}
              <span className="text-white font-medium">{pendingCancelEvent?.name || 'this event'}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/5">
              Keep Joined
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#EF4444] text-white hover:bg-[#DC2626]"
              onClick={handleCancelJoin}
            >
              Cancel Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
