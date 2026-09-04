import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex w-full h-9 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(15,23,42,0.6)] px-3.5 text-xs text-white placeholder:text-[#64748b] outline-none transition-all focus:border-[#7c31f6] focus:shadow-[0_0_15px_-3px_rgba(124,49,246,0.35)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
