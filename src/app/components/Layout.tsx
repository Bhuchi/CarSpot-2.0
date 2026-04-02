import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { Home, Plus, Bookmark, Calendar, Trophy, MessageSquare, User, LayoutDashboard, ChevronLeft, ChevronRight } from 'lucide-react';
import { InteractionHelpButton } from './InteractionHelpButton';

export function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/create-post', icon: Plus, label: 'Create' },
    { path: '/bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { path: '/events', icon: Calendar, label: 'Events' },
    { path: '/rewards', icon: Trophy, label: 'Rewards' },
    { path: '/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/admin', icon: LayoutDashboard, label: 'Admin' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

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

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-4 border-t border-white/[0.07] text-white/55 hover:text-white/80 flex items-center justify-center transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content - Pushed by Sidebar */}
      <main className="flex-1 min-w-0 pb-20 md:pb-0">
        <div className="min-h-screen">
          <Outlet />
        </div>

        {/* Footer - Desktop only */}
        <footer className="hidden md:block border-t border-white/[0.07] py-6 text-center text-sm text-[#6B7280]">
          © 2026 CarSpot — built with Next.js
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#060B16] border-t border-white/[0.07] z-50">
        <div className="flex justify-around items-center py-2">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  active ? 'text-[#A3E635]' : 'text-white/55'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Help Button */}
      <InteractionHelpButton />
    </div>
  );
}