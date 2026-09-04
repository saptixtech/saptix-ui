'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Bell, Search, ChevronDown, LogOut, Settings, User } from 'lucide-react';

interface TopNavProps {
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
  subdomain?: string;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
  sidebarCollapsed?: boolean;
  notifications?: number;
}

export default function TopNav({
  title,
  breadcrumbs,
  subdomain,
  showSearch = false,
  onSearch,
  userName,
  userAvatar,
  onLogout,
  sidebarCollapsed = false,
  notifications = 0,
}: TopNavProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('saptix-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial as 'light' | 'dark');
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('saptix-theme', next);
  };

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 transition-all duration-300"
      style={{
        left: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        height: 'var(--topnav-height)',
        background: 'var(--topnav-bg)',
        borderBottom: '1px solid var(--topnav-border)',
        color: 'var(--topnav-foreground)',
      }}
    >
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-3 min-w-0">
        {breadcrumbs ? (
          <nav className="flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span style={{ color: 'var(--muted-foreground)' }}>/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:underline" style={{ color: i === breadcrumbs.length - 1 ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
                    {crumb.label}
                  </a>
                ) : (
                  <span style={{ color: 'var(--foreground)', fontWeight: 500 }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : (
          <h1 className="text-sm font-semibold truncate" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h1>
        )}
        {subdomain && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide" style={{
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}>{subdomain}</span>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {showSearch && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{
            background: 'var(--muted)',
            border: '1px solid var(--border)',
          }}>
            <Search size={14} style={{ color: 'var(--muted-foreground)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); onSearch?.(e.target.value); }}
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-32 lg:w-48"
              style={{ color: 'var(--foreground)' }}
            />
            <kbd className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--border)', color: 'var(--muted-foreground)' }}>⌘K</kbd>
          </div>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition hover:opacity-80"
          style={{ color: 'var(--muted-foreground)' }}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-lg transition hover:opacity-80 relative" style={{ color: 'var(--muted-foreground)' }}>
          <Bell size={18} />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold" style={{
              background: 'var(--destructive)',
              color: 'var(--destructive-foreground)',
            }}>{notifications > 9 ? '9+' : notifications}</span>
          )}
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 rounded-lg transition hover:opacity-80"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold" style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}>
              {userAvatar ? <img src={userAvatar} className="w-full h-full rounded-full object-cover" /> : (userName?.charAt(0)?.toUpperCase() || 'U')}
            </div>
            <ChevronDown size={14} style={{ color: 'var(--muted-foreground)' }} />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg py-1 z-50" style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-lg)',
              }}>
                <a href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm transition hover:opacity-80" style={{ color: 'var(--foreground)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <User size={14} /> Profile
                </a>
                <a href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm transition hover:opacity-80" style={{ color: 'var(--foreground)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Settings size={14} /> Settings
                </a>
                <div className="my-1 h-px" style={{ background: 'var(--border)' }} />
                {onLogout && (
                  <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm transition hover:opacity-80" style={{ color: 'var(--destructive)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={14} /> Sign out
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
