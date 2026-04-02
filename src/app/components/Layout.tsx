import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Home, Plus, Calendar, Trophy, User, LayoutDashboard, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/create-post', icon: Plus, label: 'Create' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/rewards', icon: Trophy, label: 'Rewards' },
    { path: '/admin', icon: LayoutDashboard, label: 'Admin' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isFeedActive = isActive('/');
  const isEventsActive = isActive('/events');
  const isCreateActive = isActive('/create-post');
  const isRewardActive = isActive('/rewards');
  const isProfileActive = isActive('/profile');

  return (
    <div className="flex min-h-screen bg-[#080D1A]">
      {/* Desktop Sidebar - Push Layout */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-[#060B16] border-r border-white/[0.07] transition-all ease-in-out ${
          sidebarCollapsed ? 'w-[60px]' : 'w-[220px]'
        }`}
        style={{ transitionDuration: '250ms' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`border-b border-white/[0.07] flex items-center ${sidebarCollapsed ? 'p-4 justify-center' : 'p-6'}`}>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#A3E635] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold">CS</span>
              </div>
              {!sidebarCollapsed && <span className="text-white font-bold text-lg whitespace-nowrap overflow-hidden">CarSpot 2.0</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center transition-all relative ${
                    sidebarCollapsed ? 'justify-center px-4 py-3' : 'gap-3 px-6 py-3'
                  } ${
                    active
                      ? 'text-[#A3E635] bg-[#A3E635]/10'
                      : 'text-white/55 hover:text-white/80 hover:bg-white/5'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  {active && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#A3E635]" />}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="border-t border-white/[0.07]">
            <button
              className={`w-full flex items-center transition-colors text-white/55 hover:text-white/80 hover:bg-white/5 ${
                sidebarCollapsed ? 'justify-center px-4 py-3' : 'gap-3 px-6 py-3'
              }`}
              title={sidebarCollapsed ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="whitespace-nowrap">Logout</span>}
            </button>

            {/* Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full p-4 border-t border-white/[0.07] text-white/55 hover:text-white/80 flex items-center justify-center transition-colors"
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        <div className="min-h-screen">
          <Outlet />
        </div>

        {/* Footer - Desktop only */}
        <footer className="hidden md:block border-t border-white/[0.07] py-6 text-center text-sm text-[#6B7280]">
          © 2026 CarSpot — built with Next.js
        </footer>
      </main>

      {/* Mobile Bottom Navigation — Feed · Events · Create (FAB) · Reward · Profile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#060B16] border-t border-white/[0.07] z-50">
        <div className="flex justify-around items-end px-2 pb-2 pt-1">

          {/* Feed */}
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${isFeedActive ? 'text-[#A3E635]' : 'text-white/55'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Feed</span>
          </Link>

          {/* Events */}
          <Link
            to="/events"
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${isEventsActive ? 'text-[#A3E635]' : 'text-white/55'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </Link>

          {/* Create — center FAB */}
          <Link
            to="/create-post"
            className="flex flex-col items-center gap-1 px-3 -mt-4 transition-opacity"
            aria-label="Create post"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${
                isCreateActive
                  ? 'bg-[#A3E635] ring-4 ring-[#A3E635]/30'
                  : 'bg-[#A3E635]'
              }`}
            >
              <Plus className="w-7 h-7 text-black" strokeWidth={2.5} />
            </div>
            <span className={`text-xs mt-0.5 ${isCreateActive ? 'text-[#A3E635]' : 'text-white/55'}`}>Create</span>
          </Link>

          {/* Reward */}
          <Link
            to="/rewards"
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${isRewardActive ? 'text-[#A3E635]' : 'text-white/55'}`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Reward</span>
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${isProfileActive ? 'text-[#A3E635]' : 'text-white/55'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>

        </div>
      </nav>

    </div>
  );
}
