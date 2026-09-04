"use client";

import { cn } from "@/lib/utils";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  progress?: number;
  suffix?: string;
}

interface KpiMetricGridProps {
  metrics: KpiMetric[];
  className?: string;
}

export function KpiMetricGrid({ metrics, className }: KpiMetricGridProps) {
  // Hard-coded max 6 visible KPI cards
  const visible = metrics.slice(0, 6);

  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", className)}>
      {visible.map((m) => (
        <div
          key={m.id}
          className="group relative rounded-xl border bg-gradient-to-t from-primary/5 to-card p-4 transition-shadow hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider truncate">
              {m.label}
            </span>
            {m.icon && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                {m.icon}
              </div>
            )}
          </div>
          <div className="text-2xl font-bold tracking-tight font-[tabular-nums]">
            {m.value}
            {m.suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{m.suffix}</span>}
          </div>
          {m.change !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {m.change > 0 ? (
                <TrendingUpIcon className="h-3.5 w-3.5 text-emerald-500" />
              ) : m.change < 0 ? (
                <TrendingDownIcon className="h-3.5 w-3.5 text-red-500" />
              ) : (
                <MinusIcon className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  m.change > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : m.change < 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-muted-foreground"
                )}
              >
                {m.change > 0 ? "+" : ""}
                {m.change}%
              </span>
              {m.changeLabel && (
                <span className="text-xs text-muted-foreground">{m.changeLabel}</span>
              )}
            </div>
          )}
          {m.progress !== undefined && (
            <div className="mt-2.5">
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, m.progress))}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
