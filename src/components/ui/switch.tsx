import * as React from "react";
import { cn } from "@/lib/utils";

export function Switch({ checked = false, onCheckedChange, disabled, className }: { checked?: boolean; onCheckedChange?: (c: boolean) => void; disabled?: boolean; className?: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-[#06b6d4]" : "bg-[#27272a]",
        className
      )}
    >
      <span className={cn("pointer-events-none block h-4 w-4 rounded-full bg-[#fafafa] shadow-lg transition-transform", checked ? "translate-x-4" : "translate-x-0")} />
    </button>
  );
}
