import * as React from "react";
import { cn } from "@/lib/utils";

export function Alert({ variant = "default", className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "destructive" | "success" | "warning" | "info" }) {
  const v: Record<string, string> = {
    default: "border-[#27272a] bg-[#18181b]",
    destructive: "border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.1)]",
    success: "border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.1)]",
    warning: "border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.1)]",
    info: "border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.1)]",
  };
  return <div className={cn("flex items-start gap-3 rounded-lg border p-4 text-[13px]", v[variant], className)} {...props}>{children}</div>;
}

export function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("font-semibold text-[#fafafa] text-[13px]", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-[#a1a1aa] mt-0.5", className)} {...props} />;
}
