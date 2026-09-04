'use client';

import { useState, useEffect } from 'react';
import AppSidebar, { type NavGroup } from './AppSidebar';
import TopNav from './TopNav';

interface AppLayoutProps {
  children: React.ReactNode;
  appName: string;
  subdomain?: string;
  navGroups: NavGroup[];
  currentPath?: string;
  onNavigate?: (href: string) => void;
  onLogout?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  logoUrl?: string;
  appIcon?: React.ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  notifications?: number;
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
}

export default function AppLayout({
  children,
  appName,
  subdomain,
  navGroups,
  currentPath = '/',
  onNavigate,
  onLogout,
  userName,
  userEmail,
  userAvatar,
  logoUrl,
  appIcon,
  showSearch = false,
  onSearch,
  notifications = 0,
  breadcrumbs,
  title,
}: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <AppSidebar
        appName={appName}
        appIcon={appIcon}
        logoUrl={logoUrl}
        navGroups={navGroups}
        currentPath={currentPath}
        onNavigate={onNavigate}
        onLogout={onLogout}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
        defaultCollapsed={sidebarCollapsed}
      />
      <TopNav
        title={title}
        breadcrumbs={breadcrumbs}
        subdomain={subdomain}
        showSearch={showSearch}
        onSearch={onSearch}
        userName={userName}
        userAvatar={userAvatar}
        onLogout={onLogout}
        sidebarCollapsed={sidebarCollapsed}
        notifications={notifications}
      />
      <main
        className="transition-all duration-300 pt-14"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          paddingTop: 'var(--topnav-height)',
        }}
      >
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
