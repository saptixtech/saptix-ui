import * as React from "react";
import { cn } from "@/lib/utils";

export function Avatar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-8 h-8 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center overflow-hidden shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

export function AvatarFallback({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("text-[11px] font-semibold text-[#fafafa]", className)} {...props}>
      {children}
    </span>
  );
}
