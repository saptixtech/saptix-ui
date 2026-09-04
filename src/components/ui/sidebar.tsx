import * as React from "react"
import { cn } from "@/lib/utils"

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean
}

export function Sidebar({ className, collapsed = false, children, ...props }: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-screen flex flex-col bg-card border-r border-border transition-all duration-300 z-30 shrink-0",
        collapsed ? "w-18" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("h-16 flex items-center px-4 border-b border-border shrink-0", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-y-auto px-3 py-4 space-y-1", className)} {...props} />
}

export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 border-t border-border shrink-0", className)} {...props} />
}

export function SidebarItem({
  active,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { active?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer",
        active
          ? "bg-[var(--primary-glow)] text-[var(--primary)] font-bold border border-[var(--primary)]/30"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        className
      )}
      {...props}
    />
  )
}
