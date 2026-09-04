import * as React from "react"
import { cn } from "@/lib/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

export function Kbd({ className, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground/80 shadow-xs select-none",
        className
      )}
      {...props}
    />
  )
}
