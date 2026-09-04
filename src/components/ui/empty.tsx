import * as React from "react"
import { cn } from "@/lib/utils"

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-border bg-card/50 backdrop-blur-xs",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="size-12 rounded-2xl bg-[var(--primary-glow)] border border-[var(--primary)]/20 text-[var(--primary)] flex items-center justify-center mb-3.5 shadow-inner">
          <Icon className="size-6" />
        </div>
      )}
      <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground mt-1 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
