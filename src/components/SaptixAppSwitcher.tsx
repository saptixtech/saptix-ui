"use client";

import { useState } from "react";

const SAPTIX_APPS = [
  { name: "Admin", href: "https://admin.saptix.tech/dashboard/overview", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", color: "#6366f1" },
  { name: "Modeler", href: "https://modeler.saptix.tech/studio", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", color: "#8b5cf6" },
  { name: "Spectra", href: "https://spectra.saptix.tech/overview", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "#f59e0b" },
  { name: "Account", href: "https://account.saptix.tech/", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", color: "#10b981" },
  { name: "Chat", href: "https://chat.saptix.tech/", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", color: "#3b82f6" },
  { name: "Agent", href: "https://agent.saptix.tech/", icon: "M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402a1.875 1.875 0 01-1.328 3.197H4.126a1.875 1.875 0 01-1.328-3.197L5 14.5", color: "#ec4899" },
  { name: "UI Portal", href: "https://ui.saptix.tech/overview", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z", color: "#14b8a6" },
  { name: "SCC", href: "https://scc.saptix.tech/", icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z", color: "#64748b" },
  { name: "Auth", href: "https://auth.saptix.tech/", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", color: "#22c55e" },
];

export function SaptixAppSwitcher() {
  const [open, setOpen] = useState(false);
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        title="Switch App"
      >
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
        <span className="hidden sm:inline">Apps</span>
        <svg className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-border bg-popover p-2 shadow-xl animate-in fade-in-0 zoom-in-95">
            <div className="px-2 py-1.5 mb-1">
              <p className="text-xs font-semibold text-foreground">Saptix Platform</p>
              <p className="text-[10px] text-muted-foreground">Switch between applications</p>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {SAPTIX_APPS.map((app) => {
                const isActive = currentHost.includes(app.name.toLowerCase().replace(" ", ""));
                return (
                  <a
                    key={app.name}
                    href={app.href}
                    className={`flex flex-col items-center gap-1.5 rounded-lg p-2.5 text-center transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div
                      className="flex size-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: app.color + "15", color: app.color }}
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={app.icon} />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium leading-tight">{app.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
