import * as React from "react";
import { cn } from "@/lib/utils";

interface PopoverContextType { open: boolean; setOpen: (o: boolean) => void; }
const PopoverCtx = React.createContext<PopoverContextType | null>(null);

export function Popover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <PopoverCtx.Provider value={{ open, setOpen }}>
      <div ref={ref} className="relative inline-block">{children}</div>
    </PopoverCtx.Provider>
  );
}

export function PopoverTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const ctx = React.useContext(PopoverCtx);
  return <div onClick={() => ctx?.setOpen(!ctx.open)} className="cursor-pointer inline-flex">{children}</div>;
}

export function PopoverContent({ className, align = "center", children }: { className?: string; align?: "left" | "center" | "right"; children: React.ReactNode }) {
  const ctx = React.useContext(PopoverCtx);
  if (!ctx?.open) return null;

  const alignClass = align === "left" ? "left-0" : align === "right" ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <div className={cn(
      "absolute z-50 mt-2 min-w-[200px] overflow-hidden rounded-xl border border-[#262738] bg-[#14141d] p-3 shadow-2xl animate-fade-in",
      alignClass,
      className
    )}>
      {children}
    </div>
  );
}
