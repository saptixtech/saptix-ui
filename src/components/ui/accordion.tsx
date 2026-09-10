import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown as IconChevronDown } from 'lucide-react';

interface AccordionContextType {
  value: string | null;
  onChange: (v: string) => void;
  type: "single" | "multiple";
  openItems: Set<string>;
}
const AccordionCtx = React.createContext<AccordionContextType | null>(null);

export function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
}: {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    defaultValue ? new Set([defaultValue]) : new Set()
  );

  const onChange = (v: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(v)) {
        if (collapsible) next.delete(v);
      } else {
        if (type === "single") next.clear();
        next.add(v);
      }
      return next;
    });
  };

  return (
    <AccordionCtx.Provider value={{ value: null, onChange, type, openItems }}>
      <div className={cn("divide-y divide-[#262738]", className)}>{children}</div>
    </AccordionCtx.Provider>
  );
}

export function AccordionItem({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  return <div className={cn("", className)} data-value={value}>{children}</div>;
}

export function AccordionTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(AccordionCtx);
  const isOpen = ctx?.openItems.has(value) ?? false;

  return (
    <button
      type="button"
      onClick={() => ctx?.onChange(value)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-xs font-semibold text-white hover:text-[var(--primary)] transition-colors",
        className
      )}
    >
      <span>{children}</span>
      <IconChevronDown
        className={cn("w-4 h-4 text-[#8e8ea8] transition-transform duration-200", isOpen && "rotate-180")}
        stroke={1.75}
      />
    </button>
  );
}

export function AccordionContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(AccordionCtx);
  const isOpen = ctx?.openItems.has(value) ?? false;
  if (!isOpen) return null;

  return (
    <div className={cn("pb-4 text-xs text-[#8e8ea8] animate-fade-in", className)}>
      {children}
    </div>
  );
}
