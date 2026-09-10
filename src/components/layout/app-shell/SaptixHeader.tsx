'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PanelLeft,
  Sun,
  Moon,
  Search,
  ExternalLink,
  User,
  LogOut,
  Check,
  Layers,
  ShieldCheck,
  Activity,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { LogoSvg } from "./LogoSvg";

export const SAPTIX_APPS = [
  { name: "Marketing Hub", sub: "hub", url: "https://saptix.tech", desc: "Enterprise Marketing & Architecture Showcase", icon: "⚡" },
  { name: "Account Workspace", sub: "account", url: "https://account.saptix.tech", desc: "User Profile, Identity & API Tokens", icon: "👤" },
  { name: "Admin Console", sub: "admin", url: "https://admin.saptix.tech", desc: "Enterprise Governance & Cluster Ops", icon: "⚙️" },
  { name: "Lead OS", sub: "lead", url: "https://lead.saptix.tech", desc: "Autonomous B2B CRM & Pipeline Intelligence", icon: "📈" },
  { name: "Modeler Studio", sub: "modeler", url: "https://modeler.saptix.tech", desc: "Cloud Architecture & Diagramming Studio", icon: "📊" },
  { name: "AI Chat Assistant", sub: "chat", url: "https://chat.saptix.tech", desc: "Intelligent AI Assistant & Workspace", icon: "💬" },
  { name: "Spectra Engine", sub: "spectra", url: "https://spectra.saptix.tech", desc: "SAP Cognitive Core & Telemetry Pipeline", icon: "🛡️" },
  { name: "SAP Connector", sub: "scc", url: "https://scc.saptix.tech", desc: "SAP RFC & Cloud Connector Gateway", icon: "🔌" },
  { name: "Agentic Platform", sub: "agent", url: "https://agent.saptix.tech", desc: "Autonomous Multi-Agent Orchestrator", icon: "🤖" },
  { name: "UI Portal", sub: "ui", url: "https://ui.saptix.tech", desc: "Enterprise Design System & OKLCH UI Suite", icon: "🎨" },
  { name: "Datamachine", sub: "datamachine", url: "https://datamachine.saptix.tech", desc: "Data Pipeline & ETL Engine", icon: "🔄" },
  { name: "Workflow", sub: "workflow", url: "https://workflow.saptix.tech", desc: "Automated Orchestration Workflows", icon: "🔀" },
];

export const SAPTIX_PORTAL_TABS = [
  { id: "hub", label: "Hub", href: "https://saptix.tech" },
  { id: "account", label: "Account", href: "https://account.saptix.tech" },
  { id: "admin", label: "Admin", href: "https://admin.saptix.tech" },
  { id: "lead", label: "Lead OS", href: "https://lead.saptix.tech" },
  { id: "modeler", label: "Modeler", href: "https://modeler.saptix.tech" },
  { id: "chat", label: "Chat", href: "https://chat.saptix.tech" },
  { id: "spectra", label: "Spectra", href: "https://spectra.saptix.tech" },
  { id: "agent", label: "Agent", href: "https://agent.saptix.tech" },
  { id: "ui", label: "UI Suite", href: "https://ui.saptix.tech" },
];

export interface SaptixHeaderProps {
  appName: string;
  appBadge?: string;
  subdomain?: string;
  onToggleSidebar?: () => void;
  sidebarCollapsed?: boolean;
}

export function SaptixHeader({
  appName = "Saptix Workspace",
  appBadge = "v3.0",
  subdomain,
  onToggleSidebar,
  sidebarCollapsed = false,
}: SaptixHeaderProps) {
  const [isDark, setIsDark] = useState(true);
  const [currentHost, setCurrentHost] = useState("");
  const [appsOpen, setAppsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHost(window.location.hostname);
      const isDarkMode =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setIsDark(isDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof window !== "undefined") {
      const doc = document.documentElement;
      if (nextDark) {
        doc.classList.add("dark");
        doc.classList.remove("light");
        doc.setAttribute("data-theme", "dark");
      } else {
        doc.classList.remove("dark");
        doc.classList.add("light");
        doc.setAttribute("data-theme", "light");
      }
      try {
        const stored = localStorage.getItem("saptix-theme-config");
        const cfg = stored ? JSON.parse(stored) : {};
        cfg.mode = nextDark ? "dark" : "light";
        localStorage.setItem("saptix-theme-config", JSON.stringify(cfg));
      } catch (e) {}
    }
  };

  const activeSub = (subdomain || "").toLowerCase() || (currentHost ? currentHost.split(".")[0] : "");

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/80 bg-background/90 px-4 sm:px-6 backdrop-blur-md transition-colors">
      {/* Left: Sidebar Toggle + Logo + App Title */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
            title="Toggle Sidebar (Ctrl+B)"
            aria-label="Toggle Sidebar"
          >
            <PanelLeft className="size-4" />
          </button>
        )}

        <div className="flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <LogoSvg className="size-6" />
            <span className="font-bold text-sm tracking-tight text-foreground hidden sm:inline">
              SAPTIX
            </span>
          </Link>
          <span className="text-muted-foreground/40 font-light text-xs hidden sm:inline">/</span>
          <span className="font-semibold text-xs sm:text-sm text-foreground tracking-tight truncate max-w-[150px] sm:max-w-none">
            {appName}
          </span>
          {appBadge && (
            <span className="hidden xs:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border/60">
              {appBadge}
            </span>
          )}
        </div>
      </div>

      {/* Middle: Universal 9-Stake Quick Portal Tabs */}
      <nav className="hidden xl:flex items-center gap-1 bg-muted/40 p-1 rounded-lg border border-border/40">
        {SAPTIX_PORTAL_TABS.map((tab) => {
          const isCurrent = activeSub.includes(tab.id) || currentHost.includes(tab.id);
          return (
            <a
              key={tab.id}
              href={tab.href}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                isCurrent
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/60"
              }`}
            >
              {tab.label}
            </a>
          );
        })}
      </nav>

      {/* Right: Telemetry Badge + Apps Switcher + Theme Toggle + User SSO Profile */}
      <div className="flex items-center gap-2">
        {/* Live System Status Indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 dark:text-emerald-400 text-[11px] font-medium">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System: Optimal • 18ms</span>
        </div>

        {/* 12-App Ecosystem Switcher */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setAppsOpen(!appsOpen)}
            className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-border bg-muted/30 text-xs font-medium text-foreground hover:bg-muted hover:border-border/80 transition-all cursor-pointer"
          >
            <Layers className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Apps</span>
            <ChevronDown className="size-3 text-muted-foreground" />
          </button>

          {appsOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setAppsOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 w-80 rounded-xl border border-border bg-popover p-2 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-2 py-1.5 border-b border-border/60 mb-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground">Saptix Ecosystem</span>
                    <span className="text-[10px] text-muted-foreground font-mono">12 Applications</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Unified enterprise SSO navigation across connected services
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1 max-h-80 overflow-y-auto pr-0.5">
                  {SAPTIX_APPS.map((app) => {
                    const isCurrent = activeSub.includes(app.sub) || currentHost.includes(app.sub);
                    return (
                      <a
                        key={app.name}
                        href={app.url}
                        className={`flex items-start gap-2 p-2 rounded-lg transition-all text-left ${
                          isCurrent
                            ? "bg-primary/15 text-primary border border-primary/30"
                            : "hover:bg-muted/70 text-foreground"
                        }`}
                      >
                        <span className="text-sm leading-none p-1 rounded-md bg-muted/60 shrink-0">
                          {app.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold truncate">{app.name}</span>
                            {isCurrent && <Check className="size-3 text-primary shrink-0" />}
                          </div>
                          <p className="text-[10px] text-muted-foreground truncate leading-tight mt-0.5">
                            {app.desc}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer"
          title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>

        {/* User SSO Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center justify-center size-8 rounded-full border border-border bg-primary/10 hover:ring-2 hover:ring-primary/40 transition-all cursor-pointer focus:outline-none"
            aria-label="User SSO Menu"
          >
            <span className="text-xs font-bold text-primary">SA</span>
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl border border-border bg-popover p-1.5 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-100">
                <div className="px-2.5 py-2 border-b border-border/60 mb-1">
                  <p className="text-xs font-semibold text-foreground">Admin Saptix</p>
                  <p className="text-[10px] text-muted-foreground truncate font-mono">admin@saptix.tech</p>
                </div>
                <a
                  href="https://account.saptix.tech"
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-foreground cursor-pointer rounded-lg hover:bg-muted transition-colors"
                >
                  <User className="size-3.5 text-muted-foreground" />
                  <span>Account & Profile</span>
                </a>
                <a
                  href="https://account.saptix.tech"
                  className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-foreground cursor-pointer rounded-lg hover:bg-muted transition-colors"
                >
                  <ShieldCheck className="size-3.5 text-muted-foreground" />
                  <span>Security & API Keys</span>
                </a>
                <div className="my-1 h-px bg-border/60" />
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("saptix_token");
                      localStorage.removeItem("access_token");
                      window.location.href = "https://account.saptix.tech";
                    }
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-destructive cursor-pointer rounded-lg hover:bg-destructive/10 transition-colors text-left"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default SaptixHeader;
