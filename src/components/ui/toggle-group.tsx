import * as React from "react";
import { cn } from "@/lib/utils";

export interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  onValueChange?: (val: any) => void;
  children: React.ReactNode;
  className?: string;
}

export function ToggleGroup({
  type = "single",
  value,
  onValueChange,
  children,
  className,
}: ToggleGroupProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 p-1 rounded-2xl border border-border bg-secondary", className)}>
      {children}
    </div>
  );
}

export function ToggleGroupItem({
  value,
  isSelected,
  onClick,
  children,
  className,
}: {
  value: string;
  isSelected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
        isSelected
          ? "bg-[var(--primary)] text-white shadow-md"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
        className
      )}
    >
      {children}
    </button>
  );
}
