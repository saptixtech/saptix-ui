'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { LogoSvg } from "./LogoSvg";

export interface NavChildItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  external?: boolean;
}

export interface NavSection {
  heading: string;
  items: NavChildItem[];
}

export interface SaptixAppSidebarProps {
  appName: string;
  appBadge?: string;
  sections: NavSection[];
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  footerNote?: string;
}

export function SaptixAppSidebar({
  appName = "Saptix Workspace",
  appBadge = "v3.0",
  sections = [],
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
  footerNote = "Unified Workspace",
}: SaptixAppSidebarProps) {
  const pathname = usePathname() || "";

  const isActive = (href: string) => {
    if (!href || href === "#") return false;
    if (href.startsWith("http")) return false;
    if (href === "/" || href === "") return pathname === "/" || pathname === "";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-card border-r border-border select-none">
      {/* Brand Header */}
      <div className={`flex items-center h-14 px-3 border-b border-border/80 shrink-0 ${collapsed ? "justify-center" : "justify-between"}`}>
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <LogoSvg className="size-6 shrink-0" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs tracking-tight text-foreground truncate">
                {appName}
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">
                SAPTIX Cloud
              </span>
            </div>
          )}
        </Link>
        {!collapsed && appBadge && (
          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-medium border border-primary/30 text-primary bg-primary/5">
            {appBadge}
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-2.5 space-y-4">
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed ? (
              <div className="px-2.5 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 font-mono">
                  {section.heading}
                </span>
              </div>
            ) : (
              sIdx > 0 && <div className="h-px w-6 mx-auto bg-border/60 my-2" />
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const IconComponent = item.icon;
                const isExternal = item.external || item.href.startsWith("http");

                const linkClasses = `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all group relative ${
                  active
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                } ${collapsed ? "justify-center" : ""}`;

                const content = (
                  <>
                    <IconComponent className={`size-4 shrink-0 ${active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`} />
                    {!collapsed && (
                      <>
                        <span className="truncate flex-1">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`ml-auto text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                              active
                                ? "bg-primary-foreground/20 text-primary-foreground"
                                : "bg-muted text-muted-foreground border border-border/40"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {isExternal && <ExternalLink className="size-3 text-muted-foreground/60 ml-1 shrink-0" />}
                      </>
                    )}

                    {/* Collapsed Tooltip Hover */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1 rounded-md bg-popover text-popover-foreground text-xs font-medium border border-border shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 whitespace-nowrap">
                        {item.label}
                        {item.badge && <span className="ml-1.5 text-primary">({item.badge})</span>}
                      </div>
                    )}
                  </>
                );

                return isExternal ? (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClasses}
                    title={collapsed ? item.label : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={linkClasses}
                    title={collapsed ? item.label : undefined}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer User Info & Collapse Toggle */}
      <div className="p-2 border-t border-border/80 shrink-0 space-y-1.5 bg-muted/20">
        {/* User Card */}
        <div className={`flex items-center gap-2 p-1.5 rounded-lg bg-card/80 border border-border/50 ${collapsed ? "justify-center" : ""}`}>
          <div className="size-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-primary">SA</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-foreground truncate">Admin Saptix</span>
              <span className="text-[10px] text-muted-foreground font-mono truncate">{footerNote}</span>
            </div>
          )}
          {!collapsed && (
            <span className="size-2 rounded-full bg-emerald-500 shrink-0" title="Active SSO Session" />
          )}
        </div>

        {/* Collapse Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`w-full flex items-center gap-2 py-1.5 px-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer ${
            collapsed ? "justify-center" : ""
          }`}
          title="Toggle Sidebar (Ctrl+B)"
        >
          {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-20 hidden md:block transition-all duration-300 ease-in-out ${
          collapsed ? "w-[68px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

export default SaptixAppSidebar;
