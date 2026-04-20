import { useState } from 'react';
import { useParams } from 'react-router';
import { Calendar, MapPin, Users, CheckCircle, Shield, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import {
  findEventById,
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

export function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(() => findEventById(id));
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(() => getJoinedEventIds());
  const [modalOpen, setModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl p-8 text-center">
          <h2 className="mb-3">Event Not Found</h2>
          <p className="text-[#6B7280]">This event is no longer available.</p>
        </div>
      </div>
    );
  }

  const capacityPercentage = (event.registered / event.capacity) * 100;
  const isFull = event.registered >= event.capacity;
  const joined = joinedEvents.has(event.id);
  const organizerAvatar = event.organizer
    .split(/[_\s-]+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'YO';

  const handleConfirm = () => {
    const updatedEvents = updateEventRegistration(event.id, 1);
    const updatedEvent = updatedEvents.find((item) => item.id === event.id);
    if (updatedEvent) setEvent(updatedEvent);
    setJoinedEvents((prev) => {
      const next = new Set(prev).add(event.id);
      saveJoinedEventIds(next);
      return next;
    });
    setModalOpen(false);
  };

  const handleCancelJoin = () => {
    const updatedEvents = updateEventRegistration(event.id, -1);
    const updatedEvent = updatedEvents.find((item) => item.id === event.id);
    if (updatedEvent) setEvent(updatedEvent);
    setJoinedEvents((prev) => {
      const next = new Set(prev);
      next.delete(event.id);
      saveJoinedEventIds(next);
      return next;
    });
    setCancelModalOpen(false);
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
                <span className="text-black font-bold">{organizerAvatar}</span>
                {event.organizerVerified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#A3E635] rounded-full flex items-center justify-center border-2 border-[#0B1120]">
                    <CheckCircle className="w-3 h-3 text-black" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm text-[#6B7280]">Organized by</div>
                <div className="font-medium">@{event.organizer}</div>
              </div>
              {event.organizerVerified && (
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
          {joined ? (
            <Button
              className="w-full bg-[#3F1D1D] text-[#FCA5A5] border border-[#EF4444]/40 hover:bg-[#4B1F1F] h-12"
              onClick={() => setCancelModalOpen(true)}
            >
              Cancel Join
            </Button>
          ) : isFull ? (
            <Button disabled className="w-full bg-[#1E293B] text-white/40 cursor-not-allowed h-12">
              Full
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

      <AlertDialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
        <AlertDialogContent className="bg-[#0F172A] border-white/[0.07] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel your join?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#6B7280]">
              Are you sure you want to cancel your spot for{' '}
              <span className="text-white font-medium">{event.name}</span>?
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
