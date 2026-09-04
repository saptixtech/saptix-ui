import * as React from "react";
import { cn } from "@/lib/utils";
import { IconChevronRight } from "@tabler/icons-react";

export function Collapsible({ open, onOpenChange, className, children }: { open?: boolean; onOpenChange?: (o: boolean) => void; className?: string; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(open ?? false);
  const isOpen = open !== undefined ? open : internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider value={{ open: isOpen, toggle }}>
      <div className={cn("", className)}>{children}</div>
    </CollapsibleContext.Provider>
  );
}

const CollapsibleContext = React.createContext<{ open: boolean; toggle: () => void } | null>(null);

export function CollapsibleTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(CollapsibleContext);
  return (
    <button type="button" onClick={ctx?.toggle} className={cn("flex items-center gap-2 w-full text-left", className)}>
      {children}
      <IconChevronRight className={cn("w-4 h-4 ml-auto text-[#8e8ea8] transition-transform", ctx?.open && "rotate-90")} stroke={1.75} />
    </button>
  );
}

export function CollapsibleContent({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = React.useContext(CollapsibleContext);
  if (!ctx?.open) return null;
  return <div className={cn("animate-fade-in", className)}>{children}</div>;
}
