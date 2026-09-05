"use client";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  change?: number;        // positive = up, negative = down
  progress?: number;      // 0-100
  prefix?: string;
  suffix?: string;
}

interface KpiMetricGridProps {
  metrics: KpiMetric[];
}

export function KpiMetricGrid({ metrics }: KpiMetricGridProps) {
  const visible = metrics.slice(0, 6);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {visible.map((m) => (
        <KpiCard key={m.id} metric={m} />
      ))}
    </div>
  );
}

function KpiCard({ metric: m }: { metric: KpiMetric }) {
  const isUp    = typeof m.change === "number" && m.change > 0;
  const isDown  = typeof m.change === "number" && m.change < 0;
  const isFlat  = typeof m.change === "number" && m.change === 0;
  const hasChange = typeof m.change === "number";

  return (
    <div className="group relative flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-default">
      {/* Label */}
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">
        {m.label}
      </p>

      {/* Value */}
      <p className="text-2xl font-bold font-[tabular-nums] text-foreground leading-none">
        {m.prefix}{m.value}{m.suffix}
      </p>

      {/* Change badge + Progress */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        {hasChange && (
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              isUp
                ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                : isDown
                ? "bg-red-500/12 text-red-600 dark:text-red-400"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {isUp && <TrendingUpIcon className="h-2.5 w-2.5" />}
            {isDown && <TrendingDownIcon className="h-2.5 w-2.5" />}
            {isFlat && <MinusIcon className="h-2.5 w-2.5" />}
            {isUp && "+"}{m.change}%
          </span>
        )}
        {!hasChange && <span />}
      </div>

      {/* Progress bar */}
      {typeof m.progress === "number" && (
        <div className="h-1 w-full rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              m.progress >= 80
                ? "bg-emerald-500"
                : m.progress >= 50
                ? "bg-primary"
                : m.progress >= 30
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
            style={{ width: `${Math.min(100, Math.max(0, m.progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}