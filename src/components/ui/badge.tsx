import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'teal' | 'cyan' | 'purple' | 'success' | 'warning' | 'info';
}

const badgeVariantStyles: Record<string, string> = {
  default: "border-transparent bg-[var(--primary)] text-white hover:bg-teal-600",
  secondary: "border-transparent bg-muted text-foreground/90 hover:bg-slate-700",
  destructive: "border-red-500/30 bg-red-500/10 text-red-400",
  outline: "text-foreground/90 border-border",
  teal: "border-[var(--primary)]/30 bg-[var(--primary-glow)] text-[var(--primary)]",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-[var(--primary)]",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
};

export function Badge({ className, variant = 'teal', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariantStyles[variant] || badgeVariantStyles.teal,
        className
      )}
      {...props}
    />
  );
}
