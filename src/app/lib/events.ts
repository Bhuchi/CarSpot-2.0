export interface CarSpotEvent {
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
  description: string;
  rules: string[];
  sponsors: string[];
}

const EVENTS_STORAGE_KEY = 'carspot-events';
const JOINED_EVENTS_STORAGE_KEY = 'carspot-joined-events';

export const fallbackEventImages = [
  'https://images.unsplash.com/photo-1692133208294-7e181628ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1753047144334-ef092bb219e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1646527825440-7239c534f3a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1080',
];

export const defaultEvents: CarSpotEvent[] = [
  {
    id: '1',
    name: 'SoCal Cars & Coffee',
    coverImage: fallbackEventImages[0],
    organizer: 'organizer_pro',
    organizerVerified: true,
    date: 'Apr 15, 2026',
    time: '8:00 AM',
    location: 'Irvine Spectrum Center',
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
  },
  {
    id: '2',
    name: 'Sunset Drive Meetup',
    coverImage: fallbackEventImages[1],
    organizer: 'cruisemaster',
    organizerVerified: true,
    date: 'Apr 18, 2026',
    time: '6:00 PM',
    location: 'Malibu Coast',
    capacity: 50,
    registered: 42,
    description: 'Cruise the coast before sunset and meet up for photos, food trucks, and relaxed car talk.',
    rules: [
      'Arrive with enough fuel for the route',
      'Keep a safe distance during the cruise',
      'No racing or street takeovers',
      'Follow all posted traffic rules',
    ],
    sponsors: ['Shell', 'Malibu Auto Detail'],
  },
  {
    id: '3',
    name: 'Import Tuner Showcase',
    coverImage: fallbackEventImages[2],
    organizer: 'tuner_nation',
    organizerVerified: false,
    date: 'Apr 22, 2026',
    time: '10:00 AM',
    location: 'Long Beach Convention Center',
    capacity: 500,
    registered: 287,
    description: 'A full-day showcase for custom import builds, vendor booths, and judged categories.',
    rules: [
      'Display vehicles must check in before 9:00 AM',
      'Keep audio demonstrations within venue limits',
      'No open flames or unsafe modifications indoors',
      'Respect judges, vendors, and attendees',
    ],
    sponsors: ['Michelin', 'Valvoline', 'Tuner Works'],
  },
];

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage);

export function getEvents() {
  if (!canUseStorage()) return defaultEvents;

  const storedEvents = window.localStorage.getItem(EVENTS_STORAGE_KEY);
  if (!storedEvents) {
    saveEvents(defaultEvents);
    return defaultEvents;
  }

  try {
    const parsedEvents = JSON.parse(storedEvents) as CarSpotEvent[];
    if (!Array.isArray(parsedEvents)) return defaultEvents;
    return parsedEvents;
  } catch {
    return defaultEvents;
  }
}

export function saveEvents(events: CarSpotEvent[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
}

export function addEvent(event: CarSpotEvent) {
  const events = [event, ...getEvents()];
  saveEvents(events);
  return events;
}

export function findEventById(eventId: string | undefined) {
  return getEvents().find((event) => event.id === eventId);
}

export function updateEventRegistration(eventId: string, delta: 1 | -1) {
  const events = getEvents().map((event) => {
    if (event.id !== eventId) return event;

    return {
      ...event,
      registered: Math.max(0, Math.min(event.capacity, event.registered + delta)),
    };
  });

  saveEvents(events);
  return events;
}

export function getJoinedEventIds() {
  if (!canUseStorage()) return new Set<string>();

  try {
    const parsedIds = JSON.parse(window.localStorage.getItem(JOINED_EVENTS_STORAGE_KEY) || '[]');
    return new Set<string>(Array.isArray(parsedIds) ? parsedIds : []);
  } catch {
    return new Set<string>();
  }
}

export function saveJoinedEventIds(joinedEventIds: Set<string>) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(JOINED_EVENTS_STORAGE_KEY, JSON.stringify(Array.from(joinedEventIds)));
}

export function formatEventDate(dateValue: string) {
  if (!dateValue) return 'Date not set';
  const date = new Date(`${dateValue}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatEventTime(timeValue: string) {
  if (!timeValue) return 'Time not set';
  const [hours, minutes] = timeValue.split(':').map(Number);
  const date = new Date();
  date.setHours(hours || 0, minutes || 0, 0, 0);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function pickFallbackEventImage(seed: string) {
  const charTotal = seed.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
  return fallbackEventImages[charTotal % fallbackEventImages.length];
}
