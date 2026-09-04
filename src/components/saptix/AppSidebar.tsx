'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { ChevronLeft, ChevronRight, LogOut, Settings, User, PanelLeftClose, PanelLeft } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

interface AppSidebarProps {
  appName: string;
  appIcon?: React.ReactNode;
  logoUrl?: string;
  navGroups: NavGroup[];
  currentPath?: string;
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  defaultCollapsed?: boolean;
}

const SidebarContext = createContext({ collapsed: false });
export const useSidebar = () => useContext(SidebarContext);

export default function AppSidebar({
  appName,
  appIcon,
  logoUrl,
  navGroups,
  currentPath = '/',
  onNavigate,
  onLogout,
  userName,
  userEmail,
  userAvatar,
  defaultCollapsed = false,
}: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (href: string) => currentPath === href || currentPath.startsWith(href + '/');

  const NavLink = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const active = isActive(item.href);
    return (
      <a
        href={item.href}
        onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(item.href); } }}
        className="group flex items-center gap-3 rounded-lg transition-all text-sm"
        style={{
          padding: collapsed ? '10px' : '8px 12px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          background: active ? 'var(--sidebar-active-bg)' : 'transparent',
          color: active ? 'var(--sidebar-active-foreground)' : 'var(--sidebar-foreground)',
          fontWeight: active ? 600 : 400,
          marginLeft: depth > 0 && !collapsed ? '12px' : '0',
        }}
        onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--sidebar-hover)'; }}
        onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
        title={collapsed ? item.label : undefined}
      >
        <span className="flex-shrink-0" style={{ width: 20, height: 20 }}>{item.icon}</span>
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold" style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}>{item.badge}</span>
            )}
          </>
        )}
      </a>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full" style={{
      background: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--sidebar-border)',
    }}>
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 h-14 flex-shrink-0" style={{
        borderBottom: '1px solid var(--sidebar-border)',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        {logoUrl ? (
          <img src={logoUrl} alt={appName} className="h-7" style={{ borderRadius: 'var(--radius-sm)' }} />
        ) : appIcon ? (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: 'var(--primary-foreground)',
          }}>{appIcon}</div>
        ) : (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            color: 'var(--primary-foreground)',
          }}>S</div>
        )}
        {!collapsed && (
          <span className="font-semibold text-sm truncate" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-heading)' }}>
            {appName}
          </span>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
            {group.title && !collapsed && (
              <p className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--muted-foreground)' }}>
                {group.title}
              </p>
            )}
            {collapsed && gi > 0 && (
              <div className="mx-3 my-2 h-px" style={{ background: 'var(--sidebar-border)' }} />
            )}
            <div className="space-y-0.5">
              {group.items.map((item, i) => <NavLink key={i} item={item} />)}
            </div>
          </div>
        ))}
      </nav>

      {/* User Area & Collapse Toggle */}
      <div className="flex-shrink-0 p-2" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        {/* Settings & Logout */}
        <div className="space-y-0.5 mb-2">
          <NavLink item={{ label: 'Settings', href: '/settings', icon: <Settings size={18} /> }} />
        </div>

        {/* User Profile */}
        {userName && (
          <div className="flex items-center gap-3 p-2 rounded-lg" style={{
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}>
              {userAvatar ? <img src={userAvatar} className="w-full h-full rounded-full object-cover" /> : userName.charAt(0).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{userName}</p>
                {userEmail && <p className="text-[11px] truncate" style={{ color: 'var(--muted-foreground)' }}>{userEmail}</p>}
              </div>
            )}
            {!collapsed && onLogout && (
              <button onClick={onLogout} className="p-1.5 rounded-md hover:opacity-80 transition" style={{ color: 'var(--muted-foreground)' }} title="Sign out">
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all hover:opacity-80 mt-1"
          style={{
            color: 'var(--muted-foreground)',
            background: 'var(--sidebar-hover)',
          }}
        >
          {collapsed ? <PanelLeft size={14} /> : <PanelLeftClose size={14} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <SidebarContext.Provider value={{ collapsed }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full z-50 transition-all duration-300 hidden md:block"
        style={{
          width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 md:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: 'var(--sidebar-width)' }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-3 left-3 z-30 p-2 rounded-lg md:hidden"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
      >
        <PanelLeft size={18} style={{ color: 'var(--foreground)' }} />
      </button>
    </SidebarContext.Provider>
  );
}
