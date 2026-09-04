import * as React from "react";
import { cn } from "@/lib/utils";

export function ScrollArea({ className, children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("relative overflow-auto", className)}
      style={style}
    >
      <div className="h-full w-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
}
