import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipContextType { open: boolean; setOpen: (o: boolean) => void; }
const TooltipContext = React.createContext<TooltipContextType | null>(null);

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <TooltipContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex">{children}</div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const ctx = React.useContext(TooltipContext);
  return (
    <div
      onMouseEnter={() => ctx?.setOpen(true)}
      onMouseLeave={() => ctx?.setOpen(false)}
      className="inline-flex"
    >
      {children}
    </div>
  );
}

export function TooltipContent({ className, children, side = "top" }: { className?: string; children: React.ReactNode; side?: "top" | "bottom" | "left" | "right" }) {
  const ctx = React.useContext(TooltipContext);
  if (!ctx?.open) return null;

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div className={cn(
      "absolute z-50 overflow-hidden rounded-lg border border-[#262738] bg-[#14141d] px-2.5 py-1.5 text-[11px] text-white shadow-xl whitespace-nowrap animate-fade-in",
      sideClasses[side],
      className
    )}>
      {children}
    </div>
  );
}
