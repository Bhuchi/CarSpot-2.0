# CarSpot 2.0

A comprehensive car enthusiast social platform built with React, TypeScript, and Tailwind CSS.

## Features

### User Features
- **Feed**: Browse and rate car posts with interactive 1-10 slider
- **Create Post**: Upload car photos with AI-powered plate/face blurring
- **Bookmarks**: Save and manage favorite posts
- **Profile**: Customizable user profiles with car details
- **Messages**: Direct messaging between users

### Event Features
- **Events Feed**: Discover upcoming car meets and shows
- **Event Detail**: View full event information with RSVP
- **Create Event**: Multi-step event creation with permits and sponsors
- **Live Activities**: Real-time voting, quizzes, and leaderboards
- **Organizer Dashboard**: Manage events and check-in participants

### Rewards
- **Coupons**: Earn and redeem rewards from event sponsors
- **QR Codes**: Digital coupon codes for redemption

### Admin Features
- **Dashboard**: Overview with stats and charts
- **Post Management**: Moderate and review all posts
- **User Management**: Manage user roles and permissions
- **Organizer Verification**: Approve organizer applications

## Design System

### Colors
- **Primary Background**: `#080D1A`
- **Card Background**: `#0F172A`
- **Accent (Lime Green)**: `#A3E635`
- **Sidebar Background**: `#060B16`
- **Text Gray**: `#6B7280`

### Typography
- **Font Family**: Inter
- **Headings**: 24-28px bold
- **Section Titles**: 18-20px semi-bold
- **Body**: 14-15px regular
- **Meta**: 12px

### Components
- Primary buttons with lime-green background
- Ghost outline buttons
- Destructive red buttons
- Status badges (published, pending, rejected, deleted)
- Rating slider with community averages
- AI blur badges for privacy
- Progress bars and steppers

## Tech Stack

- **React** 18.3.1
- **React Router** 7.13.0
- **TypeScript**
- **Tailwind CSS** 4.1.12
- **Radix UI** components
- **Recharts** for data visualization
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Routes

### Public Routes
- `/login` - Sign in
- `/signup` - Create account

### User Routes
- `/` - Feed
- `/create-post` - Upload car photos
- `/bookmarks` - Saved posts
- `/profile/:username?` - User profile
- `/messages` - Direct messages

### Event Routes
- `/events` - Browse events
- `/events/:id` - Event details
- `/create-event` - Create new event
- `/organizer-dashboard` - Manage events
- `/live-activities/:eventId` - Event activities
- `/rewards` - View coupons

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/posts` - Manage posts
- `/admin/users` - Manage users
- `/admin/organizer-verification` - Approve organizers

## Features in Detail

### Rating System
- Users rate cars on a 1-10 scale
- Community average revealed after rating
- Match indicator shows if user agrees with community
- Login required to rate

### AI Censorship
- Automatic plate and face blurring
- Server-side processing via Gemini API
- Visual indicator badge on photos

### Event System
- Multi-step event creation
- Permit verification required
- Sponsor integration with rewards
- RSVP and capacity management
- Live activities during events

### Moderation
- Report system for posts and users
- Admin queue for review
- Status badges for content state
- User role management

## Future Enhancements
- Real-time notifications
- Advanced search and filters
- Social sharing integrations
- Mobile app version
- Payment integration for premium events

---

© 2026 CarSpot — built with Next.js
