"use client";

import { cn } from "@/lib/utils";

export interface TrendDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

interface TrendSummarySectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function TrendSummarySection({
  title,
  subtitle,
  children,
  actions,
  className,
}: TrendSummarySectionProps) {
  return (
    <div className={cn("rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="px-4 pb-4 h-64 md:h-72">
        {children}
      </div>
    </div>
  );
}
